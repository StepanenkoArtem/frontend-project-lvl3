import { sortBy } from "lodash/collection";

const postContainer = document.querySelector(".posts");

export default (posts) => {
  postContainer.innerHTML = "";

  sortBy(posts, "pubDate")
    .reverse()
    .forEach((post) => {
      const newPost = document.createElement("a");
      newPost.setAttribute("href", post.link);
      newPost.classList.add("mb-1", "row");
      newPost.textContent = post.title;
      postContainer.appendChild(newPost);
    });
};
