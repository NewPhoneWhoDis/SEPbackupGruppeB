import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueDeleteComponent } from './league-delete.component';

describe('LeagueDeleteComponent', () => {
  let component: LeagueDeleteComponent;
  let fixture: ComponentFixture<LeagueDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeagueDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeagueDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
