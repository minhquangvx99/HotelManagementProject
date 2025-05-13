import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

const messaging = getMessaging(firebaseApp);

const getFirebaseToken = (dispatchApi: any, myInfo: any, dispatchFetchListMessage: any) => {
  return getToken(messaging, { vapidKey: process.env.REACT_APP_WEB_PUSH_CERTIFICATES })
    .then((currentToken) => {
      if (currentToken) {
        // Track the token -> client mapping, by sending to backend server
        dispatchApi({
          UserID: myInfo?.ID,
          NotificationToken: currentToken,
        })
        // show on the UI that permission is secured
      } else {
        console.log('No registration token available. Request permission to generate one.');
        // shows on the UI that permission is required
      }

      onMessage(messaging, (payload) => {
        // call API lấy lại list notification
        dispatchFetchListMessage()
      });
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // catch error while creating client token
    });
};

export const requestForToken = async (dispatchApi: any, myInfo: any, dispatchFetchListMessage: any) => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      await getFirebaseToken(dispatchApi, myInfo, dispatchFetchListMessage);
    }
  } catch (error) {
    console.log('An error occurred while getting user permission. ', error);
  }
};
