var hashtagPlot = document.getElementById('hashtag-plot');
var scrubBar = document.getElementById('scrub-bar');
var SOTUvideo = document.getElementById('sotu-video');
var videoOffset = 306;

var transcript = document.getElementById('sotu-transcript');
var timestamps = extractTimestamps();
function extractTimestamps() {
	var timestamps = [];
	var stampedDivs = transcript.querySelectorAll('div');
	for (var i = 0; i < stampedDivs.length; i++) {
		timestamps[i] = parseInt(stampedDivs[i].id.split('-')[2], 10);
	}

	return timestamps;
}

////////////////////////////////////////////////////////////////////////////////
// Handling the hashtagPlot and scrubBar

// Run hashtagMousemove every time the mouse moves above the hashtagPlot
hashtagPlot.addEventListener('mousemove', hashtagMousemove, false);
function hashtagMousemove(e) {
	updateScrubBar(e);
	updateVideo(e);
	updateTranscript(e);
}

hashtagPlot.addEventListener('mouseout', playVideo, false);
function playVideo(e) {
	scrubBar.style.visibility = "hidden";
	SOTUvideo.play();
}

function updateScrubBar(e) {
	// A function to make the scrubBar follow the mouse

	scrubBar.style.visibility = 'visible';
	scrubBar.style.left = e.clientX - position(hashtagPlot).x; // e.clientX is the mouse position

	scrubBar.fractionScrubbed = parseInt(scrubBar.style.left, 10)/hashtagPlot.offsetWidth;
}

function updateVideo(e) {
	SOTUvideo.currentTime = SOTUvideo.duration * scrubBar.fractionScrubbed;
}

////////////////////////////////////////////////////////////////////////////////
// Handling the scrolling transcript

function updateTranscript(e) {
	scrollToTimestamp(nearestStamp(scrubBar.fractionScrubbed));
}

function scrollToTimestamp(timestamp) {
	var target = transcript.querySelector('#transcript-time-' + timestamp);
	document.getElementById('sotu-transcript').scrollTop = target.offsetTop;
}

function nearestStamp(fractionScrubbed) {
	// Figure out what the closest timestamp we have is to the current amount of scrubbing
	var timestampEquivalent = fractionScrubbed * SOTUvideo.duration + videoOffset; // IF we had a timestamp, what would it be?
	for (var i = 0; i < timestamps.length - 1; i++) {
		if ( timestamps[i+1] > timestampEquivalent ) { // Find teh first timestamp our guess is greater than
			return timestamps[i];
		}
	}
	return timestamps[timestamps.length - 1];
}

////////////////////////////////////////////////////////////////////////////////
// Utility functions

function position(element) {
	// A function which takes an element and returns a dictionary with its x and y position
    for (var lx=0, ly=0;
         element !== null;
         lx += element.offsetLeft, ly += element.offsetTop, element = element.offsetParent);

    return {x: lx, y: ly};
}