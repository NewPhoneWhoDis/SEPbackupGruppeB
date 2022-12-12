import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeageCreationPageComponent } from './leage-creation-page.component';

describe('LeageCreationPageComponent', () => {
  let component: LeageCreationPageComponent;
  let fixture: ComponentFixture<LeageCreationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeageCreationPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeageCreationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
