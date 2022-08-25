import renderPosts from "../view/posts";
import renderChannels from "../view/channels";
import renderHeader from "../view/header.js";
import { state } from "../init";

export default (path, current) => {
  switch (path) {
    case "error":
    case "status": {
      renderHeader(path, current);
      break;
    }
    case "rss.feeds": {
      renderChannels(current);
      break;
    }
    case "rss.posts": {
      renderPosts(current);
      break;
    }
    case "rss.visitedPostIds": {
      renderPosts(state.rss.posts);
      break;
    }
    default:
  }
};
