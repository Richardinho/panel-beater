
+function () {

	'use strict';

	window.panelBeater = function (options) {

		var panels = {};

		var currentPanel;

		var defaults = {

			panelSelector : '.panel',

			overlaySelector : '#overlay',  // if present, a selector for overlay panel

			/*
				panelSelector contains a list of available transitions but you can register your own
			*/
			customTransition : {
				name : 'ltr',
				//  from and to properties can be objects or functions returning an object
				// which will contains confi properties for styles
				from : {
					//  properties to set on element at start
				},
				to : function () {
					//  returns object to set on element at end of transition
				}
			},
			/*
				lifecycle callbacks
			*/
			before : function () {
				//  callback to run before transition
			},

			after : function () {
				//  callback to run after transition has run
			}
		};

		var config = Object.assign({}, defaults, options);

		var overlay = document.querySelector(config.overlaySelector);

		overlay.style.display = 'none';
		overlay.style.position = 'fixed';
		overlay.style.left = 0;
		overlay.style.top = 0;
		overlay.style.bottom = 0;
		overlay.style.right = 0;
		overlay.style.opacity = 0;
		overlay.style.zIndex = 100;

		//  get panels
		Array.from(document.querySelectorAll(config.panelSelector)).forEach(configurePanel);

		function configurePanel(panel) {
			var panelId = panel.id;
			if(panelId === config.initialPanelId) {
				currentPanel = panel;
				panel.style.display = 'block'; // to make panel visible
				panel.style.zIndex = 2;
			}

			panels[panel.id] = panel;
		}

		// set up click handler
		document.body.addEventListener('click', clickHandler);

		function clickHandler(event) {
			var target = event.target;
			if(target.tagName.toLowerCase() === 'a' && target.hasAttribute('data-transition')) {
				event.preventDefault();
				var attributes = target.getAttribute('data-transition').split(/\s/);
				var newPanelId = attributes[0];
				var transitionType = attributes[1];
				transition(newPanelId, transitionType);
			}
		}

		function transition(panelId, transitionType) {

			var windowScroll = window.scrollY;

			var newPanel = panels[panelId];

			document.body.scrollTop = 0;  //  reset scrolling so user always comes to top of panel

			fixBody();  // set body to position fixed so as to 'contain' all the various moving panels

			//  prepare
			transformCurrentPanel(windowScroll);
			transformNewPanel(newPanel);

			//  todo: will need to experiment with different phones to see what works
			var leaveStrategy = {
				from : {
					transform : 'translate(0, 0)'
				},
				to : {
					webkitTransition : '5.4s ease transform',
					transition : '.4s ease transform',
					transform : 'translate(100%, 0)'
				},
				reset : {
					webkitTransition : 'initial',
					transition : 'initial'
				}
			};
			var enterStrategy = {
				from : {
					webkitTransition : 'translate(100%, 0)',
					transform : 'translate(100%, 0)'
				},
				to : {
					webkitTransition : '5.4s ease transform',
					transition : '.4s ease transform',
					transform : 'translate(0, 0)'
				},
				reset : {
					webkitTransition : 'initial',
					transition : 'initial'
				}
			};

			var p1 = transitionPanel(currentPanel, leaveStrategy);

			var p2 = transitionPanel(newPanel, enterStrategy);

			//  after transitions have run do some clean up
			Promise.all([p1, p2]).then(function (panels) {
				var newPanel = panels[1];
				hideOverlay();
				//  removing properties added during transition
				unTransformCurrentPanel();
				unTransformNewPanel(newPanel);
				unFixBody();

				newPanel.style.zIndex = 2;  //  latest panel should sit on top
				currentPanel.style.zIndex = 1;  //  relegate previous panel to below current
				currentPanel = newPanel;
			});

			showOverlay();
		}

		function transitionPanel(panel, strategy){
			return new Promise(function(resolve){
				Object.assign(panel.style, strategy.from);
				document.body.clientHeight;  //  forced reflow
				panel.addEventListener('transitionend', function onTransitionEnd() {
					panel.removeEventListener('transitionend', onTransitionEnd);
					Object.assign(panel.style, strategy.reset);
					resolve(panel);
				});
				panel.addEventListener('webkitTransitionend', function onTransitionEnd() {
					panel.removeEventListener('webkitTransitionend', onTransitionEnd);
					Object.assign(panel.style, strategy.reset);
					resolve(panel);
				});
				Object.assign(panel.style, strategy.to);
			});
		}

		function showOverlay() {
			overlay.style.display = 'block';
		}

		function hideOverlay() {
			overlay.style.display = 'none';
		}
		// todo rename to fixCurrentPanel
		function transformCurrentPanel(scroll) {
			fixPanel(currentPanel);
			currentPanel.firstElementChild.style.top = -scroll + 'px';
		}

		function transformNewPanel(newPanel) {
			newPanel.style.display = 'block';
			fixPanel(currentPanel);
		}

		function unTransformCurrentPanel() {
			currentPanel.style.position = 'static';
			currentPanel.style.display = 'none';
			currentPanel.style.overflow = 'auto';
			currentPanel.firstElementChild.style.top = 0;
		}

		function unTransformNewPanel(newPanel) {
			newPanel.style.position = 'static';
			newPanel.style.overflow = 'auto';
		}

		function fixBody() {
			document.body.style.position = 'fixed';
			document.body.style.overflow = 'hidden';
			document.body.style.left = 0;
			document.body.style.right = 0;
			document.body.style.top = 0;
			document.body.style.bottom = 0;
		}

		function unFixBody() {
			document.body.style.position = 'static';
			document.body.style.overflow = 'auto';
		}

		function fixPanel(panel) {
			panel.style.position = 'absolute';
			panel.style.overflow = 'hidden';
			panel.style.left = 0;
			panel.style.right = 0;
			panel.style.top = 0;
			panel.style.bottom = 0;
		}
	}

}();