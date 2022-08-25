import validateUrl from '../validations/url';
import download from './downloader';
import parse from './parser';
import save from './saver';
import isUrlExist from '../validations/duplication';
import { STATUS } from '../constants';

export default (e, form, initState) => {
  const state = initState;
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(form));
  state.status = STATUS.DOWNLOADING;

  validateUrl(formData)
    .then(({ url }) => isUrlExist(url, state.urls))
    .then(download)
    .then(parse)
    .then((contents) => save(contents, state))
    .then(() => {
      state.error = null;
      state.status = STATUS.SUCCESS;
    })
    .catch((err) => {
      state.error = err;
      state.status = STATUS.FAILED;
    })
    .finally(() => {
      state.error = null;
      state.status = STATUS.PENDING;
    });
};
