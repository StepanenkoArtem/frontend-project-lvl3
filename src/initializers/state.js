import { STATUS } from "../constants";

export const initState = {
  error: null,
  status: STATUS.PENDING,
  urls: [],
  feeds: {
    channels: [
      /*
      {
        id: number,
        url: string,
        title: string,
        description: string
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
      }
    */
    ],
  },
};
