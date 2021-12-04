import { UID } from "./util.js";

// const cachedStates = new Map();
const allComponents = new Array();
let reRenderFlag = false;
let reRenderingComp = undefined;
let reRenderStateCount = 0;
let reRenderComponentIndex = 0;
let afterRenderFunctions = new Array();

export function render(component, props) {
  if (!reRenderFlag) {
    const componentObj = new Object({
      compFunc: component,
      name: component.name + UID(),
      props: props,
      states: new Array(),
    });
    allComponents.push(componentObj);
    let output = component(props);
    output = output.replace(`id="${component.name}"`, `id="${componentObj.name}"`);
    return output;
  };

  if (reRenderFlag) {
    reRenderStateCount = 0;
    reRenderComponentIndex++;
    reRenderingComp = allComponents[reRenderComponentIndex].name;
    const newID = reRenderingComp;
    let output = component(props);
    output = output.replace(`id="${component.name}"`, `id="${newID}"`);
    return output;
  };
};

function reRender(parentComp, props, parentName) {
  reRenderingComp = parentName;
  reRenderFlag = true;
  reRenderComponentIndex = allComponents.findIndex((comp) => comp.name == reRenderingComp);
  let output = parentComp(props);
  output = output.replace(`id="${parentComp.name}"`, `id="${parentName}"`);
  reRenderFlag = false;
  reRenderStateCount = 0;
  reRenderComponentIndex = 0;
  const parentElem = document.getElementById(parentName);
  if (parentElem) parentElem.outerHTML = output;
  useAfterReRender(parentName);
  reRenderingComp = undefined;
};

export function useState(initVal) {

  let stateObj = undefined;

  if (reRenderFlag) {
    // useState called in Re render which means a state was updated.
    stateObj = allComponents[reRenderComponentIndex].states[reRenderStateCount];
    reRenderStateCount++;
  } else {
    stateObj = new Object({
      value: initVal,
      parent: allComponents[allComponents.length - 1].name,
      // uid: UID(),
    });
    allComponents[allComponents.length - 1].states.push(stateObj);

  };
  // cachedStates.set(stateObj.uid, stateObj);

  function setState(newVal) {
    if (stateObj.value === newVal) return; // Value being passed is the same as state value
    if (reRenderFlag && reRenderingComp == stateObj.parent) return; // Re rendering because state is updated and hence cannot execute any setStates called inside the component
    stateObj.value = newVal; // State update
    if (!reRenderFlag && allComponents[allComponents.length - 1]?.name == stateObj.parent) return; // setState is called before component's initial render
    const parent = allComponents.find((comp) => comp.name == stateObj.parent);
    reRender(parent.compFunc, parent.props, parent.name);
  };

  return [stateObj, setState];
};

export function addAfterRender(func, args) {
  if (reRenderFlag) {
    afterRenderFunctions[reRenderComponentIndex] = new Object({ func, args });
  } else {
    afterRenderFunctions.push({ func, args });
  };
};

export function useAfterRender() {
  allComponents.push(null);
  afterRenderFunctions.forEach(({ func, args }) => {
    func(args);
  });
  console.log(allComponents);
};

function useAfterReRender(compName) {
  const compIndex = allComponents.findIndex((comp) => comp.name == compName);
  for (let i = compIndex; allComponents[i] != null; i++) {
    const { func, args } = afterRenderFunctions[i];
    func(args);
  };
  console.log(allComponents);
};

// export function useEffect(callback, stateObj = null) {
//   if (stateObj == null) {
//     callback();
//     return;
//   };

//   if (stateObj.state != cachedStates.get(stateObj.uid)) {
//     callback();
//     cachedStates.set(stateObj.uid, stateObj.state);
//     return;
//   };
// };