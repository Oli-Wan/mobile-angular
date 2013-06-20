(function ($) {
    if (!$.cssHooks) {
        throw("jQuery 1.4.3+ is needed for this plugin to work");
        return;
    }

    function styleSupport(prop) {
        var vendorProp, supportedProp,
            capProp = prop.charAt(0).toUpperCase() + prop.slice(1),
            prefixes = [ "Moz", "Webkit", "O", "ms" ],
            div = document.createElement("div");
        if (prop in div.style) {
            supportedProp = prop;
        } else {
            for (var i = 0; i < prefixes.length; i++) {
                vendorProp = prefixes[i] + capProp;
                if (vendorProp in div.style) {
                    supportedProp = vendorProp;
                    break;
                }
            }
        }
        div = null;
        $.support[ prop ] = supportedProp
        return supportedProp;
    }

    function setStyle(impl, spec) {
        if (impl && impl !== spec) {
            $.cssHooks[spec] = {
                get: function (elem) {
                    return $.css(elem, impl);
                },
                set: function (elem, value) {
                    elem.style[ impl ] = value;
                }
            };
        }
    }

    var transform = styleSupport("transform");
    /*var backfaceVisibility = styleSupport("backface-visibility");
    var perspective = styleSupport("perspective");

    setStyle(transform, "transform");
    setStyle(backfaceVisibility, "backface-visibility");
    setStyle(perspective, "perspective");*/
})(jQuery);