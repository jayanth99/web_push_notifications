# Web Push Notifications using Firebase Cloud Messaging (FCM)

This project demonstrates **Web Push Notifications** in a web application using **Firebase Cloud Messaging (FCM)**.

It shows how to request notification permission from the user, generate an FCM token, and receive push notifications in both foreground and background using a service worker.

---

## Features

- Browser notification permission handling  
- Firebase Cloud Messaging (FCM) token generation  
- Background notifications using Service Worker  
- Firebase Hosting support  

---

## Project Structure

.
├── public  
│   ├── images  
│   ├── scripts  
│   │   ├── helper.js  
│   │   └── settings.js  
│   ├── styles  
│   │   ├── redwood-base.css  
│   │   └── style.css  
│   ├── 404.html  
│   ├── firebase-messaging-sw.js  
│   └── index.html  
├── README.md  
├── firebase.json  
├── package.json  
└── package-lock.json  

---

## Getting Started

### Firebase Setup

1. Go to **Firebase Console**
2. Create a new Firebase project
3. Add a **Web App**
4. Copy your Firebase configuration

Example:

```js
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  messagingSenderId: "...",
  appId: "..."
};
```

---

### Enable Cloud Messaging

1. Firebase Console → **Project Settings**
2. Open **Cloud Messaging** tab
3. Generate **Web Push certificate (VAPID key)**

---

## How It Works

### Request Notification Permission

The app asks the user for notification permission:

```js
Notification.requestPermission();
```

---

### Generate FCM Token

After permission is granted, an FCM token is generated:

```js
messaging.getToken({ vapidKey: "YOUR_VAPID_KEY" });
```

This token uniquely identifies the browser/device.

---

### Service Worker

The file `firebase-messaging-sw.js` handles background push notifications.

```js
self.addEventListener("push", event => {
  const data = event.data.json();
  self.registration.showNotification(
    data.notification.title,
    {
      body: data.notification.body,
      icon: data.notification.icon
    }
  );
});
```

---

## Sending Notifications

Push notifications can be sent using:

- Firebase Console (Cloud Messaging)
- Backend server using FCM API

Example request:

```
POST https://fcm.googleapis.com/fcm/send
Authorization: key=YOUR_SERVER_KEY
Content-Type: application/json

{
  "notification": {
    "title": "Hello!",
    "body": "Firebase Web Push Notification"
  },
  "to": "DEVICE_FCM_TOKEN"
}
```

---

## Notes

- Push notifications work only on **HTTPS** or **localhost**
- Supported browsers: Chrome, Firefox, Edge
- `firebase-messaging-sw.js` must be inside the `public` folder

---

## Dependencies

- Firebase SDK
- Firebase Cloud Messaging

---

## License

MIT License
