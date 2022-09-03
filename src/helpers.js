const getFeedByUrl = (url, feeds) => feeds.find((feed) => feed.url === url);
const getPostsForFeed = (id, posts) => posts.filter((post) => post.feedId === id);

export { getFeedByUrl, getPostsForFeed };
