import { VALIDATION } from "./init";

export default (path, current) => {
  const input = document.querySelector('[aria-label = "url"]');
  switch (path) {
    case "form.validation": {
      current === VALIDATION.PASSED
        ? input.classList.remove("is-invalid")
        : input.classList.add("is-invalid");
      break;
    }
    case "form.error": {
      break;
    }
    case "urls": {
      input.classList.remove("is-invalid");
      input.value = "";
      break;
    }
    default:
  }
};
