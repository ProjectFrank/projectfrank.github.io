(function($) {
    $(window).load(function() {
	$('.cascade').stickies();
	window.setTimeout(function() {
	    moveHighlighter();
	}, 500);

	// Add encoded email and phone number links
	var $contactLinks = $('.cascade__content--contact a');
	var $phone = $contactLinks.eq(4);
	var $email = $contactLinks.eq(3);

	var emailString = atob('ZnJhbmsud2FuZ3Rhb0BnbWFpbC5jb20=');
	$email.find('.flippy-card__back p').text(emailString);
	$email.attr('href', 'mailto:' + emailString);

	var phoneString = atob('NjQ3NTg4NTI4OA==');
	$phone.find('.flippy-card__back p').text(phoneString.slice(0, 3) + ' ' + phoneString.slice(3, 6) + ' ' + phoneString.slice(6, 10));
	$phone.attr('href', 'tel:+1' + phoneString);
    });

    smoothScroll.init({
    	speed: 1200,
    	easing: 'easeOutQuad',
    	updateURL: false
    });

    var $window = $(window);
    var $nav = $('nav');
    var $aboutHeader = $('.cascade__header--about');
    var video = document.getElementById('video-background');
    var paused = false;

    $nav.addClass('hide-logo');
    var logoHidden = true;
    var noMove = false;
    $window.on('scroll', $.throttle(200, function() {

	if (!logoHidden) {
	    moveHighlighter();
	}

	// Logo hiding logic
	var aboutBot = $aboutHeader.offset().top + $aboutHeader.outerHeight() - $nav.height();
	var docViewBot = $window.scrollTop() + $window.height();
	if (docViewBot >= aboutBot) {
	    if (logoHidden) {
		$nav.removeClass('hide-logo');
		logoHidden = false;
		// Prevent moveHighlighter logic from executing while CSS
		// animation in progress
		noMove = true;
	    }
	} else {
	    if (!logoHidden) {
		$nav.addClass('hide-logo');
		logoHidden = true;
	    }
	}

	// Video pausing logic
	var aboutTop = $aboutHeader.offset().top;
	var docViewTop = $window.scrollTop();
	if (docViewTop >= aboutTop - $nav.height()) {
	    if (!paused) {
		video.pause();
		paused = true;
	    }
	} else {
	    if (paused) {
		video.play();
		paused = false;
	    }
	}
    }));

    $('nav ul').on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function() {
	moveHighlighter();
	noMove = false;
    });
    
    // Add highlighter
    var $highlighter = $('<div>').addClass('highlighter').css({
	position: 'absolute',
	top: 0,
	left: 0,
	width: 0,
	height: '100%',
	background: '#6D78DA',
	transition: 'transform 0.5s ease-out, width 0.5s linear'
    });
    $nav.prepend($highlighter);

    $highlighter = $('nav .highlighter');

    // jQuery collections for sections
    var $contact = $('#contact').prev();
    var $portfolio = $('#portfolio').prev();
    var $about = $('#about').prev();

    // jQuery collections for respective nav items
    var $navItems = $('ul.nav li');
    var $contactButton = $navItems.eq(2);
    var $portfolioButton = $navItems.eq(1);
    var $aboutButton = $navItems.eq(0);

    var oldLeftOffset = 0;

    function moveHighlighter() {
	if (!noMove) {
	    var docViewBot = $(window).scrollTop() + $(window).height();
	    var highlighterStyle = {};
	    var newLeftOffset = 0;
	    if (docViewBot >= $contact.offset().top + $contact.height() / 3) {
	        highlighterStyle.width = $contactButton.outerWidth();
	        newLeftOffset = $contactButton.offset().left;
	        highlighterStyle.transform = 'translateX(' + newLeftOffset + 'px)';
	    } else if (docViewBot >= $portfolio.offset().top + $portfolio.height() / 3) {
		highlighterStyle.width = $portfolioButton.outerWidth();
		newLeftOffset = $portfolioButton.offset().left;
		highlighterStyle.transform = 'translateX(' + newLeftOffset + 'px)';
	    } else if (docViewBot >= $about.offset().top + $about.height() - $nav.height()) {
		highlighterStyle.width = $aboutButton.outerWidth();
		newLeftOffset = $aboutButton.offset().left;
		highlighterStyle.transform = 'translateX(' + newLeftOffset + 'px)';
	    } else {
		highlighterStyle.width = 0;
		newLeftOffset = 0;
		highlighterStyle.transform = 'translateX(0)';
	    }
	    

	    // Only set new css values if position has changed
	    if (newLeftOffset != oldLeftOffset) {
		oldLeftOffset = newLeftOffset;
		$highlighter.css(highlighterStyle);
	    }
	}
    }

    $window.on('resize orientationChanged', function() {
	moveHighlighter();
    });
})(jQuery);
