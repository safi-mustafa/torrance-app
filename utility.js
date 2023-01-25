import * as SecureStore from 'expo-secure-store';

export const saveKey = async (key, value) => {
    await SecureStore.setItemAsync(key, value);
}

export const getKey = async (key) => {
    let result = await SecureStore.getItemAsync(key);
    return result ? result : null;
}

export const getFormatedDate = (date = "") => {
    return new Date(date).toLocaleDateString();
};