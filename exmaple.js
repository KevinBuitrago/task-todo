/*global mainRef:true*/
firebase.database().ref().child("todos")
    .once("value")
    .then((events) => {
        console.log("VEmoas la data", events.val());
    })
    .catch((error) => {
        reject(error);
    });