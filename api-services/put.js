import axios from "./api-client";
import { BASE_URL } from "../constants/Misc";

const put = async (url = "", params = {}) => {
  return await axios.put(BASE_URL + url, { ...params });
};
export default put;
