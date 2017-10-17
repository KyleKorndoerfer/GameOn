/**
 * Represents a player in the game by keeping track of their score and which
 * phase they have completed.
 */
export class Player {
	private _playerNum: number;
	score: number = 0;
	phase: number = 0;

	/**
	 * Initializes a new player instance.
	 *
	 * @param playerNum The number being assigned to the new player.
	 */
	constructor(playerNum: number) {
		this._playerNum = playerNum;
	}

	/** Gets the number for the current player. */
	get playerNumber(): number {
		return this._playerNum;
	}

	/** Sets the number for the current player. */
	set playerNumber(playerNum: number) {
		if (playerNum < 0)
			throw new Error('Player number cannot be less than 0');

		this._playerNum = playerNum;
	}

	/**
	 * Updates the player object after a round has been completed.
	 *
	 * @param points The points assigned for the round.
	 * @param phaseCompleted Whether the player completed their phase or not.
	 */
	update(points: number, phaseCompleted: boolean): void {
		this.score += points;
		if( phaseCompleted){
			this.phase++;
		}
	}
}