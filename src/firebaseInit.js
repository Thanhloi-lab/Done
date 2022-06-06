// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';
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
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
const publicKey = 'BJUYwdGkLKAa0zlfvK36q83uCKdPu6nSCUFf-CrEdOdAx6XR1vQTNLaqvBFeqokV6rl5joYOWEbx3bCTO68pbP4';

export const getToken = async (setTokenFound) => {
    let currentToken = '';
    try {
      currentToken = await messaging.getToken({vapidKey: publicKey});
      if (currentToken) {
        setTokenFound(true);
      } else {
        setTokenFound(false);
      }
    } catch (error) {
      console.log('An error occurred while retrieving token.', error);
    }
    console.log(currentToken);
    return currentToken;
  };

  export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });
