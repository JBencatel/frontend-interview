let players = {
	1: {
		icon: 'X',
		score: 0,
		display: {
			score: null,
			turn: null,
			victoriesPercentage: null,
		},
	},
	2: {
		icon: 'O',
		score: 0,
		display: {
			score: null,
			turn: null,
			victoriesPercentage: null,
		},
	},
};

let matchFirstPlayer = 1;
let currentPlayer = 1;
let matchStates = [null, null, null, null, null, null, null, null, null];

let matchTime = {
	value: 0,
	display: null,
};

let gameTime = {
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

let gameAreaDisplay;
let statsAreaDisplay;

/**
 * After the page loads, registers all UI elements to the game logic.
 */
window.onload = () => {
	players[1].display = {
		score: document.querySelector('#player-1-score .victories'),
		victoriesPercentage: document.querySelector('#player-1-victories .value'),
	};

	players[2].display = {
		score: document.querySelector('#player-2-score .victories'),
		victoriesPercentage: document.querySelector('#player-2-victories .value'),
	};

	matchTime.display = document.querySelector('#timer h2');
	gameTime.display = document.querySelector('#total-time p');

	gameAreaDisplay = {
		gameStart: {
			wholeDisplay: document.querySelector('#game-start'),
			buttons: document.querySelectorAll('#game-start .marker'),
		},

		gameArea: document.querySelector('#grid-container'),

		cells: document.querySelectorAll('.cell'),

		matchOver: {
			display: document.querySelector('#game-over'),
			message: document.querySelector('#game-over #game-result'),
			button: document.querySelector('#game-over #start-over-btn'),
		},
	};

	statsAreaDisplay = {
		matches: document.querySelectorAll('.game-match'),

		winners: document.querySelectorAll('.winner'),
	};

	gameAreaDisplay.gameStart.buttons.forEach((marker) => marker.addEventListener('click', handleGameStart));
	gameAreaDisplay.matchOver.button.addEventListener('click', handleStartOver);
	gameAreaDisplay.cells.forEach((cell) => cell.addEventListener('click', handleCellClick));
};

/**
 * Handle the game start.
 *
 * @param {*} markerClickEvent
 */
function handleGameStart(markerClickEvent) {
	const clickedMarker = markerClickEvent.target;
	const clickedMarkerIcon = clickedMarker.getAttribute('data-marker');
	setPlayersIcons(clickedMarkerIcon);

	gameAreaDisplay.gameStart.wholeDisplay.classList.add('on-going-game');
	gameAreaDisplay.gameArea.classList.add('on-going-game');

	matchFirstPlayer = 1;
	handleMatchStart();
}

/**
 * Set both players game marker icons.
 *
 * @param String player1Marker
 */
function setPlayersIcons(player1Marker) {
	players[1].icon = player1Marker;
	addPlayerMarkerElement(1, player1Marker);

	players[2].icon = player1Marker === 'X' ? 'O' : 'X';
	addPlayerMarkerElement(2, players[2].icon);
}

/**
 * Adds the player turn marker to the view.
 *
 * @param Number playerID
 * @param String marker
 */
function addPlayerMarkerElement(playerID, marker) {
	let playerMarkerElement = createPlayerMarkerElement(playerID, marker);
	document.getElementById(`player-${playerID}-score`).appendChild(addPlayerMarkerElement);
	players[playerID].display.turn = document.querySelector(`#player-${playerID}-turn-marker`);
}

/**
 * Creates a player turn marker element.
 * @param Number playerID
 * @param String marker
 * @returns a new html element.
 */
export function createPlayerMarkerElement(playerID, marker) {
	var elem = document.createElement('img');
	elem.setAttribute('src', `images/${marker}_dark.svg`);
	elem.setAttribute('class', 'turn');
	elem.setAttribute('alt', marker + ' marker');
	elem.setAttribute('id', `player-${playerID}-turn-marker`);
	return elem;
}

/**
 * Handles the initialization of a new match or game.
 */
function handleStartOver() {
	gameAreaDisplay.matchOver.display.classList.remove('active');
	matchTime.value = 0;
	matchTime.display.innerHTML = '00:00:00';

	if (hasGameEnded()) {
		resetGame();
	} else {
		matchFirstPlayer = matchFirstPlayer === 1 ? 2 : 1;
		handleMatchStart();
	}
}

/**
 * Handles the matches start.
 */
function handleMatchStart() {
	matchStates = [null, null, null, null, null, null, null, null, null];
	gameAreaDisplay.cells.forEach((cell) => {
		cell.innerHTML = '';
		cell.classList.remove('disabled');
	});

	currentPlayer = matchFirstPlayer;
	players[currentPlayer].display.turn.classList.add('active');

	setTimer();
}

/**
 * Resets the game
 */
function resetGame() {
	resetStatsAreaValues();
	resetGameAreaValues();
}

/**
 * Resets all necessary game area variables and displays to start a new game.
 */
function resetGameAreaValues() {
	resetPlayerValues(1);
	resetPlayerValues(2);

	gameAreaDisplay.gameStart.wholeDisplay.classList.remove('on-going-game');
	gameAreaDisplay.gameArea.classList.remove('on-going-game');
}

/**
 * Resets the local value and display of a given player's total score.
 * @param Object player
 */
function resetPlayerValues(playerID) {
	let player = players[playerID];
	player.score = 0;
	player.icon = null;
	player.display.score.innerHTML = 0;

	var element = document.getElementById(`player-${playerID}-turn-marker`);
	element.parentNode.removeChild(element);

	updatePlayerGameVictoriesStats(player, 0);
}

/**
 * Resets all local and display values regarding the stats section.
 */
function resetStatsAreaValues() {
	playedMatches = 0;
	for (let match of statsAreaDisplay.matches) {
		match.classList.remove('active');
	}
	for (let winner of statsAreaDisplay.winners) {
		winner.innerHTML = '';
	}

	gameTime.value = 0;
	gameTime.display.innerHTML = '00:00:00';
}

let interval;

/**
 * Sets the timer for the ongoing match.
 */
function setTimer() {
	interval = setInterval(setTime, 1000);

	function setTime() {
		++matchTime.value;
		matchTime.display.innerHTML = parseTime(matchTime.value);
	}
}

/**
 * Parses a given amount of time in seconds into a readable time string.
 *
 * @param Number time (in seconds)
 * @returns the time converted in hours:minutes:seconds.
 */
export function parseTime(time) {
	let hours = padTimeUnit(Math.floor(time / 3600));
	let remainder = time % 3600;
	let minutes = padTimeUnit(Math.floor(remainder / 60));
	remainder %= 60;
	let seconds = padTimeUnit(remainder);

	return hours + ':' + minutes + ':' + seconds;
}

/**
 * Adds a 0 to the left of a given single digit number.
 *
 * @param Number val - number to adapt.
 * @returns a 2 digit number.
 */
export function padTimeUnit(val) {
	var valString = val + '';
	return valString.length < 2 ? '0' + valString : valString;
}

/**
 * Handles the game area cell click event.
 * Checks if the cell clicked is a valid play.
 *
 * @param {*} clickedCellEvent
 */
function handleCellClick(clickedCellEvent) {
	const clickedCell = clickedCellEvent.target;
	const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

	if (matchStates[clickedCellIndex] === null) {
		handleCellPlayed(clickedCell, clickedCellIndex);
	}
}

/**
 * Updates the played cell state and display.
 *
 * @param Object cell
 * @param Number index
 */
function handleCellPlayed(cell, index) {
	matchStates[index] = currentPlayer;
	let playerIcon = players[currentPlayer].icon + '_dark';
	cell.innerHTML = `<img src="images/${playerIcon}.svg" alt="x icon" />`;
	cell.classList.add('disabled');

	validateTurnResult();
}

/**
 * Tests the result of the current match.
 *
 * @returns upon game end or player change.
 */
function validateTurnResult() {
	for (const winCondition of winningConditions) {
		let a = matchStates[winCondition[0]];
		let b = matchStates[winCondition[1]];
		let c = matchStates[winCondition[2]];

		if (a === null || b === null || c === null) {
			continue;
		}
		if (a === b && b === c) {
			handleMatchWin(winCondition);
			return;
		}
	}

	let roundDraw = !matchStates.includes(null);
	if (roundDraw) {
		handleMatchEnd('Match ended in a draw!');
		return;
	}

	toggleActivePlayer();
}

/**
 * Updates all necessary variables and display upon match win.
 *
 * @param {*} winCondition
 */
function handleMatchWin(winCondition) {
	updatePlayedMatches();
	updateScores();
	updateGameTime();

	highlightVictoryLines(winCondition);
	handleMatchEnd(`Player ${currentPlayer} has won!`);

	if (hasGameEnded()) {
		scrollToStatsSection();
	}
}

/**
 * Updates the played matches and game history value and displays.
 */
function updatePlayedMatches() {
	statsAreaDisplay.matches[playedMatches].classList.add('active');
	statsAreaDisplay.winners[playedMatches].innerHTML = 'P' + currentPlayer;
	++playedMatches;
}

/**
 * Updates the players score in the game and stats area
 */
function updateScores() {
	updateMatchWinnerScore();

	let playerOneVictoriesPercentage = Math.round((players[1].score * 100) / playedMatches);
	let playerTwoVictoriesPercentage = 100 - playerOneVictoriesPercentage;

	updatePlayerGameVictoriesStats(players[1], playerOneVictoriesPercentage);
	updatePlayerGameVictoriesStats(players[2], playerTwoVictoriesPercentage);
}

/**
 * Adds a point to the current match winner score.
 */
function updateMatchWinnerScore() {
	++players[currentPlayer].score;
	players[currentPlayer].display.score.innerHTML = players[currentPlayer].score;
}

/**
 * Updates a given player' game victories stats display.
 *
 * @param Object player
 * @param Number victoriesPercentage
 */
function updatePlayerGameVictoriesStats(player, victoriesPercentage) {
	player.display.victoriesPercentage.innerHTML = victoriesPercentage + '%';

	let newClass = '';
	if (playedMatches > 0) {
		if (victoriesPercentage == 50) {
			newClass = 'draw';
		} else if (victoriesPercentage > 50) {
			newClass = 'winning';
		} else if (victoriesPercentage < 50) {
			newClass = 'losing';
		}
	}

	player.display.victoriesPercentage.classList.remove('winning', 'losing', 'draw');
	if (newClass !== '') {
		player.display.victoriesPercentage.classList.add(newClass);
	}
}

/**
 * Adds the current match time to the total game time.
 */
function updateGameTime() {
	gameTime.value += matchTime.value;
	gameTime.display.innerHTML = parseTime(gameTime.value);
}

/**
 * Highlights the board markers corresponding to the winning combination.
 * @param Array winCondition - indexes of the winning condition cells.
 */
function highlightVictoryLines(winCondition) {
	for (const index of winCondition) {
		let playerIcon = players[currentPlayer].icon + '_bright';
		gameAreaDisplay.cells[index].innerHTML = `<img src="images/${playerIcon}.svg" alt="x icon" />`;
	}
}

/**
 * Handles the current match end.
 *
 * @param String message to show the users regarding the match result.
 */
function handleMatchEnd(message) {
	clearInterval(interval);

	gameAreaDisplay.matchOver.message.innerHTML = message;
	gameAreaDisplay.matchOver.display.classList.add('active');

	players[currentPlayer].display.turn.classList.remove('active');
}

/**
 * Changes the current active player.
 */
function toggleActivePlayer() {
	let nextPlayer = currentPlayer === 1 ? 2 : 1;

	players[nextPlayer].display.turn.classList.add('active');
	players[currentPlayer].display.turn.classList.remove('active');

	currentPlayer = nextPlayer;
}

/**
 * Checks if the game has ended.
 *
 * @returns true if the game ended, false otherwise.
 */
function hasGameEnded() {
	return players[1].score === 5 || players[2].score === 5;
}

/**
 * Sends the user to the stats section of the view.
 */
function scrollToStatsSection() {
	var statsSection = document.getElementById('stats-section');
	statsSection.scrollIntoView();
}
