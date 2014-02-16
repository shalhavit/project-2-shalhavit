var hashtagPlot = document.getElementById('hashtag-plot');
var scrubBar = document.getElementById('scrub-bar');

// Run hashtagMousemove every time the mouse moves above the hashtagPlot
hashtagPlot.addEventListener('mousemove', hashtagMousemove, false);
function hashtagMousemove(e) {
	updateScrubBar(e);
}

function updateScrubBar(e) {
	// A function to make the scrubBar follow the mouse

	scrubBar.style.visibility = 'visible';
	scrubBar.style.left = e.clientX - position(hashtagPlot).x; // e.clientX is the mouse position

	scrubBar.fractionScrubbed = parseInt(scrubBar.style.left, 10)/hashtagPlot.offsetWidth;
}

function position(element) {
	// A function which takes an element and returns a dictionary with its x and y position
    for (var lx=0, ly=0;
         element !== null;
         lx += element.offsetLeft, ly += element.offsetTop, element = element.offsetParent);

    return {x: lx, y: ly};
}