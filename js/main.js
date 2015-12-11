(function($){

var win = $(window),
	body = $('body');

var Hub = function() {
	this.events = {};
};

Hub.prototype.on = function(evt, cb, el) {
	this.events[evt] = el ? cb.bind(el) : cb;
};

Hub.prototype.off = function(evt) {
	delete this.events[evt];
};

Hub.prototype.trigger = function(evt) {
	this.events[evt]();
};

window.hub = new Hub();

// loading animation
hub.on('loaded', function() {
	var loading = $('#loading');
	loading.fadeOut(function() {
		loading.remove();
	});
});

function setBG(el) {
	if ( el.attr('data-bg') ) {
		el.css('background-image', 'url(' + this.attr('src') + ')');
	}
	el.animate({
		opacity: 1
	});
}

function lazyload() {

	var img;

	if ( this.getAttribute('data-bg') ) {
		img = $('<img>');
		img.attr('src', this.getAttribute('data-bg'));
	} else if ( this.tagName === 'IMG' ) {
		img = $(this);
	}

	if ( img[0].complete ) {
		setBG.call(img, $(this));
	} else {
		img.load(setBG.bind(img, $(this)));
	}
}

$('.lazy-load').each(lazyload);

}(jQuery));
