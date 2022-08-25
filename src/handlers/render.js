import renderPosts from '../view/posts';
import renderChannels from '../view/channels';
import renderHeader from '../view/header';

export default function render(path, current) {
  const { rss } = this;

  if (/rss\.posts\.\d*\.isVisited/.test(path)) {
    renderPosts(rss);
  }
  switch (path) {
    case 'error':
    case 'status': {
      renderHeader(path, current);
      break;
    }
    case 'rss.feeds': {
      renderChannels(rss);
      break;
    }
    case 'rss.posts': {
      renderPosts(rss);
      break;
    }
    default:
  }
}
