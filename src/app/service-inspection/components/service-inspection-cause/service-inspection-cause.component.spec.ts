import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceInspectionCauseComponent } from './service-inspection-cause.component';

describe('ServiceInspectionCauseComponent', () => {
  let component: ServiceInspectionCauseComponent;
  let fixture: ComponentFixture<ServiceInspectionCauseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceInspectionCauseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceInspectionCauseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
