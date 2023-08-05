import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeBirthdayComponent } from './change-birthday.component';

describe('ChangeBirthdayComponent', () => {
  let component: ChangeBirthdayComponent;
  let fixture: ComponentFixture<ChangeBirthdayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeBirthdayComponent]
    });
    fixture = TestBed.createComponent(ChangeBirthdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
