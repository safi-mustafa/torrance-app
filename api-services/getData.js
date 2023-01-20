import axios from "./api-client";
import { BASE_URL } from "../constants/Misc";

const getData = async (url = "", params = {}) => {
  return await axios.get(BASE_URL + url, { params });
};
export default getData;
