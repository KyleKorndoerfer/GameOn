import { GameBoard } from './gameBoard';
import { Scoreboard } from './scoreboard';
import { Player } from './player';
import { Notifications } from './notifications';
import { AlertType } from './alertType';
import { StorageType, StorageManager } from './storageManager';

import * as $ from 'jquery';

/**
 * Main control point for the phase-10 game.
 * @class
 */
export class Game {
	// constants
	private readonly minPlayers: number = 2;
	private readonly maxPlayers: number = 4;

	// objects
	private readonly gameBoard: GameBoard;
	private readonly scoreBoard: Scoreboard;
	private readonly notifications: Notifications = new Notifications()
	private players: Player[] = [];
	private readonly storage: StorageManager;

	private endRoundButton: JQuery<HTMLButtonElement> = $('#endRound') as JQuery<HTMLButtonElement>;
	private endGameButton: JQuery<HTMLButtonElement> = $('#endGame') as JQuery<HTMLButtonElement>;


	/**
	 * Initializes a new game instance.
	 * @constructor
	 */
	constructor() {
		this.gameBoard = new GameBoard();
		this.gameBoard.players.val(this.minPlayers);
		this.scoreBoard = new Scoreboard();
		this.storage = new StorageManager(StorageType.session, 'phase10');

		this.wireUpEvents();
		this.restoreGame();
	}

	/**
	 * Wires up the events that happen in the game with their event handlers.
	 */
	private wireUpEvents(): void {
		// starting a new game
		this.gameBoard.startButton.click( () => this.startNewGame() );
		// ending a round of play
		this.endRoundButton.click( () => this.endRound() );
		// ending/abandoning the game
		this.endGameButton.click( () => this.endGame() );
	}

	/**
	 * Restores a saved game session, if available
	 */
	private restoreGame(): void {
		if (this.storage.isAvailable() && this.storage.hasGame()) {
			this.players = JSON.parse(this.storage.loadGame());

			// repeated block of code below in startNewGame()
			this.gameBoard.startForm.hide();

			this.scoreBoard.updateScoreboard(this.players);
			this.scoreBoard.buildScoringPanel(this.players);
			$(this.scoreBoard.scoringContainer).show(1000);

			this.notifications.addAlert("Saved game restored", AlertType.info, true);
		} else if (!this.storage.isAvailable()) {
			this.notifications.addAlert("Unable to save game progress", AlertType.warning, true);
		}
	}

	/**
	 * Attempts to start a new game if the correct number of players have been
	 * specified.
	 */
	private startNewGame(): void {
		let numPlayers: number = this.gameBoard.players.val() as number;
		if (numPlayers < this.minPlayers || numPlayers > this.maxPlayers) {
			console.error("Incorrect number of players specified");
			this.gameBoard.players.val(this.minPlayers);
			return;
		}
		// create the players array
		for (var i = 0; i < numPlayers; i++) {
			this.players.push( new Player(i+1) );
		}

		this.gameBoard.startForm.hide();

		this.scoreBoard.updateScoreboard(this.players);
		this.scoreBoard.buildScoringPanel(this.players);
		$(this.scoreBoard.scoringContainer).show(1000);

		this.storage.saveGame(JSON.stringify(this.players));
	}

	/**
	 * Performs the actions associated with the end of a round of play.
	 */
	private endRound(): void {
		// process the scores from the round & update the player objects
		for (var i = 0; i < this.players.length; i++) {
			var player = this.players[i];

			let playerScore: string = (document.getElementById('playerScore' + i) as HTMLInputElement).value;
			player.score += Number(playerScore);

			let playerPhaseComplete: boolean = (document.getElementById('playerPhase' + i) as HTMLInputElement).checked;
			if (playerPhaseComplete) {
				player.phase++;
			}
		}

		// update the scoreboard & reset the scoring panel
		this.scoreBoard.updateScoreboard(this.players);
		this.scoreBoard.buildScoringPanel(this.players);
		// save the game progress
		this.storage.saveGame(JSON.stringify(this.players));

		this.checkForWinner();
	}

	/**
	 * Checks to see if any players have completed the final phase and, if so,
	 * who has the lowest score.
	 */
	private checkForWinner(): void {
		let playersAtPhase10: Player[];

		playersAtPhase10 = this.players.filter( (player: Player) => {
			if(player.phase === 10){
				return player;
			}
		});

		let lowestScorePlayer: Player | undefined = undefined;
		let winningPlayerNum : number | undefined = undefined;
		for (var i = 0; i < playersAtPhase10.length; i++) {
			var player = playersAtPhase10[i];
			if (lowestScorePlayer === undefined || lowestScorePlayer.score > player.score) {
				lowestScorePlayer = player;
				winningPlayerNum = player.playerNumber;
			}
		}

		if (winningPlayerNum !== undefined) {
			this.notifications.addAlert(`Player ${winningPlayerNum} has won the game!`, AlertType.success);
			this.storage.endGame();
		}
	}

	/**
	 * Ends the current game and resets the 'board'.
	 */
	private endGame(): void {
		let abandon: boolean = confirm("Are you sure you wish to abandon the game?");

		if (abandon) {
			this.players = [];
			this.storage.endGame();
			$(this.scoreBoard.scoringContainer).hide();
			this.gameBoard.startForm.show();
			this.notifications.clearAlerts();
		}
	}
}