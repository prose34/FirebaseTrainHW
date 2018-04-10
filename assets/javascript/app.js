//link to firebase
// 

// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
    apiKey: "<API_KEY>",
    authDomain: "<PROJECT_ID>.firebaseapp.com",
    databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
    storageBucket: "<BUCKET>.appspot.com",
    messagingSenderId: "<SENDER_ID>",
};

firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

//initial values
var train = "";
var destination = "";
var firstTrainTime = "";
var frequency = "";    //min notation? string??
var nextArrival = ""; //need time var 
var minutesAway = ""; //need time var

  // Capture Button Click
  $("#addTrain").on("click", function() {
    // Don't refresh the page!
    event.preventDefault();


    // Code in the logic for storing and retrieving the most recent user.
    // Don't forget to provide initial data to your Firebase database.
    train = $("#trainNameInput").val().trim();
    destination = $("#destinationInput").val().trim();
    firstTrainTime = $("#firstTrainTimeInput").val().trim();
    frequency = $("#frequencyInput").val().trim();


    database.ref().set({
        name: name,
        email: email,
        age: age,
        comment: comment
    });


  });