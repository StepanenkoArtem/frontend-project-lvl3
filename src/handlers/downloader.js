import axios from 'axios';
import { ERRORS } from '../constants';

export default (url) => {
  const wrappedUrl = new URL('https://allorigins.hexlet.app/get');
  wrappedUrl.searchParams.append('disableCache', 'true');
  wrappedUrl.searchParams.append('url', url);

  return axios
    .get(wrappedUrl.toString())
    .then(({ data }) => ({ data, url }))
    .catch((e) => {
      if (e.code === 'ERR_NETWORK') {
        throw new Error(ERRORS.ERR_NETWORK);
      }
      throw new Error(ERRORS.INVALID_RSS);
    });
};
