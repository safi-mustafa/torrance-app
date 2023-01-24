import Toast from "react-native-toast-message";

import axios from "./api-client";
import { BASE_URL } from "../constants/Misc";

const postData = ({ url = "", params = {} }, onSuccess, onError) => {
  axios.post(BASE_URL + url, { ...params })
    .then((response) => onSuccess(response.data), (error) => {
      onError(error);
      let { data } = error?.response;
      // console.log("🚀 ~ file: postData.js ~ line 11 ~ .then ~ data", data)
      if (data?.status > 204) {
        const { title = '', errors } = data;
        let message = Array.isArray(errors)
          ? resMessage.join(".")
          : "Something went wrong, Please try again.";
        Toast.show({
          type: "error",
          text1: title,
          text2: message
        });
      } else console.log('nai gaya')
    })
};
export default postData;
