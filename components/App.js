import { useState, addAfterRender, render } from "../core/react.js";
import Container from "./Container.js";

export default function App() {

  // const [count, setCount] = useState(2);
  // const changeBtnID = "changeBtn";

  function afterRender() {
    // const changeBtn = document.getElementById(changeBtnID);
    // changeBtn.addEventListener("click", () => {
    //   setCount(Math.floor(Math.random() * 10));
    // });
  };

  addAfterRender(afterRender);

  return `
  <div id="${App.name}">
    ${render(Container)}
    ${render(Container)}
  </div>`;

  // return `
  // <div id="${App.name}">
  //   ${render(Container)}
  //   <div>
  //     ${count.value}
  //     <button id="${changeBtnID}"> Change </button>
  //   </div>
  // </div>`;
};