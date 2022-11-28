import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemdateModalComponent } from './systemdate-modal.component';

describe('SystemdateModalComponent', () => {
  let component: SystemdateModalComponent;
  let fixture: ComponentFixture<SystemdateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemdateModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
