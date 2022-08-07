const feedsContainer = document.querySelector(".feeds");

export default (feeds) => {
  feedsContainer.innerHTML = "";
  feeds.forEach((feed) => {
    const newFeed = document.createElement("div");
    const newFeedTitle = document.createElement("h3");
    const newFeedDescription = document.createElement("h5");
    newFeedTitle.textContent = feed.title;
    newFeedDescription.textContent = feed.description;
    newFeed.append(newFeedTitle, newFeedDescription);
    feedsContainer.append(newFeed);
  });
};
