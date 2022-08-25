import { state } from "../init";
import { nanoid } from "nanoid";

export default ({ feedInfo, feedPosts }) => {
  const { rss, urls } = state;
  const { url } = feedInfo;
  const feedId = rss.getFeedByUrl(url)?.id || nanoid(6);
  const existedPosts = rss.getPostsForFeed(feedId);

  if (!urls.includes(url)) {
    state.urls = [url, ...urls];
    rss.feeds = [...rss.feeds, { id: feedId, ...feedInfo }];
  }

  const preparedPosts = feedPosts
    .filter(({ guid }) => !existedPosts.map((post) => post.guid).includes(guid))
    .map((post) => ({ feedId, ...post, id: nanoid(6), pubDate: Date.parse(post.pubDate) }))

  rss.posts = [...rss.posts, ...preparedPosts];
};
