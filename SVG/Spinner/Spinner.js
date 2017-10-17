import React from 'react';

class Spinner extends React.Component {
	contructor(props) {
		super(props);

		const { radius, stroke } = this.props;

		this.circum = radius * 2 * Math.PI;
		this. offsetRadius = radius - stroke * 2;
	}

	render() {
		const { radius, stroke, progress, strokeColor } = this.props;
		const strokeDashoffset = this.circum - progress / 100 * this.circum;

		return (
			<svg 
				height={radius * 2}
				width={radius * 2}
			>
				<circle 
					stroke={strokeColor}
					fill="transparent"
					strokeWidth={stroke}
					strokeDasharray=`${this.circum} ${this.circum}`
					style={{strokeDashoffset}}
					r={this.offsetRadius}
					cx={radius}
					cy={radius}
				/>
			</svg>
		)
	}
}

export default Spinner;