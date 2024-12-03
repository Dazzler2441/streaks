import { useState, useEffect } from 'react';

export const useNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermission>('default');

  const requestPermission = async () => {
    const result = await Notification.requestPermission();
    setPermission(result);
  };

  const sendNotification = (title: string, body: string) => {
    if (permission === 'granted') {
      new Notification(title, { body });
    }
  };

  return { permission, requestPermission, sendNotification };
}; 