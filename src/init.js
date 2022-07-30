import i18next from "i18next";

export const VALIDATION = {
  PENDING: "pending",
  PASSED: "passed",
  FAILED: "failed",
};

export const initState = {
  form: {
    validation: VALIDATION.PENDING,
    error: null,
  },
  urls: [],
};

export const i18n = i18next.createInstance();

i18n.init({
  lng: "en",
  debug: false,
  resources: {
    en: {
      translation: {
        string: {
          url: {
            required: "URL field is required",
            added: "This RSS feed already added to your list",
            invalid: "Url address should be valid!",
          },
        },
      },
    },
  },
});
