import renderPosts from '../view/posts';
import renderChannels from '../view/channels';
import renderHeader from '../view/header';

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
      break;
    }
    default:
  }
}
