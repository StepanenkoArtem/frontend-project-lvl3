import renderPosts from '../view/posts';
import renderChannels from '../view/channels';
import renderHeader from '../view/header.js';

export default (path, current) => {
  switch (path) {
    case 'error':
    case 'status': {
      renderHeader(path, current);
      break;
    }
    case 'rss.feeds': {
      renderChannels(current);
      break;
    }
    case 'rss.posts': {
      renderPosts(current);
      break;
    }
      default:
  }
};
