(function($){

var win = $(window),
	body = $('body');

function fade(el, target, orig) {

    if ( el.style.display === 'none' ) el.style.display = 'block';

    var last = +new Date();
    (function tick() {
        var next = +new Date();
        el.style.opacity = +el.style.opacity + (target > orig ? (next - last) : (last - next)) / 250;
        last = next;

        if ( (target > orig && +el.style.opacity < target) || (target < orig && +el.style.opacity > target) ) {
            requestAnimationFrame(tick);
        }

        // if done fading out, hide it all the way
        if ( target === 0 && +el.style.opacity <= 0 ) el.style.display = 'none';
    })();
}

function setBG(el) {
	if ( el.getAttribute('data-bg') ) {
		el.style.backgroundImage = 'url(' + this.src + ')';
	}
	fade(el, 100, 0);
}

function lazyload() {

	var img;

	if ( this.getAttribute('data-bg') ) {
		img = document.createElement('img');
		img.src = this.getAttribute('data-bg');
	} else if ( this.tagName === 'IMG' ) {
		img = this;
	}

	if ( img.complete ) {
		setBG.call(img, this);
	} else {
		img.onload = setBG.bind(img, this);
	}
}

$('.lazy-load').each(lazyload);

}(jQuery));
