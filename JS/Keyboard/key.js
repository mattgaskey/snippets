function Key(note, freq) {
	this.note = note;
	this.freq = freq;

	this.osc = new p5.Oscillator();
	this.osc.setType('sawtooth');
	this.osc.freq(freq);
	this.osc.amp(0.5, 0.03);

	this.play = function() {
		this.osc.start();
		console.log('Playing ', this.note);
	}

	this.stop = function() {
		this.osc.stop(0.5);
		console.log('Released ', this.note);
	}
}