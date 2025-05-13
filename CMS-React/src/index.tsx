import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import store from './store/Store';
import { fetchListNotificationMessageByUserID } from 'store/notification/Actions';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'NEW_NOTIFICATION') {
      const state = store.getState();
      const myInfo = state.auth.myInfo;
      if (myInfo) {
        store.dispatch(fetchListNotificationMessageByUserID(myInfo.ID));
      }
    }
  });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
