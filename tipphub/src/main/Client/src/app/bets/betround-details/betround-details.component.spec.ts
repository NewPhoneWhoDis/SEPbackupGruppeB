import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetroundDetailsComponent } from './betround-details.component';

describe('BetroundDetailsComponent', () => {
  let component: BetroundDetailsComponent;
  let fixture: ComponentFixture<BetroundDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BetroundDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BetroundDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
