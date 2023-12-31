import Toast from "react-native-toast-message";

import client from "./api-client";

const postData = ({ url = "", params = {}, showErrorMessage = true }, onSuccess, onError) => {
  // console.log("🚀 ~ file: postData.js ~ line 7 ~ postData ~ params", params)
  client.post(url, { ...params })
    .then((response) => onSuccess(response.data), (error) => {
      const parsedError = JSON.parse(JSON.stringify(error));
      console.log("🚀 ~ file: postData.js:10 ~ .then ~ parsedError", parsedError,error?.response)
      onError(parsedError?.response);
      let { status } = error?.response;
      if (status > 204 && showErrorMessage) {
        const { title = 'Error', errors = [] } = error?.response?.data;
        let message = Array.isArray(errors)
          ? errors.join(".")
          : "Something went wrong, Please try again.";
        Toast.show({
          type: "error",
          text1: title,
          text2: message
        });
      } //else console.log('nai gaya')
    })
};
export default postData;
