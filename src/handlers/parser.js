import { nanoid } from "nanoid";
import { ERRORS, STATUS } from "../constants";
import { state } from "../init";

const parser = new DOMParser();

export default (data) => {
  state.status = STATUS.PARSING;

  try {
    const xmlDoc = parser.parseFromString(data, "application/xml");
    const channel = xmlDoc.querySelector("channel");
    const channelId = nanoid(8);

    const feedPosts = Array.from(channel.childNodes)
      .filter((child) => child.nodeName === "item")
      .map((post) => {
        return {
          channelId,
          id: nanoid(8),
          title: post.querySelector("title").firstChild.nodeValue,
          description: post.querySelector("description").firstChild.nodeValue,
          link: post.querySelector("link").firstChild.nodeValue,
          pubDate: post.querySelector("pubDate").firstChild.nodeValue,
        };
      });

    const feedInfo = {
      id: channelId,
      description: channel.querySelector("description").firstChild.nodeValue,
      title: channel.querySelector("title").firstChild.nodeValue,
    };

    return { feedInfo, feedPosts };
  } catch {
    throw new Error(ERRORS.INVALID_RSS);
  }
};
