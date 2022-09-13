import renderPosts from '../view/posts';
import renderChannels from '../view/channels';
import renderHeader from '../view/header';

export default function render(path, current, ui, state) {
  const { rss } = state;

  switch (path) {
    case 'error':
    case 'status': {
      renderHeader(path, current, ui);
      break;
    }
    case 'rss.feeds': {
      renderChannels(rss, ui);
      break;
    }
    case 'visitedPostIds':
    case 'rss.posts': {
      const { visitedPostIds } = state;
      renderPosts(rss, visitedPostIds, ui);
      break;
    }
    default:
  }
}
