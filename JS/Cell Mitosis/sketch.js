let cells = [];
let counter = 0;
let w, 
		h, 
		inputDiv, 
		mutationDiv, rangeMutation, labelMutation, mutation,
		intensityDiv, rangeIntensity, labelIntensity, intensity,
		sicknessDiv, rangeSickness, labelSickness, sickness,
		populationDiv, rangePopulation, labelPopulation, population;

function setup() {
	w = windowWidth;
	h = windowHeight;
	createCanvas(w, h);
	frameRate(30);

	rangeMutation = createInput(5, "range");
	rangeMutation.attribute("min", 1);
	rangeMutation.attribute("max", 10);
	labelMutation = createDiv();
	
	mutationDiv = createDiv("Mutation");
	mutationDiv.addClass("slider-container");
	mutationDiv.child(rangeMutation);
	mutationDiv.child(labelMutation);

	rangeIntensity = createInput(17, "range");
	rangeIntensity.attribute("min", 1);
	rangeIntensity.attribute("max", 50);
	labelIntensity = createDiv();
	
	intensityDiv = createDiv("Intensity");
	intensityDiv.addClass("slider-container");
	intensityDiv.child(rangeIntensity);
	intensityDiv.child(labelIntensity);

	rangeSickness = createInput(0, "range");
	rangeSickness.attribute("min", -1);
	rangeSickness.attribute("max", 1);
	rangeSickness.value(0);
	rangeSickness.attribute("step", 0.1);
	labelSickness = createDiv();
	
	sicknessDiv = createDiv("Vitality");
	sicknessDiv.addClass("slider-container");
	sicknessDiv.child(rangeSickness);
	sicknessDiv.child(labelSickness);

	rangePopulation = createInput(null, "range");
	rangePopulation.attribute("min", 100);
	rangePopulation.attribute("max", 500);
	rangePopulation.value(300);
	rangePopulation.attribute("step", 10);
	labelPopulation = createDiv();
	
	populationDiv = createDiv("Population");
	populationDiv.addClass("slider-container");
	populationDiv.child(rangePopulation);
	populationDiv.child(labelPopulation);

	inputDiv = createDiv("Controls");
	inputDiv.position(20, 20);
	inputDiv.addClass("input-container");
	inputDiv.child(mutationDiv);
	inputDiv.child(intensityDiv);
	inputDiv.child(sicknessDiv);
	inputDiv.child(populationDiv);

	for (let i = 0; i < 10; i++) {
		cells.push(new Cell());
	}
}

function draw() {
	background(0);

	mutation = rangeMutation.value();
	labelMutation.html(`1/${mutation}`);

	intensity = rangeIntensity.value();
	labelIntensity.html(intensity);

	sickness = rangeSickness.value();
	labelSickness.html(sickness);

	population = rangePopulation.value();
	labelPopulation.html(population);

	cells.reverse().forEach(cell => {
		cell.show();
		cell.update();
	});

	cells.reverse().forEach((cell, i) => {
		if (cell.is_outside_canvas) {
			cells.splice(i, 1);
		}
		if (cell.should_split) {
			counter++;
			let cellA, cellB;
			if (counter % mutation === 0) {
				let randColor = intensity;
				let randSickness = random(sickness, 1);
				cellA = cell.split(randColor, randSickness);
			} else {
				cellA = cell.split();
			}
			cellB = cell.split();
			if (cells.length < population) {
				cells.push(cellA, cellB);
			}
			cells.splice(i, 1);
		}
	});
}

function windowResized() {
	w = windowWidth;
	h = windowHeight;
  resizeCanvas(w, h);
}