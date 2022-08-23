import validateUrl from "../validations/url";
import { state } from "../init";
import download from "./downloader";
import parse from "./parser";
import save from "./saver";
import handleError from "./errors";
import isUrlExist from "../validations/duplication";
import { STATUS } from "../constants";

export default (e, form) => {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(form));
  state.status = STATUS.DOWNLOADING;

  validateUrl(formData)
    .then(isUrlExist)
    .then(download)
    .then(parse)
    .then(save)
    .finally(() => (state.status = STATUS.PENDING))
    .catch(handleError);
};
