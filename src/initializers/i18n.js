import i18next from "i18next";

const i18nConfig = {
  lng: "ru",
  debug: true,
  resources: {
    ru: {
      translation: {
        success: "RSS успешно загружен",
        viewPostButton: 'Просмотр',
        postsHeader: 'Посты',
        feedsHeader: 'Фиды',
        errors: {
          URL_NOT_UNIQ: "RSS уже существует",
          INVALID_RSS: "Ресурс не содержит валидный RSS",
          INVALID_URL: "Ссылка должна быть валидным URL",
          ERR_NETWORK: "Ошибка сети",
        },
      },
    },
  },
};

const i18n = i18next.createInstance();
i18n.init(i18nConfig).then((t) => t());

export default i18n;
