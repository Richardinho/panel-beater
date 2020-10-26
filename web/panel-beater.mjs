import { strategies } from './strategies.mjs';
import {
  fixPanel,
  fixBody,
  unFixBody,
  unTransformCurrentPanel,
  unTransformNewPanel } from './utils.mjs'; 
import { transitionPanel } from './transition-panel.mjs';

const defaults = {
  panelSelector: '.panel',
  overlayId: 'overlay',  // if present, a selector for overlay panel
};

export function panelBeater (options) {

  const panels = {};

  let currentPanel;

  const config = {
    ...defaults,
    ...options,
  };

  //  create overlay if it doesn't exist and configure.
  let overlayEl = document.getElementById(config.overlayId);

  if (!overlayEl) {
    overlayEl = document.createElement('div');
    overlayEl.id = config.overlayId;
    document.body.appendChild(overlayEl);
  }

  overlayEl.style.display = 'none';
  overlayEl.style.position = 'fixed';
  overlayEl.style.left = 0;
  overlayEl.style.top = 0;
  overlayEl.style.bottom = 0;
  overlayEl.style.right = 0;
  overlayEl.style.opacity = 0;
  overlayEl.style.zIndex = 100;


  /*
   * Collect panels out of the DOM.
   * store panels by id. 
   * Find initial panel and set this as the currentPanel
   */

  Array.from(document.querySelectorAll(config.panelSelector)).forEach(configurePanel);

  function configurePanel(panel) {
    const panelId = panel.id;

    if (panelId === config.initialPanelId) {
      currentPanel = panel;
      panel.style.display = 'block'; // to make panel visible
      panel.style.zIndex = 2;
    }

    panels[panel.id] = panel;
  }

  /*
   * attach click handler to all link elements with data-transition attribute
   */

  document.querySelectorAll('[data-transition]').forEach((el) => {
    el.addEventListener('click', clickHandler);
  });

  function clickHandler(event) {
    event.preventDefault();

    const target = event.target;
    const attributes = target.getAttribute('data-transition').split(/\s/);
    const newPanelId = attributes[0];
    const transitionType = attributes[1];

    transition(newPanelId, transitionType);
  }

  function transition(panelId, transitionType) {

    const windowScroll = window.pageYOffset;

    const newPanel = panels[panelId]; //  here is the place to possibly render a new panel with new data from server.

    document
      .body
      .scrollTop = 0;  //  reset scrolling so user always comes to top of panel

    fixBody();  // set body to position fixed so as to 'contain' all the various moving panels

    //  prepare
    fixCurrentPanel(windowScroll);
    fixNewPanel(newPanel);

    //  todo: will need to experiment with different phones to see what works

    const p1 = transitionPanel(currentPanel, strategies.bttexit);

    const p2 = transitionPanel(newPanel, strategies.bttentry);

    //  after transitions have run do some clean up
    Promise.all([p1, p2]).then(function (panels) {
      const newPanel = panels[1];
      hideOverlay();

      //  removing properties added during transition
      unTransformCurrentPanel(currentPanel);
      unTransformNewPanel(newPanel);
      unFixBody();

      newPanel.style.zIndex = 2;  //  latest panel should sit on top
      currentPanel.style.zIndex = 1;  //  relegate previous panel to below current
      currentPanel = newPanel;
    });

    showOverlay();
  }

  function showOverlay() {
    overlay.style.display = 'block';
  }

  function hideOverlay() {
    overlay.style.display = 'none';
  }

  function fixCurrentPanel(scroll) {
    fixPanel(currentPanel);
    currentPanel.firstElementChild.style.top = -scroll + 'px';
  }

  function fixNewPanel(newPanel) {
    newPanel.style.display = 'block';
    fixPanel(currentPanel);
  }
}

