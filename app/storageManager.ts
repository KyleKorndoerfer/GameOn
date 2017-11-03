/**
 * Defines the types of storage that can be used.
 * @enum {string}
 */
export enum StorageType {
	local = "localStorage",
	session = "sessionStorage"
}

/**
 * Manages the storage of game data in either Session or Local storage.
 * @class
 */
export class StorageManager {
	private readonly store: Storage | null = null;
	private readonly gameName: string;

	/**
	 * Initializes a new instance of the storage manager.
	 * @constructor
	 */
	constructor(type: StorageType, gameName: string) {
		if (this.storageAvailable(type)) {
			this.store = (window as any)[type];
		}

		this.gameName = gameName;
	}

	/**
	 * Checks whether storage is available or not.
	 * @returns {boolean} true if storage can be used.; false otherwise.
	 */
	isAvailable(): boolean {
		return this.store !== null;
	}

	/**
	 * Checks to see if there is a saved game.
	 * @returns {boolean} true if there is a saved game; false otherwise.
	 */
	hasGame(): boolean {
		return this.store !== null
			? this.store.getItem(this.gameName) !== null
			: false;
	}

	/**
	 * Loads a saved game.
	 * @returns {boolean} The saved game (if available); empty string otherwise.
	 */
	loadGame(): string {
		return this.store !== null
			? this.store.getItem(this.gameName) || ""
			: "";
	}

	/**
	 * Saves the curent game state.
	 * @param {string} data The game data as a JSON string.
	 */
	saveGame(data: string): void {
		if (this.store !== null ) {
			this.store.setItem(this.gameName, data);
		}
	}

	/**
	 * Removes the saved data for the curent game.
	 */
	endGame(): void {
		if (this.store !== null ) {
			this.store.removeItem(this.gameName);
		}
	}

	/**
	 * Check to see if the specified storage mechanism is available to use.
	 * @description Taken from https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
	 * @param {StorageType} type The storage type to check availability for.
	 * @returns {boolean} If the storage type is available.
	 */
	private storageAvailable(type: StorageType): boolean {
		try {
			var storage = (window as any)[type],
				x = '__storage_test__';
			storage.setItem(x, x);
			storage.removeItem(x);
			return true;
		}
		catch(e) {
			return e instanceof DOMException && (
				// everything except Firefox
				e.code === 22 ||
				// Firefox
				e.code === 1014 ||
				// test name field too, because code might not be present
				// everything except Firefox
				e.name === 'QuotaExceededError' ||
				// Firefox
				e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
				// acknowledge QuotaExceededError only if there's something already stored
				storage.length !== 0;
		}
	}
}