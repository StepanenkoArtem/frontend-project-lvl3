import "./initializers";
import submit from "./handlers/submitHandler";
import onChange from "on-change";
import render from "./render";
import { initState } from "./initializers";

export default () => {
  const state = onChange(initState, render);

  const form = document.querySelector("form");
  form.addEventListener("submit", (e) => submit(e, form, state));
};
