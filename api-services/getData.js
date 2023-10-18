import Toast from "react-native-toast-message";
import client from "./api-client";

const getData = async ({ url = "", params = {} }, onSuccess = () => { }, onError = () => { }) => {
  client.get(url, { ...params })
    .then((response) => {
      onSuccess(response?.data)
    }, (error) => {
      const parsedError = JSON.parse(JSON.stringify(error));
      console.log("🚀 ~ file: getData.js:10 ~ .then ~ parsedError:", parsedError)
      onError(parsedError?.response);
      let resMessage = error?.response;
      let message = Array.isArray(resMessage)
        ? resMessage.join(".")
        : "Something went wrong, Please try again.";
      if (parsedError?.response?.status == 404)
        message = 'Log doesn\'t exist. or you are not authorized';
      Toast.show({
        type: "error",
        text1: message,
      });
    })
};
export default getData;
