import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetsManagementComponent } from './bets-management.component';

describe('BetsManagementComponent', () => {
  let component: BetsManagementComponent;
  let fixture: ComponentFixture<BetsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BetsManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BetsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
