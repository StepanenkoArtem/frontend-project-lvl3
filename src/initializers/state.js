import { STATUS } from "../constants";

export const initState = {
  error: null,
  status: STATUS.PENDING,
  urls: [],
  rss: {
    feeds: [
      /*
      {
        id: number,
        url: string,
        title: string,
        description: string,
      } */
    ],
    getFeedByUrl(url) {
      return this.feeds.find((feed) => feed.url === url);
    },

    posts: [
      /*
      {
        id: string,
        feedId: number,
        guid: string,
        title: string,
        description: string,
        read: boolean,
        pubDate: Datetime,
        link: string,
      }
    */
    ],
    visitedPostIds: [],
    getPostsForFeed(id) {
      return this.posts.filter((post) => post.feedId === id);
    },
  },
};
