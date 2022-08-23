import { state } from "../init";
import download from "../handlers/downloader";
import parse from "../handlers/parser";
import save from "../handlers/saver";

export default () => {
  const { urls } = state;

  urls.forEach((url) => {
    download(url)
      .then(parse)
      .then(save)
  });
};
