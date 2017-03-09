/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
  var config = {
    apiKey: "AIzaSyC7Q5yxv1FkVIvF7KAMCqBjQktFNqIKDd4",
    authDomain: "class-f048a.firebaseapp.com",
    databaseURL: "https://class-f048a.firebaseio.com",
    storageBucket: "class-f048a.appspot.com",
    messagingSenderId: "887120286943"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-rocket-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var rName = $("#rocket-name-input").val().trim();
  var rDes = $("#destination-input").val().trim();
  var rArr = moment($("#arrival-input").val().trim(), "DD/MM/YY").format("X");
  var rFreq = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newLaunch = {
    rocket: rName,
    destination: rDes,
    arrival: rArr,
    frequency: rFreq
  };

  // Uploads employee data to the database
  database.ref().push(newLaunch);

  // Logs everything to console
  console.log(newLaunch.rocket);
  console.log(newLaunch.destination);
  console.log(newLaunch.arrival);
  console.log(newLaunch.frequency);

  // Alert
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

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
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

  // Prettify the employee start
  var empStartPretty = moment.unix(rArr).format("MM/DD/YY");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  var empMonths = moment().diff(moment.unix(rArr, "X"), "months");
  console.log(empMonths);

  // Calculate the total billed rate
  var empBilled = empMonths * rFreq;
  console.log(empBilled);

  // Add each train's data into the table
  $("#rocket-table > tbody").append("<tr><td>" + rName + "</td><td>" + rDes + "</td><td>" +
  rArr + "</td><td>" + rFreq + "</td><td>");
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case
