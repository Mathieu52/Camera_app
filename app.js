// Set constraints for the video stream
var constraints = { video: { facingMode: "environment" }, audio: false };
var id;
// Define constants
const cameraView = document.querySelector("#camera--view"),
      cameraSensor = document.querySelector("#camera--sensor"),
      mapPointer = document.getElementById("map-pointer"),
      text2 = document.getElementById("text")
// Access the device camera and stream to cameraView
function cameraStart() {
	navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
		track = stream.getTracks()[0];
		cameraView.srcObject = stream;
	}).catch(function(error) {
		console.error("Oops. Something is broken.", error);
	});
}

function updatePosition() {
	if (navigator.geolocation) {
		//navigator.geolocation.getCurrentPosition(showPosition, error);
	}
	id = setTimeout(updatePosition, 10);
}

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);
