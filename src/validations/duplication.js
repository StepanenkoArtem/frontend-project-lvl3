import { ERRORS } from '../constants';

export default (url, urls) => {
  if (urls.includes(url)) {
    throw new Error(ERRORS.URL_NOT_UNIQ);
  }
  return url;
};
