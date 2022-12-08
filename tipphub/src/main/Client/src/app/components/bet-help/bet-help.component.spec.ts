import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetHelpComponent } from './bet-help.component';

describe('BetHelpComponent', () => {
  let component: BetHelpComponent;
  let fixture: ComponentFixture<BetHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BetHelpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BetHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
