import * as functions from "firebase-functions";
const admin = require("firebase-admin");
admin.initializeApp();
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

exports.sendPush = functions.database
  .ref("/notifications/{pushId}")
  .onWrite(event => {
    console.log("Push notification event triggered");
    const valueObject = event.after.val();

    console.log("valueObject.header: " + valueObject.header);
    console.log("valueObject.content: " + valueObject.content);
    // Create a notification
    const payload = {
      notification: {
        title: valueObject.header,
        body: valueObject.content,
        sound: "default"
      }
    };

    //Create an options object that contains the time to live for the notification and the priority
    const options = {
      priority: "high",
      timeToLive: 60 * 60 * 24
    };
    return admin
      .messaging()
      .sendToTopic("pushNotifications", payload, options)
      .then(response => {
        // Response is a message ID string.
        console.log("Successfully sent message:", response);
      })
      .catch(error => {
        console.log("Error sending message:", error);
      });
  });
