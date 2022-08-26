import i18n from '../initializers/i18n';

const feedsContainer = document.querySelector('.feeds');

export default ({ feeds }) => {
  feedsContainer.innerHTML = '';
  if (!feeds.length) {
    return;
  }

  const header = document.createElement('h3');
  header.textContent = i18n.t('feedsHeader');
  header.classList.add('h3');

  const feedListItems = feeds.map((feed) => {
    const newFeed = document.createElement('div');
    const newFeedTitle = document.createElement('h5');
    const newFeedDescription = document.createElement('p');
    newFeedTitle.textContent = feed.title;
    newFeedDescription.classList.add('text-muted');
    newFeedDescription.textContent = feed.description;
    newFeed.append(newFeedTitle, newFeedDescription);
    return newFeed;
  });
  feedsContainer.append(header, ...feedListItems);
};
