import Toast from "react-native-toast-message";

import axios from "./api-client";
import { BASE_URL } from "../constants/Misc";

const postData = ({ url = "", params = {} }, onSuccess, onError) => {
  axios.post(BASE_URL + url, { ...params })
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
export default postData;
