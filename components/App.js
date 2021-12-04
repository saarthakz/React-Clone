import { addAfterRender, render } from "../core/react.js";
import Container from "./Container.js";

export default function App() {

  function afterRender() {

  };

  addAfterRender(afterRender);

  return `
  <div id="${App.name}">
    ${render(Container)}
  </div>`;
};