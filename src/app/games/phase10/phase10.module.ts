import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Phase10RoutingModule } from './phase10-routing.module';
import { Phase10HomeComponent } from './phase10-home/phase10-home.component';

@NgModule({
	imports: [
		CommonModule,
		Phase10RoutingModule
	],
	declarations: [Phase10HomeComponent]
})
export class Phase10Module { }
