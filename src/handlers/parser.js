import { nanoid } from "nanoid";
import { ERRORS, STATUS } from "../constants";
import { state } from "../init";

const parser = new DOMParser();

export default (data) => {
  state.status = STATUS.PARSING;

  try {
    const xmlDoc = parser.parseFromString(data, "application/xml");
    const channel = xmlDoc.getElementsByTagName("channel")[0];
    const channelId = nanoid(8);

    const feedPosts = Array.from(channel.childNodes)
      .filter((child) => child.nodeName === "item")
      .map((post) => {
        return {
          channelId,
          id: nanoid(8),
          title: post.getElementsByTagName("title")[0].childNodes[0].nodeValue,
          description:
            post.getElementsByTagName("description")[0].childNodes[0].nodeValue,
          link: post.getElementsByTagName("link")[0].childNodes[0].nodeValue,
          pubDate:
            post.getElementsByTagName("pubDate")[0].childNodes[0].nodeValue,
        };
      });

    const feedInfo = {
      id: channelId,
      description:
        channel.getElementsByTagName("description")[0].childNodes[0].nodeValue,
      title: channel.getElementsByTagName("title")[0].childNodes[0].nodeValue,
    };

    return { feedInfo, feedPosts };
  } catch {
    throw new Error(ERRORS.INVALID_RSS);
  }
};
