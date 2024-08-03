import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceInspectionComponent } from './service-inspection.component';

describe('ServiceInspectionComponent', () => {
  let component: ServiceInspectionComponent;
  let fixture: ComponentFixture<ServiceInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceInspectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
