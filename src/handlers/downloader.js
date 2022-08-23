import axios from "axios";
import { ERRORS } from "../constants";

export default (url) => {
  const wrappedUrl = `https://allorigins.hexlet.app/get?url=${url}`;
  return axios
    .get(wrappedUrl)
    .then(({data}) => data)
    .catch(() => {
      throw new Error(ERRORS.INVALID_RSS);
    });
};
