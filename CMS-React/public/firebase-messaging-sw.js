/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
// required to setup background notification handler when browser is not in focus or in background and
// In order to receive the onMessage event,  app must define the Firebase messaging service worker

importScripts('https://www.gstatic.com/firebasejs/10.12.3/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.3/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config

var firebaseConfig = {
  apiKey: "AIzaSyC7KLx8sxXFuvgtjNh_cKam6eRVwSnLFtw",
  authDomain: "smart-learning-product.firebaseapp.com",
  projectId: "smart-learning-product",
  storageBucket: "smart-learning-product.appspot.com",
  messagingSenderId: "866388702711",
  appId: "1:866388702711:web:81b4d1b360b58f8335eaf2",
  measurementId: "G-6TBB2NPWDY"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);

  // Send a message to the main application
  self.clients.matchAll({ includeUncontrolled: true, type: 'window' }).then((clients) => {
    clients.forEach((client) => {
      client.postMessage({
        type: 'NEW_NOTIFICATION',
        payload: payload,
      });
    });
  });

});
