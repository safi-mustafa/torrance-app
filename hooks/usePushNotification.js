import { useState, useEffect, useRef } from "react";
import * as Notifications from 'expo-notifications';
import { useNavigation } from "@react-navigation/native";

import { getKey, getNotificationApiUrl, objectNotEmpty } from "../utility";
import useUserMeta from "./useUserMeta";
import { ToastAndroid } from "react-native";

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
    // const { userMeta } = useUserMeta();

    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        initNotification();
    }, []);

    useEffect(() => {
        if (notification) {
            // console.log("🚀 ~ file: usePushNotification.js ~ line 24 ~ React.useEffect ~ notification", notification)
            handleNotificationTap(notification);
        }
    }, [notification]);

    const handleNotificationTap = async (notification) => {
        let userMeta = await getKey('user');
        if (userMeta) {
            userMeta = JSON.parse(userMeta);
        }
        openDetailNotif(notification, userMeta)
    }

    const openDetailNotif = (item, userMeta) => {
        // console.log("🚀 ~ file: usePushNotification.js:32 ~ openDetailNotif ~ item", item)
        console.log("🚀 ~ file: usePushNotification.js:40 ~ openDetailNotif ~ userMeta:", userMeta)
        ToastAndroid.showWithGravityAndOffset(
            JSON.stringify(userMeta),
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
        );
        // alert(JSON.stringify(userMeta))
        if (!userMeta?.token) {
            // console.log("🚀 ~ file: usePushNotification.js:48 ~ openDetailNotif ~ userMeta?.token:", userMeta?.token)
            navigation.navigate("Login", { notification: item })
        } else {
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
    }

    const initNotification = () => {
        // registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            // ToastAndroid.showWithGravityAndOffset(
            //     JSON.stringify(notification),
            //     ToastAndroid.LONG,
            //     ToastAndroid.BOTTOM,
            //     25,
            //     50
            // );
            // const notifContent = response?.request?.content;
            // console.log("🚀 ~ file: usePushNotification.js ~ line 87 ~ initNotification ~ notifContent", notification)
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