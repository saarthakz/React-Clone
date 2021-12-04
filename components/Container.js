import { useState, addAfterRender } from "../core/react.js";

export default function Container() {

  const [count, setCount] = useState(2);

  const incBtnID = "incrementBtn";
  const decBtnID = "decrementBtn";

  function afterRender([count, setCount, incBtnID, decBtnID]) {
    const incBtn = document.getElementById(incBtnID);
    incBtn.addEventListener("click", () => {
      let tempCount = count.value;
      setCount(++tempCount);
    });

    const decBtn = document.getElementById(decBtnID);
    decBtn.addEventListener("click", () => {
      let tempCount = count.value;
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
