import App from "./components/App.js";
import { render, useAfterRender } from "./core/react.js";

document.getElementById("root").innerHTML = render(App);
// console.log(afterRenderFunctions);
useAfterRender();