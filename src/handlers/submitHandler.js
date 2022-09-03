import validateUrl from '../validations/url';
import download from './downloader';
import parse from './parser';
import save from './saver';
import isUrlExist from '../validations/duplication';
import { STATUS } from '../constants';

export default (e, form, initState) => {
  const state = initState;

  const setState = (status, err = null) => {
    state.error = err;
    state.status = status;
  };

  e.preventDefault();
  const formData = Object.fromEntries(new FormData(form));
  state.status = STATUS.PENDING;

  validateUrl(formData)
    .then(({ url }) => isUrlExist(url, state.urls))
    .then(download)
    .then(parse)
    .then((contents) => save(contents, state))
    .then(() => setState(STATUS.SUCCESS))
    .catch((err) => setState(STATUS.FAILED, err))
    .finally(() => setState(STATUS.IDLE));
};
