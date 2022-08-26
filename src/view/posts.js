import { sortBy } from 'lodash/collection';
import i18n from '../initializers/i18n';

const postContainer = document.querySelector('.posts');

const styles = {
  visited: ['link-secondary', 'fw-normal'],
  unvisited: ['fw-bold'],
};

const markAsVisited = (post) => Object.assign(post, { isVisited: true });

const showPostInfoInModal = (post) => {
  const postInfoModal = document.querySelector('#viewPostDetails');
  postInfoModal.querySelector('.modal-title').textContent = post.title;
  postInfoModal.querySelector('.modal-body').textContent = post.description;
  const readButton = postInfoModal.querySelector('#readPostButton');
  readButton.setAttribute('href', post.link);
  readButton.setAttribute('target', '_blank');
};

const createLink = (post) => {
  const linkStyles = post.isVisited
    ? styles.visited
    : styles.unvisited;

  const link = document.createElement('a');
  link.setAttribute('href', post.link);
  link.setAttribute('target', '_blank');

  link.classList.add(...linkStyles);
  link.textContent = post.title;
  link.dataset.postId = post.id;
  link.addEventListener('click', () => markAsVisited(post));

  return link;
};

const createButton = (post) => {
  const button = document.createElement('button');
  button.classList.add('btn', 'btn-sm', 'btn-outline-primary');
  button.dataset.bsToggle = 'modal';
  button.dataset.bsTarget = '#viewPostDetails';
  button.textContent = i18n.t('viewPostButton');
  button.dataset.postId = post.id;
  button.addEventListener('click', () => {
    showPostInfoInModal(post);
    markAsVisited(post);
  });
  return button;
};

const renderPost = (post) => {
  const postListItem = document.createElement('li');
  postListItem.classList.add('d-flex', 'justify-content-between', 'border-0', 'rounded-0', 'list-group-item-action', 'list-group-item');

  postListItem.append(createLink(post), createButton(post));
  return postListItem;
};

export default ({ posts }) => {
  postContainer.innerHTML = '';

  if (!posts.length) {
    return;
  }

  const header = document.createElement('h3');
  header.textContent = i18n.t('postsHeader');
  header.classList.add('h3');
  postContainer.appendChild(header);

  const postList = document.createElement('ul');
  postList.classList.add('list-group');

  const postsListItems = sortBy(posts, 'pubDate')
    .reverse()
    .map(renderPost);

  postList.append(...postsListItems);
  postContainer.append(postList);
};
