import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceInspectionPopupComponent } from './service-inspection-popup.component';

describe('ServiceInspectionPopupComponent', () => {
  let component: ServiceInspectionPopupComponent;
  let fixture: ComponentFixture<ServiceInspectionPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceInspectionPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceInspectionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
