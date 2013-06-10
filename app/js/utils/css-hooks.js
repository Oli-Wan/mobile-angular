(function($) {
	if ( !$.cssHooks ) {
		throw("jQuery 1.4.3+ is needed for this plugin to work");
		return;
	}

	function styleSupport( prop ) {
		var vendorProp, supportedProp,
		capProp = prop.charAt(0).toUpperCase() + prop.slice(1),
		prefixes = [ "Moz", "Webkit", "O", "ms" ],
		div = document.createElement( "div" );
		if ( prop in div.style ) {
			supportedProp = prop;
		} else {
			for ( var i = 0; i < prefixes.length; i++ ) {
				vendorProp = prefixes[i] + capProp;
				if ( vendorProp in div.style ) {
					supportedProp = vendorProp;
					break;
				}
			}
		}
		div = null;
		$.support[ prop ] = supportedProp
		return supportedProp;
	}

	var transform = styleSupport( "transform" );
	
	if ( transform && transform !== "transform" ) {
		$.cssHooks.transform = {
			get: function( elem) {
				return $.css( elem, transform );
			},
			set: function( elem, value) {
				elem.style[ transform ] = value;
			}
		};
	}
})(jQuery);