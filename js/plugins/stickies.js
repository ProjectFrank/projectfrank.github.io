(function($) {

    function Sticker(element) {
	var $sticky = $(element);
	var $window = $(window);
	var position;

	// Refers to the placeholder div
	var $filler= $sticky.prev();
    	
	// Rerepresents whether or not nav is stuck
	var isStuck = false;

	// Returns true if previous element scrolled out of view
	function atTop() {
	    var docViewBot = $window.scrollTop() + $window.height();
	    return (position <= docViewBot);
	}

	// Stick nav to top of viewport
	function stick() {
	    var left = $sticky.offset().left;
	    sizeFiller();
	    $sticky.css({"margin": 0, "position": "fixed", "bottom": 0, "left": left + "px"});
	    isStuck = true;
	}

	function sizeFiller() {
	    $filler.css({
		"width": "100%",
		"height": $sticky.outerHeight()
	    });
	}

	// Unstick the nav from top of viewport
	function unstick() {
	    $sticky.css({"margin": "", "position": "", "bottom": "", "left": ""});
	    $filler.removeAttr("style");
	    isStuck = false;
	}

	// Polyfill for getComputedStyle(element).cssText in Firefox
	function getComputedStyleCssText(element) {
	    var style = window.getComputedStyle(element);
	    var cssText;
	    
	    cssText = "";
	    for (var i = 0; i < style.length; i++) {
		cssText += style[i] + ": " + style.getPropertyValue(style[i]) + "; ";
	    }
	    
	    return cssText;
	}

	// Stick nav at top of previous element scrolled out of view
	function check() {
	    if (atTop()) {
		if (!isStuck)
		    stick();
	    } else {
		if (isStuck)
		    unstick();
	    }
	}

	// Recalculate point at which nav should be stuck/unstuck.
	function refreshPosition() {
	    var marginTop = parseInt($sticky.css('margin-top'), 10);
	    position = $filler.offset().top + marginTop + $sticky.outerHeight();
	    if (isStuck) {
		sizeFiller();
	    }
	}
	
	refreshPosition();
	
	return {
	    refreshPosition: refreshPosition,
	    check: check
	};
    }

    $.fn.stickies = function() {

	var stickers = this.toArray().map(function(element) {
	    return Sticker(element);
	});
	
	// Recalculate sticking point, then stick if necessary
	$(window).on("resize orientationChanged", function() {
	    stickers.forEach(function(element) {
		element.refreshPosition();
		element.check();
	    });
	});

	// Stick nav if necessary on scroll
	$(window).on("scroll", $.throttle(0, function() {
	    // $.each(stickers, function(i, sticker) {
	    // 	sticker.check();
	    // });

	    for (var i = 0; i < stickers.length; i++) {
		stickers[i].check();
	    }
	    // stickers.forEach(function(sticker) {
	    // 	sticker.check();
	    // });
	}));
	
	return this;
    };    
})(jQuery);
