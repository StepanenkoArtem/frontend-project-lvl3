import {i18n} from "../initializers";

const feedsContainer = document.querySelector(".feeds");

export default (feeds) => {

  if (!feeds.length) {
    return;
  }

  feedsContainer.innerHTML = "";

  const header = document.createElement("h3")
  header.textContent = i18n.t('feedsHeader');
  header.classList.add('h3')
  feeds.forEach((feed) => {
    const newFeed = document.createElement("div");
    const newFeedTitle = document.createElement("h5");
    const newFeedDescription = document.createElement("p");
    newFeedTitle.textContent = feed.title;
    newFeedDescription.classList.add('text-muted')
    newFeedDescription.textContent = feed.description;
    newFeed.append(newFeedTitle, newFeedDescription);
    feedsContainer.append(header, newFeed);
  });
};
