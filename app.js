// Set constraints for the video stream
var constraints = { video: { facingMode: "environment" }, audio: false };
var id;
var dx = 5;
var dy = 5;
// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraSensor = document.querySelector("#camera--sensor"),
    mapPointer = document.getElementById("map-pointer")
	text2 = document.getElementById("text")
// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
    })
    .catch(function(error) {
        console.error("Oops. Something is broken.", error);
    });
}

function updatePosition() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition, error);
	}
	id = setTimeout(updatePosition, 10);
}

function error(err) {
	text2.innerHTML = `ERREUR (${err.code}): ${err.message}`;
}

function showPosition(position) {
    //text2.innerHTML = "show" + window.innerWidth;

    const pointerHeight = 5;
    var a = 0;
    dx -= 0.01;
    dy-= 0.01;
    //var dx = 5;
    //var dy = 5;
    var d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dx, 2)) * 0.05;
    var A = Math.atan2(dy, dx);
    //text2.innerHTML = pointerHeight / d;

    mapPointer.style.left = (Math.cos(a * Math.PI / 180 + A) * window.innerWidth / 2 + window.innerWidth / 2 - mapPointer.offsetWidth / 2).toString() + "px";
    mapPointer.height = (pointerHeight / d).toString();
    mapPointer.width = (pointerHeight / d).toString();

    mapPointer.style.display = Math.cos(a * Math.PI / 180 - A) > 0 ? "block" : "none";
    //mapPointer.style.left = (window.innerWidth / 2).toString() + "px";
    //mapPointer.style.left = Math.sin(a * Math.PI / 180) * dx + Math.cos(a * Math.PI / 180) * dy;
    //mapPointer.style.top
    //text2.innerHTML = position.coords.latitude;
    //mapPointer
	//mapPointer.style.left = position.coords.latitude*5+"px";
	//mapPointer.style.top = position.coords.longitude*5+"px";
}

function getAccel() {
    text2.innerHTML = "test";
    DeviceMotionEvent.requestPermission().then(response => {
        text2.innerHTML = response;
        if (response == 'granted') {
            // Add a listener to get smartphone acceleration 
            // in the XYZ axes (units in m/s^2)
            window.addEventListener('devicemotion', (event) => {
                //text2.innerHTML = event.alpha;
            });
            // Add a listener to get smartphone orientation 
            // in the alpha-beta-gamma axes (units in degrees)
            window.addEventListener('deviceorientation', (event) => {
                console.log(event);
            });
        }
    });
}

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);
