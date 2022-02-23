// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken } from "firebase/messaging";
import {onBackgroundMessage} from "firebase/messaging/sw";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHpKBV6Jxl3eZL6t3P6foQuk97Pw0Sy20",
  authDomain: "done-8c734.firebaseapp.com",
  projectId: "done-8c734",
  storageBucket: "done-8c734.appspot.com",
  messagingSenderId: "311697157826",
  appId: "1:311697157826:web:7218a1cf545a19e783d55b",
  measurementId: "G-MQQPH1C431"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const messaging = getMessaging(firebaseConfig);
export const getTokenFCM = getToken(messaging, { vapidKey: 'BJUYwdGkLKAa0zlfvK36q83uCKdPu6nSCUFf-CrEdOdAx6XR1vQTNLaqvBFeqokV6rl5joYOWEbx3bCTO68pbP4' }).then((currentToken) => {
  if (currentToken) {
    // Send the token to your server and update the UI if necessary
    // ...
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});

onBackgroundMessage(messaging, (payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

});
