import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Phase10HomeComponent } from './phase10-home/phase10-home.component';

/** Defines the routes used in the Phase 10 game */
const routes: Routes = [
	{
		path: 'games/phase10',
		component: Phase10HomeComponent,
		children: [
			/*{
				path: 'new',
				pathMatch: 'full',
				component: Phase10NewComponent
			},
			{
				path: 'play',
				pathMatch: 'full',
				component: Phase10PlayComponent
			},*/
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'new'
			},
			{
				path: '**',
				pathMatch: 'full',
				redirectTo: 'new'
			}
		]
	}
];

/**
 * Defines the routing behavior for the Phase 10 game.
 */
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class Phase10RoutingModule { }
