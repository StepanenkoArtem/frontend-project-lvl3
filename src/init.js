import i18next from "i18next";
import { object, string, setLocale } from "yup";

const i18n = i18next.createInstance();

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

setLocale({
  string: {
    url: {
      required: i18n.t("en.string.url.required"),
      invalid: i18n.t("string.url.invalid"),
    },
  },
});

const urlFormSchema = object({
  url: string().url().required(),
});

const VALIDATION = {
  PENDING: "pending",
  PASSED: "passed",
  FAILED: "failed",
};

const initState = {
  form: {
    validation: VALIDATION.PENDING,
    error: null,
  },
  urls: [],
};

const feeds = {
  channels: [
    /*
    {
      id: number,
      url: string,
      title: string,
      description: string
    } */
  ],

  posts: [
    /*
    {
      id: number,
      channelId: number,
      title: string,
      description: string,
      read: boolean,
    }
  */
  ],
};

export { i18n, initState, VALIDATION, urlFormSchema, feeds };
