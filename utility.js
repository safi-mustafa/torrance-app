import * as SecureStore from 'expo-secure-store';
import { NativeModules } from "react-native";
const { StatusBarManager } = NativeModules;

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

export const parseModelState = (modelState) => {
    const errorDictionary = {};

    for (const key in modelState) {
        if (modelState.hasOwnProperty(key)) {
            const errors = modelState[key];
            if (errors && errors.length > 0) {
                if (!key.includes("[")) {
                    // Handle regular keys without array indexes
                    errorDictionary[key] = [errors[0]];
                } else {
                    // Handle keys with array indexes
                    const segments = key.split(".");
                    let currentDict = errorDictionary;

                    for (let i = 0; i < segments.length; i++) {
                        const segment = segments[i];
                        const isArrayIndex = segment.endsWith("]");

                        if (isArrayIndex) {
                            const openingBracketIndex = segment.lastIndexOf("[");
                            const arrayKey = segment.substring(0, openingBracketIndex);

                            if (!currentDict[arrayKey]) {
                                currentDict[arrayKey] = [];
                            }

                            const arrayDict = currentDict[arrayKey];

                            const index = parseInt(
                                segment.substring(
                                    openingBracketIndex + 1,
                                    segment.length - 1
                                )
                            );

                            while (arrayDict.length <= index) {
                                arrayDict.push({});
                            }

                            currentDict = arrayDict[index];
                        } else {
                            if (!currentDict[segment]) {
                                currentDict[segment] = {};
                            }

                            currentDict = currentDict[segment];
                        }
                    }

                    currentDict[errors[0]] = errors[0];
                }
            }
        }
    }

    return errorDictionary;
}

export const parseCostsModelState = (data) => {
    let errors = {};
    for (const property in data) {
        if (property.startsWith("Costs") && property.includes("].")) {
            // Get the index of the Costs array element
            const index = property.match(/\[(\d+)\]/)[1];

            // Get the attribute name after the index
            const attributeName = property.substring(property.indexOf(".") + 1);

            // Get the error message
            const errorMessage = data[property][0];

            if (!errors[index]) {
                errors[index] = {};
            }

            errors[index][attributeName] = errorMessage;
        }
    }
    return errors;
}