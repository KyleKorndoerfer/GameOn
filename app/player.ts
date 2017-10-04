
/**
 * Represents a player in the game by keeping track of their score and which
 * pahse they have completed.
 */
export class Player {
	score: number = 0;
	phase: number = 0;

	update(points: number, phaseCompleted: boolean): void {
		this.score += points;
		if( phaseCompleted){
			this.phase++;
		}
	}
}