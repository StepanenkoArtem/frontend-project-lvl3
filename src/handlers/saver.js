import { state } from "../init";
import { STATUS } from "../constants";

export default ({ feedInfo, feedPosts }) => {
  state.status = STATUS.SUCCESS;
  const { rss, currentUrl, urls } = state;

  rss.feeds = [...rss.feeds, feedInfo];
  rss.posts = [...rss.posts, ...feedPosts];

  state.urls = [...urls, currentUrl];
  state.status = STATUS.PENDING;
};
