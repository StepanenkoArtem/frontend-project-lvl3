import { sortBy } from 'lodash/collection';
import i18n from '../initializers/i18n';
import { state } from '../init';

const postContainer = document.querySelector('.posts');

const styles = {
  visited: ['link-secondary', 'fw-normal'],
  unvisited: ['link-primary', 'fw-bold'],
};

const appendVisitedPosts = (e) => {
  const { rss } = state;
  const id = e.target.dataset.postId;
  rss.visitedPostIds = [...rss.visitedPostIds, id];
};

const showPostInfoInModal = (e) => {
  const id = e.target.dataset.postId;
  const post = state.rss.posts.find((post) => post.id === id);
  const postInfoModal = document.querySelector('#viewPostDetails');
  postInfoModal.querySelector('.modal-title').textContent = post.title;
  postInfoModal.querySelector('.modal-body').textContent = post.description;
  const readButton = postInfoModal.querySelector('#readPostButton');
  readButton.setAttribute('href', post.link);
  readButton.setAttribute('target', '_blank');
};

const createLink = (post) => {
  const { rss } = state;
  const linkStyles = rss.visitedPostIds.includes(post.id)
    ? styles.visited
    : styles.unvisited;

  const link = document.createElement('a');
  link.setAttribute('href', post.link);
  link.setAttribute('target', '_blank');

  link.classList.add('col-10', ...linkStyles);
  link.textContent = post.title;
  link.dataset.postId = post.id;
  link.addEventListener('click', appendVisitedPosts);

  return link;
};

const createButton = (post) => {
  const button = document.createElement('button');
  button.classList.add('btn-sm', 'btn-outline-primary', 'col-2', 'btn');
  button.dataset.bsToggle = 'modal';
  button.dataset.bsTarget = '#viewPostDetails';
  button.textContent = i18n.t('viewPostButton');
  button.dataset.postId = post.id;
  button.addEventListener('click', (e) => {
    showPostInfoInModal(e);
    appendVisitedPosts(e);
  });
  return button;
};

const renderPost = (post) => {
  const postDiv = document.createElement('li');
  postDiv.classList.add('mb-1', 'row');

  const postLink = createLink(post);
  const viewPostButton = createButton(post);

  postDiv.append(postLink, viewPostButton);
  postContainer.appendChild(postDiv);
};

export default (posts) => {
  if (!posts.length) {
    return;
  }

  postContainer.innerHTML = '';

  const postsTitle = document.createElement('h3');
  postsTitle.textContent = i18n.t('postsHeader');
  postsTitle.classList.add('h3');
  postContainer.appendChild(postsTitle);

  const postList = document.createElement('ul');
  const postListItems = sortBy(posts, 'pubDate').reverse().map(renderPost);
  postList.append(...postListItems);
  postContainer.prepend(postsTitle);
};
