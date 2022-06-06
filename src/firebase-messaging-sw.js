// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
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
const publicKey = 'BJUYwdGkLKAa0zlfvK36q83uCKdPu6nSCUFf-CrEdOdAx6XR1vQTNLaqvBFeqokV6rl5joYOWEbx3bCTO68pbP4';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const messaging = getMessaging(firebaseConfig);
export const getTokenMessage = async (setTokenFound) => {
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
  return currentToken;
};

export const onMessageListener = () =>
new Promise((resolve) => {
  messaging.onMessage((payload) => {
    resolve(payload);
  });
});

export const onSubcribleToTopic = (token, topic) =>
new Promise((resolve) => {
  messaging.onSubcribleToTopic(token, topic)
  .then((response) => {
    // See the MessagingTopicManagementResponse reference documentation
    // for the contents of response.
    console.log('Successfully subscribed to topic:', response);
  })
  .catch((error) => {
    console.log('Error subscribing to topic:', error);
  });
});
