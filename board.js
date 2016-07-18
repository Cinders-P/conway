let timeout = '';

const BoardComponent = React.createClass({
	displayName: 'BoardComponent',

	compute() {
		timeout = '';
		const nextTileStates = [];

		for (let i = 0; i < this.state.dimension; i++) {
			nextTileStates[i] = [];
			for (let x = 0; x < this.state.dimension; x++) {
				nextTileStates[i][x] = this.determineNext(i, x, this.state.tileStates[i][x]);
			}
		}

		this.setState({
			generation: this.state.generation + 1,
			tileStates: nextTileStates
		});
	},
	changeState(row, col) {
		const changeTiles = this.state.tileStates;
		if (this.state.tileStates[row][col] === 0) changeTiles[row][col] = 1;else changeTiles[row][col] = 0;
		this.setState({
			tileStates: changeTiles
		});
	},
	clearBoard() {
		const resetStates = [];
		for (let i = 0; i < this.state.dimension; i++) {
			resetStates[i] = [];
			for (let x = 0; x < this.state.dimension; x++) {
				resetStates[i][x] = 0;
			}
		}
		this.setState({
			paused: true,
			tileStates: resetStates,
			generation: 0
		});
	},
	determineNext(i, x, currentState) {
		let neighbors = 0; // this is a top -> bottom, left -> right grid
		if (i - 1 >= 0 && x - 1 >= 0 && this.state.tileStates[i - 1][x - 1] > 0) // check top-left
			neighbors++;
		if (x - 1 >= 0 && this.state.tileStates[i][x - 1] > 0) // check middle-left
			neighbors++;
		if (i + 1 < this.state.dimension && x - 1 >= 0 && this.state.tileStates[i + 1][x - 1] > 0) // check bottom-left
			neighbors++;

		if (i - 1 >= 0 && this.state.tileStates[i - 1][x] > 0) // check top-middle
			neighbors++;
		if (i + 1 < this.state.dimension && this.state.tileStates[i + 1][x] > 0) // check bottom-middle
			neighbors++;

		if (i - 1 >= 0 && x + 1 < this.state.dimension && this.state.tileStates[i - 1][x + 1] > 0) // check top-right
			neighbors++;
		if (x + 1 < this.state.dimension && this.state.tileStates[i][x + 1] > 0) // check middle-right
			neighbors++;
		if (i + 1 < this.state.dimension && x + 1 < this.state.dimension && this.state.tileStates[i + 1][x + 1] > 0) // check bottom-right
			neighbors++;

		if (currentState === 0) {
			if (neighbors === 3) return 2;else return 0;
		} else {
			if (neighbors < 2) return 0;else if (neighbors > 3) return 0;else return 1;
		}
	},
	playGame() {
		console.log('playing game');
		this.setState({
			paused: false
		});
		this.compute();
	},
	resetGame() {
		const resetStates = [];
		for (let i = 0; i < this.state.dimension; i++) {
			resetStates[i] = [];
			for (let x = 0; x < this.state.dimension; x++) {
				resetStates[i][x] = Math.floor(Math.random() * 2);
			}
		}
		this.setState({
			paused: true,
			tileStates: resetStates,
			generation: 0
		});
	},
	pauseGame() {
		console.log('pausing game');
		this.setState({
			paused: true
		});
	},
	speedUp() {
		console.log(this.state.speed);
		this.setState({
			speed: this.state.speed - 20
		});
		console.log(this.state.speed);
	},
	speedDown() {
		this.setState({
			speed: this.state.speed + 50
		});
	},
	getInitialState() {
		const DIMENSION = 80;

		const tileStates = [];
		for (let i = 0; i < DIMENSION; i++) {
			tileStates[i] = [];
			for (let x = 0; x < DIMENSION; x++) {
				tileStates[i][x] = Math.floor(Math.random() * 2);
			}
		}
		return {
			dimension: DIMENSION,
			tileStates,
			nextTileStates: [],
			speed: 100,
			generation: 0,
			paused: false
		};
	},
	render() {
		if (timeout === '') {
			timeout = setTimeout(() => {
				if (!this.state.paused) {
					this.compute();
				}
			}, this.state.speed);
		}

		const y = [];
		for (let i = 0; i < this.state.dimension; i++) {
			const x = [];
			for (let d = 0; d < this.state.dimension; d++) {
				x[d] = React.createElement(TileComponent, { changeState: this.changeState, index: [i, d], tileState: this.state.tileStates[i][d] });
			}
			y[i] = React.createElement(
				'div',
				{ className: 'row' },
				x
			);
		}
		return React.createElement(
			'div',
			null,
			y,
			React.createElement(ControlsComponent, { clear: this.clearBoard, isPaused: this.state.paused, pause: this.pauseGame, play: this.playGame, reset: this.resetGame, faster: this.speedUp, slower: this.speedDown, gen: this.state.generation })
		);
	}
});