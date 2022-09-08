const getFeedByUrl = (url, feeds) => feeds.find((feed) => feed.url === url);
const getPostsForFeed = (id, posts) => posts.filter((post) => post.feedId === id);
const getUrls = (state) => state.rss.feeds.map(({ url }) => url);

export { getFeedByUrl, getPostsForFeed, getUrls };
