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
		navigator.geolocation.getCurrentPosition(showPosition, error);
	}
	text2.innerHTML = "show"+Math.random();
	//text2.innerHTML = Math.random();
	id = setTimeout(updatePosition, 10);
}

function error(err) {
	text2.innerHTML = `ERREUR (${err.code}): ${err.message}`;
}

function showPosition(pos) {
	//text2.innerHTML = "show"+Math.random();
	//mapPointer.style.left = position.coords.latitude*5+"px";
	//bmapPointer.style.top = position.coords.longitude*5+"px";
}

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);
window.addEventListener("load", updatePosition, false);

