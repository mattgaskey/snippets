# PRONG!
## A pong-like clone

A p5.js clone of the classic Pong.  I believe I am the first to attempt this. /s

Play me [here](https://codepen.io/mattgaskey/pen/qPMRdK/)

DONE:

* Game steps
	* Start screen
	* Spacebar to launch ball
	* Score shows between points, hides during play
	* Score updates when ball goes past paddle
	* GAME OVER message at 10 points with reset key

* Fluid paddle movement
* 2-Player mode (key presses do not interfere with each other)
* Ball velocity and angle updates according to how well the ball is hit in the center of the paddle
* Calculated paddle hit as a power of ball velocity so hit is in the range of pixels rather than to a fixed point

TODO:

* Paddle speed should update as well?
* Increase difficulty as game continues
	* Add a hit counter?
	* Add a timer?
	* Based on total points?
