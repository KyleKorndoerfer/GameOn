import * as $ from 'jquery';

/**
 * Represents the 'playing surface' of the game.
 * @class
 */
export class GameBoard {
	readonly startForm: JQuery<HTMLElement>;
	readonly players: JQuery<HTMLInputElement>;
	readonly startButton: JQuery<HTMLButtonElement>;

	/**
	 * Initializes a new instance of the gameboard
	 * @constructor
	 */
	constructor() {
		// Player form
		this.startForm = $('#playerForm');
		this.players = $('#players') as JQuery<HTMLInputElement>;
		this.startButton = $('#startGame') as JQuery<HTMLButtonElement>;
	}

	/** Hide the player start form. */
	hidePlayerForm(): void {
		this.startForm.hide(1000);
	}

	/** Show the player start form. */
	showPlayerForm(): void {
		this.startForm.show(1000);
	}
}