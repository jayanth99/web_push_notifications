importScripts('https://www.gstatic.com/firebasejs/9.9.3/firebase-app-compat.js');
importScripts("https://www.gstatic.com/firebasejs/9.9.3/firebase-messaging-compat.js");

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyBet29pR4_VvK8U0PduW4R6OzIU3gswMAg",
    authDomain: "webnotif-67d29.firebaseapp.com",
    databaseURL: "https://webnotif-67d29.firebaseio.com",
    projectId: "webnotif-67d29",
    storageBucket: "webnotif-67d29.appspot.com",
    messagingSenderId: "829409621365",
    appId: "1:829409621365:web:3eba26d37683ef86c90f3c",
    measurementId: "G-4GFZ8N6X6B",
});

// firebase.initializeApp(firebaseConfig);
// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log("Received background message ", payload);

    const notificationTitle = payload.data.title;
    const notificationOptions = {
        body: payload.data.body,
        data: {
            source: payload.data.source
        }
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function (event) {
    console.log('[Service Worker] Notification click Received.');

    event.notification.close();

    if (event.notification.data.source === 'ODA') {
        event.waitUntil(
            // Open the host app and expand chat widget
            self.clients.matchAll({
                includeUncontrolled: true,
                type: 'window'
            }).then(clientsArr => {
                for (const client of clientsArr) {
                    if (client.url === 'http://localhost:8080/' && 'focus' in client) {
                        client.postMessage('ODA');
                        return client.focus();
                    }
                }
                if (clients.openWindow) {
                    return clients.openWindow('http://localhost:8080/').then(client => {
                        client.postMessage('ODA');
                        // return client.focus();
                    });
                }
            })
        );
    }
});