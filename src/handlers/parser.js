import { ERRORS } from '../constants';

const parser = new DOMParser();

export default ({ data, url }) => {
  const { contents } = data;
  const xmlDoc = parser.parseFromString(contents, 'text/xml');
  if (!xmlDoc.querySelector('rss')) {
    throw Error(ERRORS.INVALID_RSS);
  }
  const feed = xmlDoc.querySelector('channel');

  const feedPosts = Array.from(feed.childNodes)
    .filter((child) => child.nodeName === 'item')
    .map((post) => ({
      title: post.querySelector('title')?.firstChild?.nodeValue,
      description: post.querySelector('description')?.firstChild?.nodeValue,
      link: post.querySelector('link')?.firstChild?.nodeValue,
      pubDate: post.querySelector('pubDate')?.firstChild?.nodeValue,
      guid: post.querySelector('guid')?.firstChild?.nodeValue,
    }));

  const feedInfo = {
    url,
    description: feed.querySelector('description').firstChild?.nodeValue,
    title: feed.querySelector('title').firstChild?.nodeValue,
  };

  return { feedInfo, feedPosts };
};
