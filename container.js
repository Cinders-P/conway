const Container = React.createClass({
	displayName: 'Container',

	render() {
		return React.createElement(
			'div',
			null,
			React.createElement(BoardComponent, null)
		);
	}
});

ReactDOM.render(React.createElement(Container, null), document.getElementById('game'));