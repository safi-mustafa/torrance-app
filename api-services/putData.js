import Toast from "react-native-toast-message";

import client from "./api-client";


const putData = ({ url = "", params = {} }, onSuccess, onError) => {
  // console.log("🚀 ~ file: postData.js ~ line 7 ~ postData ~ params", params)
  client.put(url, { ...params })
    .then((response) => onSuccess(response.data), (error) => {
      const parsedError = JSON.parse(JSON.stringify(error));
      onError(parsedError?.response);
      let { status } = error?.response;
      if (status > 204) {
        const { title = 'Error', errors = [] } = error?.response?.data;
        let message = Array.isArray(errors)
          ? errors.join(".")
          : "Something went wrong, Please try again.";
        Toast.show({
          type: "error",
          text1: title,
          text2: message
        });
      } else console.log('nai gaya')
    })
};
export default putData;
