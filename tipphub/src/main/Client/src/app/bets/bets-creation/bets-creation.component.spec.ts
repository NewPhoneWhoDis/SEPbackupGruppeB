import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetsCreationComponent } from './bets-creation.component';

describe('BetsCreationComponent', () => {
  let component: BetsCreationComponent;
  let fixture: ComponentFixture<BetsCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BetsCreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BetsCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
