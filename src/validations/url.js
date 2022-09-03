import * as Yup from 'yup';
import { ERRORS } from '../constants';

const errorTypes = {
  notOneOf: ERRORS.URL_NOT_UNIQ,
  url: ERRORS.INVALID_URL,
};

export default (url, urls) => {
  const urlFormSchema = Yup.object().shape(
    { url: Yup.string().trim().url().notOneOf(urls) },
  );

  return urlFormSchema
    .validate(url)
    .catch((e) => {
      throw new Error(errorTypes[e.type]);
    });
};
