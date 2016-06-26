var testFunctions = {

	hasQuerySelector : function () {
		return 'querySelector' in document;
	},

	hasQuerySelectorAll : function () {
		return 'querySelectorAll' in document;
	},

	hasAddEventListener : function () {
		return 'addEventListener' in document;
	},

	hasDataSet : function () {
		var n = document.createElement('div');
		n.setAttribute('data-a-b', 'c');
		return !!(n.dataset && n.dataset.aB === 'c');
	},

	hasClassList : function () {
		return 'classList' in document.body;
	},

	hasPageYOffset : function () {
		return 'pageYOffset' in window;
	},

	hasTransitionCSS : function () {
		return document.body.style['transition'] !== undefined;
	},

	hasScrollTop : function () {
		return 'scrollTop' in document.body;
	},

	hasPromises : function () {
		return 'Promise' in window;
	},

	hasObjectAssign : function () {
		return 'assign' in Object;
	},

	hasArrayFrom : function () {
		return 'from' in Array;
	},

	hasFirstElementChild : function () {
		return 'firstElementChild' in document.body;
	},

	hasVHUnits : function () {
		var el = document.createElement('div');
		document.body.appendChild(el);
		el.style.height = '50vh';
		var windowHeight = parseInt(window.innerHeight / 2, 10);
		var elHeight = parseInt((window.getComputedStyle ? getComputedStyle(el, null) : elem.currentStyle).height, 10);
		return elHeight == windowHeight;
	},

	hasTransformsCSS : function () {
		return document.body.style['transform'] !== undefined;
	},
};

//  tests written in very very vanilla javascript!

var testsListContainer = document.getElementById('tests');
var tests = testsListContainer.getElementsByTagName('li');

for(var i=0; i < tests.length; i++) {

	var test = tests[i];

	var testFunc = testFunctions[test.id];

	var result = testFunc();

	test.className = result ? 'passed' : 'failed';

}

