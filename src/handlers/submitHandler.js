import validateUrl from "../validations/url";
import download from "../download";
import parse from "../parser";
import { ERRORS, STATUS } from "../constants";

const storeFeed = (feed, feeds) => {
  const { id, title, description, posts } = feed;

  feeds.channels.push({ id, title, description });
  feeds.posts.push(...posts);
};

export default (e, form, state) => {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(form));

  const { feeds } = state;
  validateUrl(formData)
    .then(({ url }) => {
      if (state.urls.includes(url)) throw new Error(ERRORS.URL_NOT_UNIQ);
      state.currentUrl = url;
      return url;
    })
    .then((url) => {
      state.status = STATUS.DOWNLOADING;
      return download(url);
    })
    .then((content) => {
      state.status = STATUS.PARSING;
      return parse(content);
    })
    .then((feed) => {
      storeFeed(feed, feeds);
      state.status = STATUS.SUCCESS;
      state.urls.push(state.currentUrl);
      state.currentUrl = null;
      state.status = STATUS.PENDING;
    })
    .catch((e) => {
      state.error = e;
      state.status = STATUS.FAILED;
    });
};
