import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedLoginsSummaryComponent } from './failed-logins-summary.component';

describe('FailedLoginsSummaryComponent', () => {
  let component: FailedLoginsSummaryComponent;
  let fixture: ComponentFixture<FailedLoginsSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FailedLoginsSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FailedLoginsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
