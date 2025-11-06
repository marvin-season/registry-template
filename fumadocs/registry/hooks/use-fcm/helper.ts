// @ts-nocheck
import { initializeApp } from 'firebase/app';
import { type GetTokenOptions, getMessaging, getToken, isSupported } from 'firebase/messaging';
import { requestPermission } from '@/lib';

const firebaseConfig = {
  apiKey: 'AIzaSyCN99e2MFNFCBgZAh4YjbboM7dx4L208cc',
  authDomain: 'my-awesome-20250904.firebaseapp.com',
  projectId: 'my-awesome-20250904',
  storageBucket: 'my-awesome-20250904.firebasestorage.app',
  messagingSenderId: '447700238822',
  appId: '1:447700238822:web:57170ca06a374c10671627',
  measurementId: 'G-L0TVC48MM3',
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a reference to the service
export const messaging = () => getMessaging(app);

export async function getFCMToken(params: Pick<GetTokenOptions, 'vapidKey'>) {
  const { vapidKey } = params;
  const permission = await requestPermission();

  if (typeof window !== 'undefined' && 'serviceWorker' in navigator && permission === 'granted') {
    try {
      if (!(await isSupported())) {
        return;
      }

      return await getToken(messaging(), {
        vapidKey,
      });
    } catch (error) {
      console.error('getFCMToken error:', error);
    }
  }
}
