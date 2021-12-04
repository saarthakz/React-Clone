import { useState, addAfterRender, useEffect } from "../core/react.js";
import { refreshElement, UID } from "../core/util.js";

export default function Container() {

  const [count, setCount] = useState(0);

  const incBtnID = "incrementBtn" + UID();
  const decBtnID = "decrementBtn" + UID();

  useEffect(() => {
    console.log("Count changed");
  }, count);

  function afterRender([count, setCount, incBtnID, decBtnID]) {
    const incBtn = refreshElement(incBtnID);
    incBtn.addEventListener("click", () => {
      console.log('+ clicked');
      let tempCount = count.value;
      setCount(++tempCount);
    });

    const decBtn = refreshElement(decBtnID);
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
