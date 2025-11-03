const logger = console.log;
const searchKey = "__s";
const searchValue = "n";
const storageKey = "storageKey";
const CHANNEL_NOTIFICATION_KEY = "NEW_NOTIFICATION";

// Create BroadcastChannel for notification
const notificationChannel = new BroadcastChannel(storageKey);

// Must be placed before importScripts
globalThis.addEventListener("notificationclick", (event) => {
  logger("[notificationclick]", event);

  if (!event.notification || !event.notification.data) {
    return;
  }
  event.notification.close();

  const { FCM_MSG } = event.notification.data;

  if (!FCM_MSG) {
    return;
  }
  const { data } = FCM_MSG;

  const defaultLink = globalThis.location.origin;
  const link = data?.link || defaultLink;

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((windowClients) => {
        for (const client of windowClients) {
          const clientUrl = new URL(client.url);
          const notificationUrl = new URL(link);
          if (
            clientUrl.origin === notificationUrl.origin &&
            "focus" in client
          ) {
            client.postMessage({ [searchKey]: searchValue });
            return client.focus();
          }
        }
        return clients.openWindow(`${link}?${searchKey}=${searchValue}`);
      }),
  );
});

importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js",
);
importScripts("https://cdnjs.cloudflare.com/ajax/libs/idb-keyval/6.2.2/umd.js");

const firebaseConfig = {
  apiKey: "AIzaSyCN99e2MFNFCBgZAh4YjbboM7dx4L208cc",
  authDomain: "my-awesome-20250904.firebaseapp.com",
  projectId: "my-awesome-20250904",
  storageBucket: "my-awesome-20250904.firebasestorage.app",
  messagingSenderId: "447700238822",
  appId: "1:447700238822:web:57170ca06a374c10671627",
  measurementId: "G-L0TVC48MM3",
};
// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage(async (payload) => {
  logger("[firebase-messaging-sw.js] Received background message:", payload);
  // Store message to IndexedDB
  try {
    // Get existing data, keep Zustand's StorageValue structure
    const existingData = (await idbKeyval.get(storageKey)) || {
      state: {
        notifications: [],
      },
      version: 0,
    };

    const newNotification = {
      ...payload,
      createdAt: Date.now(),
    };

    existingData.state.notifications = [
      newNotification,
      ...existingData.state.notifications,
    ];

    existingData.version = existingData.version || 0;

    await idbKeyval.set(storageKey, existingData);

    // 通过 BroadcastChannel 通知所有打开的页面同步数据
    notificationChannel.postMessage({
      type: CHANNEL_NOTIFICATION_KEY,
      payload,
    });
  } catch (error) {}
});
