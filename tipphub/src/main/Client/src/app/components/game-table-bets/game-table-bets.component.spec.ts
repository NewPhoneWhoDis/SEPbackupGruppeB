import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTableBetsComponent } from './game-table-bets.component';

describe('GameTableBetsComponent', () => {
  let component: GameTableBetsComponent;
  let fixture: ComponentFixture<GameTableBetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameTableBetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameTableBetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
