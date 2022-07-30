import "bootstrap";
import "./styles/styles.scss";
import onChange from "on-change";
import { object, string, setLocale } from "yup";
import render from "./view";
import { i18n, initState, VALIDATION } from "./init";

setLocale({
  string: {
    url: {
      required: i18n.t("en.string.url.required"),
      invalid: i18n.t("string.url.invalid"),
    },
  },
});

let urlFormSchema = object({
  url: string().url().required(),
});

const form = document.querySelector("form");

const state = onChange(initState, render);

const isNotExist = (url) =>
  state.urls.includes(url)
    ? new Promise((resolve, reject) =>
        reject(new Error(i18n.t("string.url.added")))
      )
    : true;

const handleValidationError = (error) => {
  state.form.error = error.message;
  state.form.validation = VALIDATION.FAILED;
};

const save = (url) => {
  state.urls.push(url);
  state.form.validation = VALIDATION.PASSED;
  state.form.error = null;
};

const handleSubmit = (e) => {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(form));
  const { url } = formData;

  urlFormSchema
    .validate(formData)
    .then(() => isNotExist(url))
    .then(() => save(url))
    .catch(handleValidationError);
};

form.addEventListener("submit", handleSubmit);
