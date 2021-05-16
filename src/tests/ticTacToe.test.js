const ticTacToe = require('../js/ticTacToe');

describe('TicTacToe', () => {
	describe('padTimeUnit function', () => {
		test('returns a string', () => {
			let time = 0;

			let actualResult = ticTacToe.padTimeUnit(time);
			expect(typeof actualResult).toBe('string');
		});

		test('returns a two digit string when given a single digit number', () => {
			let time = 0;

			let actualResult = ticTacToe.padTimeUnit(time);
			expect(actualResult).toBe('00');
			expect(actualResult).not.toBe(0);
		});

		test('returns a two digit string when given a two digit number', () => {
			let time = 20;

			let actualResult = ticTacToe.padTimeUnit(time);
			expect(actualResult).toBe('20');
		});
	});

	describe('parseTime function', () => {
		test('returns a string', () => {
			let time = 1000;

			let actualResult = ticTacToe.parseTime(time);
			expect(typeof actualResult).toBe('string');
		});

		test('returns string with only the seconds different from 00 when given a number below 60', () => {
			let time = 30;

			let actualResult = ticTacToe.parseTime(time);
			expect(actualResult).toBe('00:00:30');
		});

		test('returns string showing 1 minute when given the time of 60 seconds', () => {
			let time = 60;

			let actualResult = ticTacToe.parseTime(time);
			expect(actualResult).toBe('00:01:00');
			expect(actualResult).not.toBe('00:00:60');
		});

		test('returns string showing 1 hour when given the time of 3600 seconds', () => {
			let time = 3600;

			let actualResult = ticTacToe.parseTime(time);
			expect(actualResult).toBe('01:00:00');
			expect(actualResult).not.toBe('00:00:3600');
		});

		test('returns 2 hours, 15 minutes and 33 seconds when given the time of 8133 seconds', () => {
			let time = 8133;

			let actualResult = ticTacToe.parseTime(time);
			expect(actualResult).toBe('02:15:33');
		});
	});

	describe('createPlayerMarkerElement function', () => {
		test('returns an HTML element', () => {
			let playerID = 1;
			let marker = 'X';

			let actualResult = ticTacToe.createPlayerMarkerElement(playerID, marker);
			expect(actualResult instanceof HTMLElement).toBe(true);
		});

		test('returns an Image HTML element', () => {
			let playerID = 1;
			let marker = 'X';

			let actualResult = ticTacToe.createPlayerMarkerElement(playerID, marker);
			expect(actualResult.tagName == 'IMG').toBe(true);
		});

		test('returns an element with the X_dark image as src when given X as the marker', () => {
			let playerID = 1;
			let marker = 'X';

			let actualResult = ticTacToe.createPlayerMarkerElement(playerID, marker);
			expect(actualResult.getAttribute('src')).toBe('images/X_dark.svg');
			expect(actualResult.getAttribute('src')).not.toBe('images/O_dark.svg');
		});

		test('returns an element with the O_dark image as src when given O as the marker', () => {
			let playerID = 1;
			let marker = 'O';

			let actualResult = ticTacToe.createPlayerMarkerElement(playerID, marker);
			expect(actualResult.getAttribute('src')).toBe('images/O_dark.svg');
		});

		test('returns an element with "X marker" alt attribute when given X as the marker', () => {
			let playerID = 1;
			let marker = 'X';

			let actualResult = ticTacToe.createPlayerMarkerElement(playerID, marker);
			expect(actualResult.getAttribute('alt')).toBe('X marker');
			expect(actualResult.getAttribute('alt')).not.toBe('O marker');
		});

		test('returns an element with "O marker" alt attribute when given O as the marker', () => {
			let playerID = 1;
			let marker = 'O';

			let actualResult = ticTacToe.createPlayerMarkerElement(playerID, marker);
			expect(actualResult.getAttribute('alt')).toBe('O marker');
		});

		test('returns an element with the turn class', () => {
			let playerID = 1;
			let marker = 'O';

			let actualResult = ticTacToe.createPlayerMarkerElement(playerID, marker);
			expect(actualResult.classList.contains('turn')).toBe(true);
		});

		test('returns an element with the ID "player-1-turn-marker" when given the playerID 1', () => {
			let playerID = 1;
			let marker = 'X';

			let actualResult = ticTacToe.createPlayerMarkerElement(playerID, marker);
			expect(actualResult.getAttribute('id')).toBe('player-1-turn-marker');
			expect(actualResult.getAttribute('id')).not.toBe('player-2-turn-marker');
		});

		test('returns an element with the ID "player-2-turn-marker" when given the playerID 2', () => {
			let playerID = 2;
			let marker = 'X';

			let actualResult = ticTacToe.createPlayerMarkerElement(playerID, marker);
			expect(actualResult.getAttribute('id')).toBe('player-2-turn-marker');
		});
	});
});

