import submit from "./handlers/submitHandler";
import onChange from "on-change";
import render from "./handlers/render";
import refetch from "./handlers/refetcher";
import { initState } from "./initializers/state";
import { DELAY } from "./constants";
import modalWindow from "./templates/modal.html";

export const state = onChange(initState, render);

const refreshFeeds = () => {
  refetch();
  setTimeout(refreshFeeds, DELAY);
};

export default () => {
  const form = document.querySelector("form");
  form.addEventListener("submit", (e) => submit(e, form));
  refreshFeeds();
  const modalElement = document.createElement('div');
  modalElement.innerHTML = modalWindow;

  document.body.appendChild(modalElement);
};
