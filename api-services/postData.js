import axios from "./api-client";
import { BASE_URL } from "../constants/Misc";

const postData = async (url = "", params = {}) => {
  return await axios.post(BASE_URL + url, { ...params });
};
export default postData;
