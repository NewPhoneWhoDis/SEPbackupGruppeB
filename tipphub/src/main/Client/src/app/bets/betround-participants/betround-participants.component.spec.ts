import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetroundParticipantsComponent } from './betround-participants.component';

describe('BetroundParticipantsComponent', () => {
  let component: BetroundParticipantsComponent;
  let fixture: ComponentFixture<BetroundParticipantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BetroundParticipantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BetroundParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
