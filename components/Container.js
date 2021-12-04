import { useState, addAfterRender } from "../core/react.js";
import { UID } from "../core/util.js";

export default function Container() {

  const [count, setCount] = useState(2);

  const incBtnID = "incrementBtn" + UID();
  const decBtnID = "decrementBtn" + UID();

  function afterRender([count, setCount, incBtnID, decBtnID]) {
    let incBtn = document.getElementById(incBtnID);
    incBtn.replaceWith(incBtn.cloneNode(true)); //Refreshing the node
    incBtn = document.getElementById(incBtnID); //Fetching the node again after refresh
    incBtn.addEventListener("click", () => {
      console.log('+ clicked');
      let tempCount = count.value;
      setCount(++tempCount);
    });

    let decBtn = document.getElementById(decBtnID);
    decBtn.replaceWith(decBtn.cloneNode(true)); //Refreshing the node
    decBtn = document.getElementById(decBtnID); //Fetching the node again after refresh
    decBtn.addEventListener("click", () => {
      let tempCount = count.value;
      console.log('- clicked');
      console.log(tempCount);
      setCount(--tempCount);
    });
  };

  addAfterRender(afterRender, [count, setCount, incBtnID, decBtnID]);

  return `
  <div id="${Container.name}">
    <button id=${decBtnID}> - </button>
     Count: ${count.value}
    <button id=${incBtnID}> + </button>
    </div>
  `;
};
