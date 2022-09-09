import onChange from 'on-change';
import submit from './handlers/submitHandler';
import render from './handlers/render';
import { DELAY, STATUS } from './constants';
import download from './handlers/downloader';
import parse from './handlers/parser';
import save from './handlers/saver';
import { getUrls } from './helpers';

const initState = {
  error: null,
  status: STATUS.IDLE,
  rss: {
    feeds: [],
    posts: [],
  },
};

const header = document.querySelector('header');
const feedbackLabel = header.querySelector('[aria-label="feedback"]');
const urlInput = header.querySelector('[aria-label="url"]');
const submitButton = header.querySelector('[type="submit"]');
const feedsContainer = document.querySelector('.feeds');
const postContainer = document.querySelector('.posts');

const refreshFeeds = (state) => {
  const urls = getUrls(state);
  Promise
    .all(urls.map((url) => download(url)
      .then(({ data }) => {
        const feedData = parse({ data, url });
        save(feedData, state);
      })))
    .then(() => {
      setTimeout(() => refreshFeeds(state), DELAY);
    });
};

export default () => {
  const ui = {
    header,
    feedbackLabel,
    urlInput,
    submitButton,
    feedsContainer,
    postContainer,
  };

  function onChangeHandler(path, current) {
    render(path, current, ui, this);
  }

  const state = onChange(initState, onChangeHandler);
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => submit(e, form, state));
  refreshFeeds(state);
  const modalElement = document.querySelector('#viewPostDetails');
  document.body.appendChild(modalElement);
};
