export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function requestPermission() {
  if (!('Notification' in window)) {
    console.warn('Current browser does not support Notification API');
    return;
  }

  if (Notification.permission !== 'granted') {
    try {
      return await Notification.requestPermission();
    } catch (error) {
      console.error('requestPermission error:', error);
      return 'denied';
    }
  }

  return Notification.permission;
}
