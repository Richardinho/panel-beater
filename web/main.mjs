import { panelBeater } from './panel-beater.mjs';

window.addEventListener('load', function () {
	panelBeater({

		panelSelector : '.panel',

		initialPanelId : 'alpha',

		transitionSpeed : 0.4,

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

	});

//  Other configuration is done within the html code itself
});

// todo: configure to allow panelbeater to be called as a function or as a constructor to allow object oriented
// style too.
