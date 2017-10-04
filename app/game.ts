import { GameBoard } from './gameBoard';
import { Player } from './player';

import * as $ from 'jquery';

export class Game {
	// constants
	private readonly minPlayers: number = 2;
	private readonly maxPlayers: number = 4;

	// objects
	private readonly gameBoard: GameBoard;
	private players: Player[] = [];
	private scoreboardDiv: HTMLElement = document.getElementById('scoreboard') as HTMLElement;
	private scoringDiv: HTMLElement = document.getElementById('scoring') as HTMLElement;
	private endRoundButton: JQuery<HTMLButtonElement> = $('#endRound') as JQuery<HTMLButtonElement>;


	/**
	 * Initializes a new game instance.
	 */
	constructor() {
		this.gameBoard = new GameBoard();
		this.gameBoard.players.val(this.minPlayers);

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

		this.updateScoreboard();
		this.buildScoringPanel();
		$(this.scoreboardDiv).show(1000);
		$(this.scoringDiv).show(1000);
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
		this.updateScoreboard();
		this.buildScoringPanel();

		// TODO: check for a winner
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

	private updateScoreboard(): void {
		let scoreRows: HTMLElement = document.getElementById('scoreRows') as HTMLElement;
		let rows: string = '';

		for (var i = 0; i < this.players.length; i++) {
			var player = this.players[i];

			rows += `<tr><td>Player ${i+1}</td><td>${player.score}</td><td>${player.phase}</td></tr>`;
		}

		scoreRows.innerHTML = rows;
	}

	private buildScoringPanel(): void {
		let scoringBody = document.getElementById('roundRows') as HTMLElement;
		let rows: string = '';

		for (var i = 0; i < this.players.length; i++) {
			var player = this.players[i];

			rows += `<tr><td>Player ${i+1}</td>`;
			rows += `  <td><input type="text" id="playerScore${i}" class="form-control input-sm" placeholder="points" /></td>`;
			rows += `  <td><input type="checkbox" id="playerPhase${i}" class="form-control input-sm" /></td>`;
			rows += `</tr>`;
		}

		scoringBody.innerHTML = rows;
	}
}