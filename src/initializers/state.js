import { STATUS } from '../constants';

export default {
  error: null,
  status: STATUS.IDLE,
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
        isVisited: boolean,
        pubDate: Datetime,
        link: string,
      }
    */
    ],
    getPostsForFeed(id) {
      return this.posts.filter((post) => post.feedId === id);
    },
  },
};
