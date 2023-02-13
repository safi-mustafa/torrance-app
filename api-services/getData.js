import Toast from "react-native-toast-message";
import client from "./api-client";

const getData = async ({ url = "", params = {} }, onSuccess = () => { }, onError = () => { }) => {
  client.get(url, { ...params })
    .then((response) => onSuccess(response.data), (error) => {
      const parsedError = JSON.parse(JSON.stringify(error));
      onError(parsedError?.response);
      let resMessage = error?.response;
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
