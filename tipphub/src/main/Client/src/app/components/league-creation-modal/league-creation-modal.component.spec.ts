import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueCreationModalComponent } from './league-creation-modal.component';

describe('LeagueCreationModalComponent', () => {
  let component: LeagueCreationModalComponent;
  let fixture: ComponentFixture<LeagueCreationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeagueCreationModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeagueCreationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
