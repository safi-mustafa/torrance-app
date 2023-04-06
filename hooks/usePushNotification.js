import { useState, useEffect, useRef } from "react";
import * as Notifications from 'expo-notifications';
import { useNavigation } from "@react-navigation/native";

import { getNotificationApiUrl, objectNotEmpty } from "../utility";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export const usePushNotification = () => {
    const [notification, setNotification] = useState(false);
    const navigation = useNavigation();

    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        initNotification();
    }, []);

    useEffect(() => {
        if (notification) {
            console.log("🚀 ~ file: usePushNotification.js ~ line 24 ~ React.useEffect ~ notification", notification)
            openDetailNotif(notification)
        }
    }, [notification]);

    const openDetailNotif = (item) => {
        console.log("🚀 ~ file: usePushNotification.js:32 ~ openDetailNotif ~ item", item)
        if (item?.EntityId) {
            navigation.navigate("SingleSubmission", {
                id: item?.EntityId,
                // apiUrl: item?.LogType == 1 ? "/TOTLog" : "/OverrideLog",
                apiUrl: getNotificationApiUrl(item?.EntityType)
            })

            // if (objectNotEmpty(navigation)) {
            // const routeName = TASK_TYPE.AUDIT === item?.TaskType ? 'AuditDetails' : 'TaskDetails';
            // navigation.navigate(routeName, { id: item?.TaskId });
            // }
            setNotification(false)
        }
    }

    const initNotification = () => {
        // registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            // const notifContent = response?.request?.content;
            // console.log("🚀 ~ file: usePushNotification.js ~ line 28 ~ initNotification ~ notifContent", notifContent)
            // setNotification(notifContent);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            const notifContent = response?.notification?.request?.content;
            const notifData = notifContent?.data;
            setNotification({ ...notifData });
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
            // setNotification(false);
        };
    }

    return {
        // notificationData,
        ...notification
    };
};