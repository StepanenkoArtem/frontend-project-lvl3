import onChange from 'on-change';
import submit from './handlers/submitHandler';
import render from './handlers/render';
import { DELAY, STATUS } from './constants';
import download from './handlers/downloader';
import parse from './handlers/parser';
import save from './handlers/saver';
import { getUrls } from './helpers';
import i18n from './initializers/i18n';

const refetchFeeds = (state) => {
  const urls = getUrls(state);

  Promise.all(urls.map((url) => download(url)
    .then(({ data }) => {
      const feedData = parse({ data, url });
      save(feedData, state);
    })))
    .finally(() => {
      setTimeout(() => refetchFeeds(state), DELAY);
    });
};

export default () => {
  const initState = {
    error: null,
    status: STATUS.IDLE,
    rss: { feeds: [], posts: [] },
    visitedPostIds: [],
    postInModalWindow: null,
  };

  const ui = {
    feedbackLabel: document.querySelector('[aria-label="feedback"]'),
    urlInput: document.querySelector('[aria-label="url"]'),
    submitButton: document.querySelector('header [type="submit"]'),
    feedsContainer: document.querySelector('.feeds'),
    postContainer: document.querySelector('.posts'),
  };

  function onChangeHandler(path, current) {
    i18n.then((t) => {
      render(path, current, ui, this, t);
    });
  }

  const state = onChange(initState, onChangeHandler);
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => submit(e, form, state));
  refetchFeeds(state);
  const closeModalButtons = document.querySelectorAll('[data-bs-dismiss="modal"]');
  closeModalButtons.forEach((btn) => {
    btn.addEventListener('click', state.postInModalWindow = null);
  });
};
