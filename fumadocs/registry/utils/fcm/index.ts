// @ts-nocheck
import { initializeApp } from 'firebase/app'
import {
  type GetTokenOptions,
  getMessaging,
  getToken,
  isSupported,
} from 'firebase/messaging'


const firebaseConfig = {
    apiKey: "AIzaSyCN99e2MFNFCBgZAh4YjbboM7dx4L208cc",
    authDomain: "my-awesome-20250904.firebaseapp.com",
    projectId: "my-awesome-20250904",
    storageBucket: "my-awesome-20250904.firebasestorage.app",
    messagingSenderId: "447700238822",
    appId: "1:447700238822:web:57170ca06a374c10671627",
    measurementId: "G-L0TVC48MM3",
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Cloud Messaging and get a reference to the service
export const messaging = () => getMessaging(app)

export async function getFCMToken(
  params: {
    permission?: NotificationPermission
  } & Pick<GetTokenOptions, 'vapidKey'>,
) {
  const { permission, vapidKey } = params
  if (
    typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    permission === 'granted'
  ) {
    try {
      if (!(await isSupported())) {
        return
      }

      return await getToken(messaging(), {
        vapidKey,
      })
    } catch (error) {
      console.error('getFCMToken error:', error)
    }
  }
}

export async function requestPermission() {
  if (!('Notification' in window)) {
    console.warn('Current browser does not support Notification API')
    return
  }

  if (Notification.permission !== 'granted') {
    try {
      return await Notification.requestPermission()
    } catch (error) {
      console.error('requestPermission error:', error)
      return 'denied'
    }
  }

  return Notification.permission
}
