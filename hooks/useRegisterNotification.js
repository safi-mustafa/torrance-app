import { useState, useEffect } from "react";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

export const useRegisterExpoToken = () => {
    // console.log("🚀 ~ file: useRegisterNotification.js:5 ~ Constants:", Constants)
    console.log("🚀 ~ file: useRegisterNotification.js:8 ~ Constants:", Constants?.expoConfig?.extra?.eas?.projectId)
    const projectId = Constants?.expoConfig?.extra?.eas?.projectId;

    const [token, setExpoNotificationToken] = useState('');
    async function registerForPushNotificationsAsync() {
        let token;

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
              name: 'default',
              importance: Notifications.AndroidImportance.MAX,
              vibrationPattern: [0, 250, 250, 250],
              lightColor: '#FF231F7C',
            });
          }

        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync({projectId})).data;
            console.log("🚀 ~ file: useRegisterNotification.js ~ line 21 ~ registerForPushNotificationsAsync ~ token", token)
        } else {
            console.log("🚀 ~ file: PushNotifications.js ~ line 23 ~ registerForPushNotificationsAsync ~ Must use physical device for Push Notifications")
        }

        // if (Platform.OS === 'android') {
        //     Notifications.setNotificationChannelAsync('default', {
        //         name: 'default',
        //         importance: Notifications.AndroidImportance.MAX,
        //         vibrationPattern: [0, 250, 250, 250],
        //         lightColor: '#FF231F7C',
        //     });
        // }

        return token;
    }

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoNotificationToken(token));
    }, []);

    return {
        token
    };
};