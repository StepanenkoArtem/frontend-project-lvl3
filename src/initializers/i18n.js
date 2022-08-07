import i18next from "i18next";

const i18nConfig = {
  lng: "en",
  debug: true,
  resources: {
    en: {
      translation: {
        success: "RSS feed was successfully loaded",
        errors: {
          URL_NOT_UNIQ: "This RSS feed already has been loaded",
          INVALID_RSS: "The resource doesn't contain valid RSS feed",
          INVALID_URL: "The link should be a valid URL address",
        },
      },
    },
  },
};

const i18n = i18next.createInstance();
i18n.init(i18nConfig).then((t) => t());

export { i18n };
