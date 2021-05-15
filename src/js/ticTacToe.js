let players = {
	1: {
		icon: 'x',
		score: 0,
		display: {
			score: null,
			turn: null,
			victories: null,
			losses: null,
		},
	},
	2: {
		icon: 'o',
		score: 0,
		display: {
			score: null,
			turn: null,
			victories: null,
			losses: null,
		},
	},
};

let gameActive = false;
let currentPlayer = 1;
let gameState = [null, null, null, null, null, null, null, null, null];

let currentGameTime = {
	value: 0,
	display: null,
};

let totalGameTime = {
	value: 0,
	display: null,
};

const winningConditions = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

let playedMatches = 0;
let gameHistory = [];

let gameAreaDisplay;
let statsAreaDisplay;

window.onload = () => {
	players[1].display = {
		score: document.querySelector('#player-1-score .victories'),
		turn: document.querySelector('#player-1-score .turn'),
		victories: document.querySelector('#player-1-victories .victory-percentage .value'),
		losses: document.querySelector('#player-1-victories .loss-percentage .value'),
	};

	players[2].display = {
		score: document.querySelector('#player-2-score .victories'),
		turn: document.querySelector('#player-2-score .turn'),
		victories: document.querySelector('#player-2-victories .victory-percentage .value'),
		losses: document.querySelector('#player-2-victories .loss-percentage .value'),
	};

	currentGameTime.display = document.querySelector('#timer h2');
	totalGameTime.display = document.querySelector('#total-time p');

	gameAreaDisplay = {
		startButton: document.querySelector('#start-game-btn'),

		gameArea: document.querySelector('#grid-container'),

		cells: document.querySelectorAll('.cell'),

		gameOver: {
			display: document.querySelector('#game-over'),
			message: document.querySelector('#game-over #game-result'),
			button: document.querySelector('#game-over #start-over-btn'),
		},
	};

	statsAreaDisplay = {
		matches: document.querySelectorAll('.game-match'),

		winners: document.querySelectorAll('.winner'),
	};

	gameAreaDisplay.startButton.addEventListener('click', handleStartGame);

	gameAreaDisplay.gameOver.button.addEventListener('click', handleStartOver);

	gameAreaDisplay.cells.forEach((cell) => cell.addEventListener('click', handleCellClick));
};

function handleStartGame() {
	gameActive = true;
	gameState = [null, null, null, null, null, null, null, null, null];
	gameAreaDisplay.cells.forEach((cell) => (cell.innerHTML = ''));

	gameAreaDisplay.startButton.classList.add('on-going-game');
	gameAreaDisplay.gameArea.classList.add('on-going-game');

	currentPlayer = 1;
	players[currentPlayer].display.turn.classList.add('active');

	setTimer();
}

function handleStartOver() {
	gameAreaDisplay.gameOver.display.classList.remove('active');
	currentGameTime.value = 0;
	currentGameTime.display.innerHTML = '00:00:00';

	handleStartGame();
}

let interval;
function setTimer() {
	interval = setInterval(setTime, 1000);

	function setTime() {
		++currentGameTime.value;
		currentGameTime.display.innerHTML = getParsedTime(currentGameTime.value);
	}
}

function getParsedTime(time) {
	let hours = padTimeUnit(Math.floor(time / 3600));
	let remainder = time % 3600;
	let minutes = padTimeUnit(Math.floor(remainder / 60));
	remainder %= 60;
	let seconds = padTimeUnit(remainder);

	return hours + ':' + minutes + ':' + seconds;
}

function padTimeUnit(val) {
	var valString = val + '';
	if (valString.length < 2) {
		return '0' + valString;
	} else {
		return valString;
	}
}

function handleCellClick(clickedCellEvent) {
	const clickedCell = clickedCellEvent.target;
	const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

	if (gameState[clickedCellIndex] !== null || !gameActive) {
		return;
	}

	handleCellPlayed(clickedCell, clickedCellIndex);
}

function handleCellPlayed(cell, index) {
	gameState[index] = currentPlayer;
	let playerIcon = players[currentPlayer].icon + '_dark';
	cell.innerHTML = `<img src="images/${playerIcon}.svg" alt="x icon" />`;

	handleResultValidation();
}

function handleResultValidation() {
	for (let i = 0; i < 8; i++) {
		const winCondition = winningConditions[i];
		let a = gameState[winCondition[0]];
		let b = gameState[winCondition[1]];
		let c = gameState[winCondition[2]];

		if (a === null || b === null || c === null) {
			continue;
		}
		if (a === b && b === c) {
			handleGameWin(winCondition);
			return;
		}
	}

	let roundDraw = !gameState.includes(null);
	if (roundDraw) {
		handleGameEnd(`Game ended in a draw!`);
		return;
	}

	handlePlayerChange();
}

function handleGameWin(winCondition) {
	updatePlayedMatches();
	updateScores();
	updateTotalGameTime();

	highlightVictoryLines(winCondition);

	handleGameEnd(`Player ${currentPlayer} has won!`);
}

function updatePlayedMatches() {
	statsAreaDisplay.matches[playedMatches].classList.add('active');
	statsAreaDisplay.winners[playedMatches].innerHTML = 'P' + currentPlayer;
	++playedMatches;
}

function updateScores() {
	++players[currentPlayer].score;
	players[currentPlayer].display.score.innerHTML = players[currentPlayer].score;

	let playerOneVictoriesPercentage = Math.round((players[1].score * 100) / playedMatches);
	let playerOneLossesPercentage = 100 - playerOneVictoriesPercentage;

	updatePlayerScores(players[1], playerOneVictoriesPercentage, playerOneLossesPercentage);
	updatePlayerScores(players[2], playerOneLossesPercentage, playerOneVictoriesPercentage);
}

function updatePlayerScores(player, victoriesPercentage, lossesPercentage) {
	player.display.victories.innerHTML = victoriesPercentage + '%';
	player.display.losses.innerHTML = lossesPercentage + '%';

	player.display.victories.classList.remove('winning', 'losing', 'draw');
	player.display.losses.classList.remove('winning', 'losing', 'draw');

	let newClass = 'draw';
	if (victoriesPercentage === lossesPercentage) {
		newClass = 'draw';
	} else if (victoriesPercentage > lossesPercentage) {
		newClass = 'winning';
	} else {
		newClass = 'losing';
	}

	player.display.victories.classList.add(newClass);
	player.display.losses.classList.add(newClass);
}

function updateTotalGameTime() {
	totalGameTime.value += currentGameTime.value;
	totalGameTime.display.innerHTML = getParsedTime(totalGameTime.value);
}

function highlightVictoryLines(winCondition) {
	for (const index of winCondition) {
		let playerIcon = players[currentPlayer].icon + '_bright';
		gameAreaDisplay.cells[index].innerHTML = `<img src="images/${playerIcon}.svg" alt="x icon" />`;
	}
}

function handleGameEnd(message) {
	gameActive = false;
	clearInterval(interval);

	gameAreaDisplay.gameOver.message.innerHTML = message;
	gameAreaDisplay.gameOver.display.classList.add('active');

	players[currentPlayer].display.turn.classList.remove('active');
}

function handlePlayerChange() {
	let nextPlayer = currentPlayer === 1 ? 2 : 1;

	players[nextPlayer].display.turn.classList.add('active');
	players[currentPlayer].display.turn.classList.remove('active');

	currentPlayer = nextPlayer;
}
