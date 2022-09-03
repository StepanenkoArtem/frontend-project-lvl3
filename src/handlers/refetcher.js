import download from './downloader';
import parse from './parser';
import save from './saver';

export default (state) => {
  const { urls } = state;
  const pendingUrls = [];
  urls.forEach((url) => {
    console.log(pendingUrls);
    download(url)
      .then(parse)
      .then((contents) => save(contents, state));
  });
};
