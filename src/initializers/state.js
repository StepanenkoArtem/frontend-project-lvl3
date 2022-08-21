import { STATUS } from "../constants";

export const initState = {
  error: null,
  status: STATUS.PENDING,
  currentUrl: null,
  urls: [],
  rss: {
    feeds: [
      /*
      {
        id: number,
        url: string,
        title: string,
        description: string,
        lastBuildUpdate: datetime
      } */
    ],
    posts: [
      /*
      {
        id: number,
        channelId: number,
        title: string,
        description: string,
        read: boolean,
        pubDate: Datetime
      }
    */
    ],
  },
};
