export function UID() {
  return Math.floor((Math.random() * 100000)).toString();
};

export function refreshElement(elementID) {
  const element = document.getElementById(elementID);
  element.replaceWith(element.cloneNode(true));
  return document.getElementById(elementID);
}