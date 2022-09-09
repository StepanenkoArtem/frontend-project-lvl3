import renderPosts from '../view/posts';
import renderChannels from '../view/channels';
import renderHeader from '../view/header';

export default function render(path, current, ui, state) {
  const { rss } = state;

  switch (true) {
    case /rss\.posts\.\d*\.isVisited/.test(path): {
      renderPosts(rss);
      break;
    }
    case /error/.test(path):
    case /status/.test(path): {
      renderHeader(path, current, ui);
      break;
    }
    case /rss\.feeds/.test(path): {
      renderChannels(rss, ui);
      break;
    }
    case /rss\.posts/.test(path): {
      renderPosts(rss, ui);
      break;
    }
    default:
  }
}
