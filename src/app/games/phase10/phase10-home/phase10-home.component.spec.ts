import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Phase10HomeComponent } from './phase10-home.component';

describe('Phase10HomeComponent', () => {
	let component: Phase10HomeComponent;
	let fixture: ComponentFixture<Phase10HomeComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [Phase10HomeComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(Phase10HomeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
