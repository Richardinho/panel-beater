function LayerManager() {

	this.layers = {};
	this.overlay = document.getElementById('overlay');

}

LayerManager.prototype = {


	addLayer : function (id, layer) {
		this.layers[id] = layer;
	},

	setCurrentLayer : function (id) {
		this.currentLayerId = id;
	},

	showCurrentLayer : function () {
		this.layers[this.currentLayerId].style.display = 'block';
	},

	showOverlay : function () {
		this.overlay.style.visibility = 'visible';
	},

	hideOverlay : function () {
		this.overlay.style.visibility = 'hidden';
	},

	transitionTo : function (newLayerId) {

		var self = this;

		this.showOverlay();

		var scroll = window.scrollY;

		//  reset scroll to top
		window.scrollTop = 0;

		//  get layers to work with
		var currentLayer = this.layers[this.currentLayerId];

		this.currentLayerId = newLayerId;

		var newLayer = this.layers[newLayerId];

		//  show new layer and make position fixed
		Object.assign(newLayer.style, {
			'display'     : 'block',
			'position'    : 'fixed',
			'transform'   : 'translate(100%, 0)',
			'-webkit-transition'  : '.8s transform ease',
			'transition'  : '.8s transform ease',
			'top'         : 0,
			'left'        : 0,
		});

		// set up initial properties
		Object.assign(currentLayer.style, {

			'transform'   : 'translate(0, 0)',
			'-webkit-transition'  : '.8s transform ease',
			'transition'  : '.8s transform ease',
			'position'    : 'fixed',
			'left'        : 0,
			'top'         : 0,
			'bottom'      : 0,
			'right'       : 0,
			'overflow-y'  : 'scroll',
			'zIndex'      : 1
		});

		document.body.clientHeight;  // reflow

		//  scroll old layer to original position
		currentLayer.scrollTop = scroll;


		var p1 = new Promise(function(resolve, reject) {
			currentLayer.addEventListener('transitionend', function foo () {
				currentLayer.removeEventListener('transitionend', foo);
				resolve(currentLayer);
			});
			currentLayer.addEventListener('webkitTransitionend', function foo () {
        currentLayer.removeEventListener('transitionend', foo);
        resolve(currentLayer);
      });
		});

		var p2 = new Promise(function(resolve, reject) {
	    newLayer.addEventListener('webkitTransitionend', function bar () {
				newLayer.removeEventListener('transitionend', bar);
				resolve(newLayer);
			});
	    newLayer.addEventListener('transitionend', function bar () {
        newLayer.removeEventListener('transitionend', bar);
        resolve(newLayer);
      });
		});

		Promise.all([p1, p2]).then(function (data) {
			currentLayer.scrollTop = 0;
			Object.assign(data[0].style, {
				display : 'none'
			});
			Object.assign(data[1].style, {
				position : 'static'
			});
			document.body.scrollTop = 0;
			self.hideOverlay();
		});

		//  do actual transition

		Object.assign(newLayer.style, {
			'transform' : 'translate(0, 0)'
		});

		Object.assign(currentLayer.style, {
			'transform' : 'translate(-100%, 0)'
		});
	}
};