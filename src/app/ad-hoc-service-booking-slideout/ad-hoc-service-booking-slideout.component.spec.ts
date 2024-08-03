import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdHocServiceBookingSlideoutComponent } from './ad-hoc-service-booking-slideout.component';

describe('AdHocServiceBookingSlideoutComponent', () => {
  let component: AdHocServiceBookingSlideoutComponent;
  let fixture: ComponentFixture<AdHocServiceBookingSlideoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdHocServiceBookingSlideoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdHocServiceBookingSlideoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
