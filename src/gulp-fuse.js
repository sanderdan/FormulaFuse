// Observable is defined in gulpfile.js:37
let hello = Observable("Hello");

// A little function
function setWorld() {
	console.log("Ohi!");
	hello.value += " World!";
}

// Exporting variables
export var world = {
	'hello': hello,
	'setWorld': setWorld
}
