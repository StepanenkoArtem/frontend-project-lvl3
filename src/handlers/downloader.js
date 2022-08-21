import axios from "axios";
import { ERRORS, STATUS } from "../constants";
import { state } from "../init";

export default (url) => {
  state.status = STATUS.DOWNLOADING;
  state.currentUrl = url;
  const wrappedUrl = `https://allorigins.hexlet.app/get?url=${url}`;
  return axios
    .get(wrappedUrl)
    .then((response) => response.data.contents)
    .catch((e) => {
      throw new Error(ERRORS.INVALID_RSS);
    });
};
