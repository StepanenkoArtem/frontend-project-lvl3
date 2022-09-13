import renderPosts from '../view/posts';
import renderChannels from '../view/channels';
import renderHeader from '../view/header';
import renderModal from '../view/modal';

const addListeners = (state) => {
  const { visitedPostIds } = state;
  const postElements = document.querySelectorAll('[data-post-id]');

  const handlers = {
    BUTTON: (e) => {
      console.log('click');
      const { postId } = e.target.dataset;
      state.visitedPostIds = [...visitedPostIds, postId];
      state.postInModalWindow = state.rss.posts.find((post) => post.id === postId);
    },
    A: (e) => {
      const { postId } = e.target.dataset;
      state.visitedPostIds = [...visitedPostIds, postId];
    },
  };

  postElements.forEach((postElement) => {
    postElement.addEventListener('click', handlers[postElement.tagName]);
  });
};

export default function render(path, current, ui, state, t) {
  const { rss } = state;

  switch (path) {
    case 'error':
    case 'status': {
      renderHeader(path, current, ui, t);
      break;
    }
    case 'rss.feeds': {
      renderChannels(rss, ui, t);
      break;
    }
    case 'visitedPostIds':
    case 'rss.posts': {
      const { visitedPostIds } = state;
      renderPosts(rss, visitedPostIds, ui, t);
      addListeners(state);
      break;
    }
    case 'postInModalWindow':
      if (!current) {
        return;
      }
      renderModal(current);
      break;
    default:
  }
}
