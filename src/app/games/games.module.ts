import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './/games-routing.module';
import { Phase10Module } from './phase10/phase10.module';

import { GameListComponent } from './game-list.component';

@NgModule({
	imports: [
		CommonModule,
		Phase10Module,
		GamesRoutingModule
	],
	declarations: [GameListComponent]
})
export class GamesModule { }
