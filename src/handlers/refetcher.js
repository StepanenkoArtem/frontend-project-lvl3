import download from './downloader';
import parse from './parser';
import save from './saver';

export default (state) => {
  const { urls } = state;
  urls.forEach((url) => {
    download(url)
      .then(parse)
      .then((contents) => save(contents, state));
  });
};
