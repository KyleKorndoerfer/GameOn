import { Player } from './player';

/**
 * Handles the logic around the display of the scoreboard.
 * @class
 */
export class Scoreboard {
	scoreRows: HTMLElement = document.getElementById('scoreRows') as HTMLElement;
	scoringContainer: HTMLElement = document.getElementById('scoringContainer') as HTMLElement;

	/**
	 * Updates the player/scores portion of the scoreboard.
	 * @param {Player[]} players The list of players to display on the scoreboard.
	 */
	updateScoreboard(players: Player[]): void {
		let rows: string = '';

		for (var i = 0; i < players.length; i++) {
			var player = players[i];

			rows += `<tr><td>Player ${player.playerNumber}</td><td>${player.score}</td><td>${player.phase}</td></tr>`;
		}

		this.scoreRows.innerHTML = rows;
	}

	/**
	 * Builds and displays the scoring panel to record the results of a round of play.
	 *
	 * @param {Player[]} players The list of players to build the scoring panel with.
	 */
	buildScoringPanel(players: Player[]): void {
		let scoringBody = document.getElementById('roundRows') as HTMLElement;
		let rows: string = '';

		for (var i = 0; i < players.length; i++) {
			var player = players[i];

			rows += `<tr><td>Player ${player.playerNumber}</td>`;
			rows += `  <td><input type="text" id="playerScore${i}" class="form-control input-sm" placeholder="points" /></td>`;
			rows += `  <td><input type="checkbox" id="playerPhase${i}" class="form-control input-sm" /></td>`;
			rows += `</tr>`;
		}

		scoringBody.innerHTML = rows;
	}
}