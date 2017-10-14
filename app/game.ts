import { GameBoard } from './gameBoard';
import { Scoreboard } from './scoreboard';
import { Player } from './player';

import * as $ from 'jquery';

export class Game {
	// constants
	private readonly minPlayers: number = 2;
	private readonly maxPlayers: number = 4;

	// objects
	private readonly gameBoard: GameBoard;
	private readonly scoreBoard: Scoreboard;
	private players: Player[] = [];

	private endRoundButton: JQuery<HTMLButtonElement> = $('#endRound') as JQuery<HTMLButtonElement>;


	/**
	 * Initializes a new game instance.
	 */
	constructor() {
		this.gameBoard = new GameBoard();
		this.gameBoard.players.val(this.minPlayers);
		this.scoreBoard = new Scoreboard();

		this.wireUpEvents();
	}

	/**
	 * Wires up the events that happen in the game with their event handlers.
	 */
	private wireUpEvents(): void {
		// starting a new game
		this.gameBoard.startButton.click( () => this.startNewGame() );
		// ending a round of play
		this.endRoundButton.click( () => this.endRound() );
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
			this.players.push( new Player() );
		}

		this.gameBoard.startForm.hide();

		this.scoreBoard.updateScoreboard(this.players);
		this.scoreBoard.buildScoringPanel(this.players);
		$(this.scoreBoard.scoreboardDiv).show(1000);
		$(this.scoreBoard.scoringDiv).show(1000);
	}

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

		this.checkForWinner();
	}

	private checkForWinner(): void {
		let playersAtPhase10: Player[];

		playersAtPhase10 = this.players.filter( (player: Player) => {
			if(player.phase === 10){
				return player;
			}
		});

		let lowestScorePlayer: Player | undefined;
		let winningPlayerNum : number | undefined;
		for (var i = 0; i < playersAtPhase10.length; i++) {
			var player = playersAtPhase10[i];
			if (lowestScorePlayer === undefined || lowestScorePlayer.score > player.score) {
				lowestScorePlayer = player;
				winningPlayerNum = i+1;
			}
		}

		if (winningPlayerNum !== undefined) {
			alert('Player ' + winningPlayerNum + ' has won the game!');
			// end the game somehow
		}
	}
}