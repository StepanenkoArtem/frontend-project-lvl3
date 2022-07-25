import _ from "lodash";
import 'bootstrap';
import './styles/styles.scss';

// Dummy function for test checking. Will be removed later
export const forTest = () => 0;

const component = () => {
  const element = document.createElement("div");
  element.innerHTML = _.join(["Hello", " Webpack"]);
  element.classList.add('container');
  return element;
};

document.body.appendChild(component());
