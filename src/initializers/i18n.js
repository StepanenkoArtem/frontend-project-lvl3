import i18next from 'i18next';

const i18nConfig = {
  lng: 'ru',
  debug: true,
  resources: {
    ru: {
      translation: {
        success: 'RSS успешно загружен',
        viewPostButton: 'Просмотр',
        postsHeader: 'Посты',
        feedsHeader: 'Фиды',
        downloading: 'Загружаю фид..',
        errors: {
          URL_NOT_UNIQ: 'RSS уже существует',
          INVALID_RSS: 'Ресурс не содержит валидный RSS',
          INVALID_URL: 'Ссылка должна быть валидным URL',
          ERR_NETWORK: 'Ошибка сети',
        },
      },
    },
  },
};

export default i18next.createInstance().init(i18nConfig);
