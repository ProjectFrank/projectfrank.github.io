(function($) {
    function aspectRatio($image, $container) {
	var imageAspect = $image.data('aspect');
	var containerAspect = $container.width() / $container.height();
	return imageAspect > containerAspect;
    }
    
    $(function() {
	var $thumbnailContainers = $('.slider__project__thumbnail');
	var $projects = $('.slider__project');
	var $strip = $('.slider__strip');
	var $images = $thumbnailContainers.find('img');
	$strip.css({
	    'width': 100 * $thumbnailContainers.length + '%'
	});
	$projects.css({
	    'width': 100 / $thumbnailContainers.length + '%'
	});
	$images.each(function(i, image) {
	    var $image = $(image);
	    var style = {};
	    $image.data('aspect', $image.width() / $image.height());
	    if (aspectRatio($image, $thumbnailContainers)) {
		style['width'] = '100%';
		style['height'] = 'auto';
	    } else {
		style['width'] = 'auto';
		style['height'] = '100%';
	    }
	    $image.css(style);
	});

	var numProjects = $thumbnailContainers.length;
	var currentProject = 1;

	$('.slider__control').on('click', function(e) {
	    var $this = $(this);
	    var $right = $('.slider__control--right');
	    var $left = $('.slider__control--left');
	    if ($this.hasClass('slider__control--right')) {
		if (currentProject < numProjects) {
		    currentProject++;
		}
	    } else {
		if (currentProject > 1) {
		    currentProject--;
		}
	    }
	    if (currentProject == numProjects) {
		$right.removeClass('active');
	    } else {
		$right.addClass('active');
	    }
	    if (currentProject == 1) {
		$left.removeClass('active');
	    } else {
		$left.addClass('active');
	    }
	    $strip.css({
		'transform': 'translateX(-' + (currentProject - 1) / numProjects * 100 + '%)'
	    });
	});

	$(window).on('resize orientationchange', function() {
	    $images.each(function(i, image) {
		var $image = $(image);
		if (aspectRatio($image, $thumbnailContainers)) {
		    $image.css({
			'width': '100%',
			'height': 'auto'
		    });
		} else {
		    $image.css({
			'width': 'auto',
			'height': '100%'
		    });
		}
	    });
	});
    });
})(jQuery);
