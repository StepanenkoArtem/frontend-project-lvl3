import onChange from 'on-change';
import _ from 'lodash';
import submit from './handlers/submitHandler';
import render from './handlers/render';
import initState from './initializers/state';
import { DELAY } from './constants';
import modalWindow from './templates/modal.html';
import download from './handlers/downloader';
import parse from './handlers/parser';
import save from './handlers/saver';

const refreshFeeds = (state) => {
  const { pendingUrls, urls } = state;
  urls.forEach((url) => {
    if (pendingUrls.includes(url)) {
      return;
    }
    pendingUrls.push(url);
    download(url)
      .then(parse)
      .then((contents) => save(contents, state))
      .finally(() => _.remove(pendingUrls, (pendingUrl) => pendingUrl === url));
  });
  setTimeout(() => refreshFeeds(state), DELAY);
};

export default () => {
  const state = onChange(initState, render);
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => submit(e, form, state));
  refreshFeeds(state);
  const modalElement = document.createElement('div');
  modalElement.innerHTML = modalWindow;

  document.body.appendChild(modalElement);
};
