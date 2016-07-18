const TileComponent = React.createClass({
	displayName: 'TileComponent',

	render() {
		if (this.props.tileState === 0) return React.createElement('div', { className: 'tile' });else if (this.props.tileState === 1) return React.createElement('div', { className: 'tile alive' });else return React.createElement('div', { className: 'tile baby' });
	}
});