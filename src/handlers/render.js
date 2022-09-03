import renderPosts from '../view/posts';
import renderChannels from '../view/channels';
import renderHeader from '../view/header';

export default function render(path, current) {
  const { rss } = this;

  switch (true) {
    case /rss\.posts\.\d*\.isVisited/.test(path): {
      renderPosts(rss);
      break;
    }
    case /error/.test(path):
    case /status/.test(path): {
      renderHeader(path, current);
      break;
    }
    case /rss\.feeds/.test(path): {
      renderChannels(rss);
      break;
    }
    case /rss\.posts/.test(path): {
      renderPosts(rss);
      break;
    }
    default:
  }
}
