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
  const state = onChange(initState, render);
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => submit(e, form, state));
  refreshFeeds(state);
  const modalElement = document.querySelector('#viewPostDetails');
  document.body.appendChild(modalElement);
};
