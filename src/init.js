import onChange from 'on-change';
import submit from './handlers/submitHandler';
import render from './handlers/render';
import { DELAY, STATUS } from './constants';
import download from './handlers/downloader';
import parse from './handlers/parser';
import save from './handlers/saver';
import { getUrls } from './helpers';
import i18n from './initializers/i18n';

const refreshFeeds = (state) => {
  const urls = getUrls(state);
  Promise.all(urls.map((url) => download(url)
    .then(({ data }) => {
      const feedData = parse({ data, url });
      save(feedData, state);
    })))
    .finally(() => {
      setTimeout(() => refreshFeeds(state), DELAY);
    });
};

const showPostInfoInModal = (post) => {
  const postInfoModal = document.querySelector('#viewPostDetails');
  postInfoModal.querySelector('.modal-title').textContent = post.title;
  postInfoModal.querySelector('.modal-body').textContent = post.description;
  const readButton = postInfoModal.querySelector('#readPostButton');
  readButton.setAttribute('href', post.link);
  readButton.setAttribute('target', '_blank');
};

export default () => {
  const initState = {
    error: null,
    status: STATUS.IDLE,
    rss: { feeds: [], posts: [] },
    visitedPostIds: [],
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

    const postElements = document.querySelectorAll('[data-post-id]');
    postElements.forEach((postElement) => {
      postElement.addEventListener('click', (e) => {
        const { postId } = e.target.dataset;
        this.visitedPostIds = [...this.visitedPostIds, postId];
        if (postElement.tagName === 'BUTTON') {
          const postData = this.rss.posts.find((post) => post.id === postId);
          showPostInfoInModal(postData);
        }
      });
    });
  }

  const state = onChange(initState, onChangeHandler);
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => submit(e, form, state));
  refreshFeeds(state);
};
