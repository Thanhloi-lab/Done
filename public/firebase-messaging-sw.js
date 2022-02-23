// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

const firebaseConfig = {
    apiKey: "AIzaSyDHpKBV6Jxl3eZL6t3P6foQuk97Pw0Sy20",
    authDomain: "done-8c734.firebaseapp.com",
    projectId: "done-8c734",
    storageBucket: "done-8c734.appspot.com",
    messagingSenderId: "311697157826",
    appId: "1:311697157826:web:7218a1cf545a19e783d55b",
    measurementId: "G-MQQPH1C431"
  };
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log("Received background message ", payload);
    const notificationTitle = payload.notification.title;
      const notificationOptions = {
        body: payload.notification.body,
        icon: "/logo192.png",
    };
    return window.self.registration.showNotification(
      notificationTitle,
      notificationOptions
    );
  });

