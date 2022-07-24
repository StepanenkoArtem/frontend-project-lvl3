import _ from "lodash";

export const forTest = () => {
  return 0;
};

const component = () => {
  const element = document.createElement("div");
  element.innerHTML = _.join(["Hello ", "Webpack"]);
  return element;
};

document.body.appendChild(component());
