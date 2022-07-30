import "bootstrap";
import "./styles/styles.scss";
import onChange from "on-change";
import { object, string } from "yup";
import render from "./view";

let urlFormSchema = object({
  url: string().url().required("URL CAN'T BE EMPTY"),
});

export const VALIDATION = {
  PENDING: "pending",
  PASSED: "passed",
  FAILED: "failed",
};

const form = document.querySelector("form");

const initState = {
  form: {
    validation: VALIDATION.PENDING,
    error: null,
  },
  urls: [],
};

const state = onChange(initState, render);

const isNotExist = (url) =>
  state.urls.includes(url)
    ? new Promise((resolve, reject) => reject(new Error("Url already exists")))
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
