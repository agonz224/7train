
// initialize firebase
  var config = {
    apiKey: "AIzaSyC7Q5yxv1FkVIvF7KAMCqBjQktFNqIKDd4",
    authDomain: "class-f048a.firebaseapp.com",
    databaseURL: "https://class-f048a.firebaseio.com",
    storageBucket: "class-f048a.appspot.com",
    messagingSenderId: "887120286943"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// launch button on click event
$("#add-rocket-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var rName = $("#rocket-name-input").val().trim();
  var rDes = $("#destination-input").val().trim();
  var rArr = moment($("#arrival-input").val().trim(), "hh:mm").format("X");
  var rFreq = $("#frequency-input").val().trim();

  // object holds new launch info
  var newLaunch = {
    rocket: rName,
    destination: rDes,
    arrival: rArr,
    frequency: rFreq
  };

  // push object to firebase database
  database.ref().push(newLaunch);

  // Logs everything to console
  console.log(newLaunch.rocket);
  console.log(newLaunch.destination);
  console.log(newLaunch.arrival);
  console.log(newLaunch.frequency);

  // alert and prompt
  alert("New Launch Scheduled");
  var spaceEats = prompt("What would you like to have during your launch?")
  alert(spaceEats + " " + "will be provided")

  // Clears all of the text-boxes
  $("#rocket-name-input").val("");
  $("#destination-input").val("");
  $("#arrival-input").val("");
  $("#frequency-input").val("");

  // Prevents moving to new page
  return false;
});

// adds new launch to firebase database and appends new launch info to table
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var rName = childSnapshot.val().rocket;
  var rDes = childSnapshot.val().destination;
  var rArr = childSnapshot.val().arrival;
  var rFreq = childSnapshot.val().frequency;

  // Employee Info
  console.log(rName);
  console.log(rDes);
  console.log(rArr);
  console.log(rFreq);

   var rocketInterval = 3;

    // Time is 3:30 AM
    var firstTime = "03:30";

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(firstTimeConverted, "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var rRemainder = diffTime % rocketInterval;
    console.log(rRemainder);

    // Minute Until Train
    var minsAway = rFreq - rRemainder;
    console.log("MINUTES TILL TRAIN: " + minsAway);

    // Next Train
    var nextLaunch = moment().add(minsAway, "minutes");
    console.log("ARRIVAL TIME: " + nextLaunch.format("hh:mm"));

  // new rocket appended along wlith its own new row to table
  $("#rocket-table > tbody").append("<tr><td>" + rName + "</td><td>" + rDes + "</td><td>" +
  rFreq + "</td><td>" + nextLaunch.format("hh:mm") + "</td><td>" + minsAway + "</td><td>");
});
 