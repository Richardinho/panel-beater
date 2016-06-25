window.addEventListener('load', function () {

	'use strict';

	var layerManager = new LayerManager();

	toArray(document.querySelectorAll('.panel')).forEach(function (panel) {
		layerManager.addLayer(panel.id, panel);
	});

	layerManager.setCurrentLayer('panel-1');
	layerManager.showCurrentLayer();

	document.body.addEventListener('click', function (event) {
		var target = event.target;
		if(target.tagName.toLowerCase() == 'a'
			&& target.hasAttribute('data-internal')) {
			event.preventDefault();

			layerManager.transitionTo(target.getAttribute('href'));
		}
	});

});

function toArray(nodeList) {
	return Array.prototype.slice.call(nodeList);
}