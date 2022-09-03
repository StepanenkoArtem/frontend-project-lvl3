import axios from 'axios';
import { ERRORS } from '../constants';

export default (url) => {
  const wrappedUrl = `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`;

  return axios
    .get(wrappedUrl)
    .then(({ data }) => ({ data, url }))
    .catch((e) => {
      if (e.code === 'ERR_NETWORK') {
        throw new Error(ERRORS.ERR_NETWORK);
      }
      throw new Error(ERRORS.INVALID_RSS);
    });
};
