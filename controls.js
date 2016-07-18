const ControlsComponent = React.createClass({
	displayName: "ControlsComponent",

	render() {
		let x = '';
		if (!this.props.isPaused) {
			x = React.createElement(
				"button",
				{ onClick: this.props.pause, className: "btn" },
				"Pause"
			);
		} else {
			x = React.createElement(
				"button",
				{ onClick: this.props.play, className: "btn" },
				"Play "
			);
		}
		return React.createElement(
			"div",
			null,
			x,
			React.createElement(
				"button",
				{ onClick: this.props.reset, className: "btn" },
				"Reset"
			),
			React.createElement(
				"button",
				{ onClick: this.props.slower, className: "btn" },
				"Slower"
			),
			React.createElement(
				"button",
				{ onClick: this.props.faster, className: "btn" },
				"Faster"
			),
			React.createElement(
				"span",
				null,
				"Generation: ",
				this.props.gen
			)
		);
	}
});