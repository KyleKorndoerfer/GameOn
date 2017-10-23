import { AlertType } from './alertType';

/**
 * Manages the display of notifications within the game.
 */
export class Notifications {
	private readonly alertContainer: HTMLElement;

	constructor() {
		this.alertContainer = document.getElementById('alerts') as HTMLElement;
	}

	/**
	 * Adds a new notification in the notification area (non-modal).
	 *
	 * @param message The message that will be displayed.
	 * @param type The type of alert to display (info).
	 * @param dismissible Whether the alert can be dismissed or not (false).
	 */
	addAlert( message: string, type: AlertType = AlertType.info, dismissible: boolean = false ): void {
		let newAlert: HTMLElement = document.createElement('div');
		newAlert.classList.add('alert', `alert-${AlertType[type]}`);
		newAlert.setAttribute('role', 'alert');

		if (dismissible) {
			newAlert.classList.add('alert-dismissible');

			let button: HTMLButtonElement = document.createElement('button') as HTMLButtonElement;
			button.type = 'button';
			button.classList.add('close');
			button.setAttribute('data-dismiss', 'alert');
			button.setAttribute('aria-label', 'Close');

			let span: HTMLElement = document.createElement('span');
			span.setAttribute('aria-hidden', 'true');
			span.innerText = "x";

			button.appendChild(span);
			newAlert.appendChild(button);
		}

		// append text after button (if present)
		newAlert.appendChild( document.createTextNode(message) );

		this.alertContainer.appendChild(newAlert);
	}

	clearAlerts(): void {
		this.alertContainer.innerHTML = "";
	}
}