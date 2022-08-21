import "./initializers";
import submit from "./handlers/submitHandler";
import onChange from "on-change";
import render from "./handlers/render";
import { initState } from "./initializers";

export const state = onChange(initState, render);

export default () => {
  const form = document.querySelector("form");
  form.addEventListener("submit", (e) => submit(e, form));
};
