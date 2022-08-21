import { state } from "../init";
import { ERRORS } from "../constants";

export default ({ url }) => {
  const { urls } = state;

  if (urls.includes(url)) {
    throw new Error(ERRORS.URL_NOT_UNIQ);
  }
  return url;
};
