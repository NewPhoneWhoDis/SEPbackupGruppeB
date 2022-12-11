import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetsOverviewComponent } from './bets-overview.component';

describe('BetsOverviewComponent', () => {
  let component: BetsOverviewComponent;
  let fixture: ComponentFixture<BetsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BetsOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BetsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
