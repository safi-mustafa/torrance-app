import * as SecureStore from 'expo-secure-store';
import { NativeModules } from "react-native";
const {StatusBarManager} = NativeModules;

export const STATUSBAR_HEIGHT = StatusBarManager.HEIGHT;

export const saveKey = async (key, value) => {
    await SecureStore.setItemAsync(key, value);
}

export const getKey = async (key) => {
    let result = await SecureStore.getItemAsync(key);
    return result ? result : null;
}

export const getFormatedDate = (date = "", options = {
    year: "numeric",
    month: "short",
    day: "numeric",
}) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString("en-US", options);
};

export const toCapitalCase = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export const objectNotEmpty = (obj) => {
    if (typeof obj === "undefined") return false;
    return Object.keys(obj).length !== 0;
};

export const getApiUrl = (type) => {
    if (type == "TimeOnTools") return "/TOTLog";
    else if (type == "WeldingRodRecord") return "/WRRLog";
    else return "/OverrideLog";
};

export const getNotificationApiUrl = (type) => {
    if (type == "TOTLog")
        return '/TOTLog';
    else if (type == "WRRLog")
        return '/WRRLog';
    else
     return '/OverrideLog'
}