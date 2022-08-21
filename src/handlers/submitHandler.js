import validateUrl from "../validations/url";

import download from "./downloader";
import parse from "./parser";
import save from "./saver";
import handleError from "./errors";
import isUrlExist from  "../validations/duplication"

export default (e, form) => {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(form));

  validateUrl(formData)
    .then(isUrlExist)
    .then(download)
    .then(parse)
    .then(save)
    .catch(handleError);
};
