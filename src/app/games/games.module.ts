import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './/games-routing.module';
import { GameListComponent } from './game-list.component';

@NgModule({
	imports: [
		CommonModule,
		GamesRoutingModule
	],
	declarations: [GameListComponent]
})
export class GamesModule { }
