angular.module('mobileAngular').factory("transitionEndEvent", function (){
	var t;
	var el = document.createElement('fakeelement');
	var result;
	var transEndEventNames = {
		'WebkitTransition' : 'webkitTransitionEnd',
		'MozTransition'    : 'transitionend',
		'OTransition'      : 'oTransitionEnd',
		'msTransition'     : 'MSTransitionEnd',
		'transition'       : 'transitionend'
	};
	for(t in transEndEventNames){
		if( el.style[t] !== undefined ){
			result = transEndEventNames[t];
		}
	}

	el = null;
	return result;
});