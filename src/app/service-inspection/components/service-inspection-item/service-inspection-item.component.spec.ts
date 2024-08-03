import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceInspectionItemComponent } from './service-inspection-item.component';

describe('ServiceInspectionItemComponent', () => {
  let component: ServiceInspectionItemComponent;
  let fixture: ComponentFixture<ServiceInspectionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceInspectionItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceInspectionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
