
// Initialize Firebase 
var config = {
    apiKey: "AIzaSyDHRHgnfBeiMpacIg8wbNMP2MuHAiij4J4",
    authDomain: "employee-data-management-bf551.firebaseapp.com",
    databaseURL: "https://employee-data-management-bf551.firebaseio.com",
    projectId: "employee-data-management-bf551",
    storageBucket: "employee-data-management-bf551.appspot.com",
    messagingSenderId: "430364210213"
};

firebase.initializeApp(config);

var database = firebase.database();

database.ref().on("child_added", function (childSnap) {
    console.log(childSnap.val().monthlyRate)
    $("#table-data").append("<tr><td>" + childSnap.val().name + "</td><td>" + childSnap.val().role + "</td><td>" +
        childSnap.val().startDate + "</td><td>" + childSnap.val().totalMonths + "</td><td>" + childSnap.val().monthlyRate + "</td><td>" + childSnap.val().totalBilled + "</td></tr>");

});

// database.ref().orderByChild(("dateAdded").limitToLast(1).on("child_added", function(snap) {
//     //latest record added display
//don't need this for this activity
// }));

$(document).ready(function () {
    $("#add-employee-record").on("click", function () {

        event.preventDefault();
        var dateFormat = "MM/DD/YYYY";
        var name = $("#name-input").val().trim();
        var role = $("#role-input").val().trim();
        var startDate = $("#start-input").val().trim();
        startDateFormatted = moment(startDate, dateFormat);
        var monthlyRate = $("#rate-input").val().trim();

        
        var totalMonths = moment().diff(startDateFormatted, "months");
        var totalBilled = totalMonths * monthlyRate;
        console.log("total months", totalMonths);
        console.log("total billed", totalBilled);

        database.ref().push({
            name: name,
            role: role,
            startDate: startDate,
            monthlyRate: monthlyRate,
            totalBilled: totalBilled,
            totalMonths: totalMonths,
            dateAdded: firebase.database.ServerValue.TIMESTAMP,
        });


    });

});

