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
  visitedPostIds: [],
};

const header = document.querySelector('header');
const feedbackLabel = header.querySelector('[aria-label="feedback"]');
const urlInput = header.querySelector('[aria-label="url"]');
const submitButton = header.querySelector('[type="submit"]');
const feedsContainer = document.querySelector('.feeds');
const postContainer = document.querySelector('.posts');

const refreshFeeds = (state) => {
  const urls = getUrls(state);
  Promise.all(urls.map((url) => download(url)
    .then(({ data }) => {
      const feedData = parse({ data, url });
      save(feedData, state);
    })))
    .then(() => {
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
