import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { GameListComponent } from './game-list.component';

/** Defines the routes passed to the child RouterModule */
const routes: Routes = [
	{
		path: 'games',
		component: GameListComponent,
		children: [
			{
				path: 'list',
				pathMatch: 'full',
				component: GameListComponent
			},
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'list'
			},
			{
				path: '**',
				pathMatch: 'full',
				redirectTo: 'list'
			}
		]
	}
];

/**
 * Routing definitions for the Games module.
 */
@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes)
	],
	declarations: [],
	exports: [RouterModule]
})
export class GamesRoutingModule { }
