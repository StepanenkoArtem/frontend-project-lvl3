import onChange from 'on-change';
import submit from './handlers/submitHandler';
import render from './handlers/render';
import refetch from './handlers/refetcher';
import initState from './initializers/state';
import { DELAY } from './constants';
import modalWindow from './templates/modal.html';

export const state = onChange(initState, render);

const refreshFeeds = () => {
  refetch(state);
  setTimeout(refreshFeeds, DELAY);
};

export default () => {
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => submit(e, form, state));
  refreshFeeds();
  const modalElement = document.createElement('div');
  modalElement.innerHTML = modalWindow;

  document.body.appendChild(modalElement);
};
