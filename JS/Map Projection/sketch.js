let mapimg;
let map_src = "https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/";
let clon = 0;
let clat = 0;
let zoom = 1;
let map_w = 1024;
let map_h = 768;

let zoomedIn = false;
let imageLoaded = false;

let quakes;
let quake_src = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/";
let quake_minMag = 2.5;
let quake_period = "month";

let features;


let lon;
let lat;

/* To Add:
	* Color by magnitude
	* Selectors for:
		* magnitude min
		* time period
		* region
	* Click to zoom - working but buggy, setTimeout is a hack, need to use Promise
	* Hover/click for details
*/

function preload() {
	imageLoaded = false;
	mapimg = loadImage(`${map_src}${clon},${clat},${zoom}/${map_w}x${map_h}${map_token}`, imageLoadCallback);
	// mapimg = loadImage("https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/0,0,1/1024x612?access_token=pk.eyJ1IjoibWF0dGdhc2tleSIsImEiOiJjamFqamZyNzgzMGgwMnlwODJpM2hvbGtrIn0.qU-GT-npeiTxRxjMKfdthg");
	quakes = loadJSON(`${quake_src}${quake_minMag}_${quake_period}.geojson`);
	// quakes = loadJSON("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson");
	
}

function setup() {
	createCanvas(map_w, map_h);
	translate(width/2, height/2);
	imageMode(CENTER);
	image(mapimg, 0, 0);

	let cx = mercX(clon);
	let cy = mercY(clat);
	features = features || quakes.features;

	for (let i = 0; i < features.length; i++) {
		lon = features[i].geometry.coordinates[0];
		lat = features[i].geometry.coordinates[1];

		let x = mercX(lon) - cx;
		let y = mercY(lat) - cy;
		let mag = features[i].properties.mag;
		let w = map(mag, quake_minMag, 10, mag, 20);
		let r, g, b;
		r = map(mag, 0, 10, 0, 255);
		g = map(mag, 0, 10, 80, 100);
		b = map(mag, 0, 10, 255, 0);

		
		noStroke();
		fill(r, g, b, 127);
		ellipse(x, y, w * zoom * 0.75);
	}
}

function mercX(lon) {
	lon = radians(lon);
	let a = (256/PI)*pow(2, zoom);
	let b = lon + PI;
	return a * b;
}

function mercY(lat) {
	lat = radians(lat);
	let a = (256/PI)*pow(2, zoom);
	let b = tan(PI/4 + lat/2);
	let c = PI - log(b);
	return a * c;
}

function imageLoadCallback() {
	imageLoaded = true;
}

function mousePressed() {
	if (!zoomedIn) {
		let zoomX = map(mouseX, 0, width, -180, 180);
		let zoomY = map(mouseY, 0, height, 90, -90);
		clon = zoomX.toFixed(4);
		clat = zoomY.toFixed(4);
		zoom = 4;
		preload();
		setTimeout(setup, 500);
		zoomedIn = true;
	} else {
		clon = 0;
		clat = 0;
		zoom = 1;
		preload();
		setTimeout(setup, 500);
		zoomedIn = false;
	}
}