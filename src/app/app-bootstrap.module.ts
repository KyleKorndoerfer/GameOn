import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertModule } from 'ngx-bootstrap/alert';

/**
 * Wrapper module for all of the NGX-Bootstrap modules used in the application.
 */
@NgModule({
	imports: [
		CommonModule,
		AlertModule.forRoot()
	],
	declarations: [],
	exports: [
		AlertModule
	]
})
export class AppBootstrapModule { }
