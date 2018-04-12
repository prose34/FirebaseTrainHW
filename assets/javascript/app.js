
// Initialize Firebase
var config = {
    apiKey: "AIzaSyD8CsO93MC3Q3vPEmand-CIIkiXPxcyK54",
    authDomain: "trainhw-d3d3a.firebaseapp.com",
    databaseURL: "https://trainhw-d3d3a.firebaseio.com",
    storageBucket: "trainhw-d3d3a.appspot.com",
    // messagingSenderId: "<SENDER_ID>",
};

firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

//initial values
var train = "";
var destination = "";
var firstTrainTime = "";
var frequency = "";    
var nextArrival = "";
var minutesAway = ""; 

var currentTime = moment();



// Capture Button Click - button to add new train to table
$("#addTrain").on("click", function() {
    // Don't refresh the page!
    event.preventDefault();

    // Code in the logic for storing and retrieving the most recent train added.
    train = $("#trainNameInput").val().trim();
    destination = $("#destinationInput").val().trim();
    firstTrainTime = $("#firstTrainTimeInput").val().trim();
    frequency = $("#frequencyInput").val().trim();

    // First Train Time (pushed back 1 year to make sure it comes before current time)
    var firstConvertedTime = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    console.log(firstConvertedTime);

    // Current Time
    // var currentTime = moment();
    // console.log(currentTime);

    // Difference between the times
    var timeDiff = moment().diff(moment(firstConvertedTime), "minutes");
    console.log(timeDiff);

    // Time apart (remainder)
    var tRemainder = timeDiff % frequency;
    console.log(tRemainder);

    // Minutes Until Train arrives
    var minutesAway = frequency - tRemainder;
    console.log(minutesAway);

    // Next Train
    var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm a");
    console.log(nextArrival);


    var newTrain = {
        train: train,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
        nextArrival: nextArrival,
        minutesAway: minutesAway
    }

    // Provide initial data to Firebase database.
    database.ref().push(newTrain);

    // Alert
    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainTimeInput").val("");
    $("#frequencyInput").val("");

});




// Firebase watcher + initial loader. Take snapshot everytime database changed
// This function allows you to update your page in real-time when the firebase database changes.
database.ref().on("child_added", function(snapshot) {

    train = snapshot.val().train;
    destination = snapshot.val().destination;
    firstTrainTime = snapshot.val().firstTrainTime;
    frequency = snapshot.val().frequency;
    minutesAway = snapshot.val().minutesAway;
    nextArrival = snapshot.val().nextArrival;

    // Log everything that's coming out of snapshot
    console.log(snapshot.val());
    console.log(snapshot.val().train);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().firstTrainTime);
    console.log(snapshot.val().frequency);

    // Change the HTML table to reflect added train
    $('#trainTable').append("<tr><td>" + train + "</td><td>" + destination + "</td><td>" + frequency + ' min' + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");

    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});




//everytime a new train is added, add that data to firebase and append that data to the table
// need to be able to add new and not have it overwrite