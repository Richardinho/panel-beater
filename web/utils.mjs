
export function unTransformNewPanel(newPanel) {
  newPanel.style.position = "static";
  newPanel.style.overflow = "auto";
}

/*
 *  reset properties on old panel and set display to none
 */

export function unTransformCurrentPanel(currentPanel) {
  currentPanel.style.position = "static";
  currentPanel.style.display = "none";
  currentPanel.style.overflow = "auto";
  currentPanel.firstElementChild.style.top = 0;
}

export function fixBody() {
  document.body.style.position = "fixed";
  document.body.style.overflow = "hidden";
  document.body.style.left = 0;
  document.body.style.right = 0;
  document.body.style.top = 0;
  document.body.style.bottom = 0;
}

export function unFixBody() {
  document.body.style.position = "static";
  document.body.style.overflow = "auto";
}

export function fixPanel(panel) {
  panel.style.position = "fixed";
  panel.style.overflow = "hidden";
  panel.style.left = 0;
  panel.style.right = 0;
  panel.style.top = 0;
  panel.style.bottom = 0;
}
