import Toast from "react-native-toast-message";

import { BASE_URL } from "../constants/Misc";
import axios from "./api-client";

const getData = async ({ url = "", params = {} }, onSuccess = () => { }, onError = () => { }) => {
  axios.get(BASE_URL + url, { ...params })
    .then((response) => onSuccess(response.data), (error) => {
      onError(error);
      let resMessage = error?.response?.data?.errors?.message;
      let message = Array.isArray(resMessage)
        ? resMessage.join(".")
        : "Something went wrong, Please try again.";
      Toast.show({
        type: "error",
        text1: message,
      });
    })
};
export default getData;
