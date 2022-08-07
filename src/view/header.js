import { i18n } from "../initializers";
import { STATUS } from "../constants";

const header = document.querySelector("header");

const feedbackLabel = header.querySelector('[aria-label="feedback"]');
const input = header.querySelector('[aria-label="url"]');
const submit = header.querySelector('[type="submit"]');

const isFormDisabled = (status) =>
  ![STATUS.FAILED, STATUS.PENDING].includes(status);

export default (path, current) => {
  switch (path) {
    case "status": {
      input.disabled = isFormDisabled(current);
      submit.disabled = isFormDisabled(current);
      if (current === STATUS.PENDING) {
        input.value = "";
        feedbackLabel.textContent = i18n.t("success");
        feedbackLabel.classList.remove("text-danger");
        feedbackLabel.classList.add("text-success");
      }
      break;
    }
    case "error": {
      feedbackLabel.classList.remove("text-success");
      feedbackLabel.classList.add("text-danger");
      feedbackLabel.textContent = i18n.t(`errors.${current.message}`);
    }
  }
};
