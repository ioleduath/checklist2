import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray } from '@angular/forms';
import { ServiceInspectionItemForm } from '../../classes/serviceInspectionItemForm';
import { ServiceInspectionCauseForm } from '../../classes/serviceInspectionCauseForm';
import { ServiceErrorCode } from 'src/app/models/serviceErrorCode';

@Component({
  selector: 'app-service-inspection-item',
  templateUrl: './service-inspection-item.component.html',
  styleUrls: ['./service-inspection-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ServiceInspectionItemComponent implements OnInit {
  @Input() itemForm!: ServiceInspectionItemForm;
  @Input() isViewOnly: boolean = false;

  public errorCode = ServiceErrorCode;

  ngOnInit() {
    if (this.itemForm) {
      this.itemForm.get('errorCode')?.valueChanges.subscribe((value) => {
        if (value === this.errorCode.Compliant) {
          this.clearAllCauses();
        } else if (value === this.errorCode.NonCompliant) {
          this.checkCauses();
        }
      });
    }
  }

  get causeControls(): FormArray {
    return this.itemForm.get('causes') as FormArray;
  }

  getCauseForm(index: number): ServiceInspectionCauseForm {
    return this.causeControls.at(index) as ServiceInspectionCauseForm;
  }

  setErrorCode(code: number) {
    this.itemForm.get('errorCode')?.setValue(code);
  }

  clearAllCauses() {
    this.causeControls.controls.forEach((causeControl) => {
      const control = causeControl as ServiceInspectionCauseForm;
      control.patchValue({
        isChecked: false,
        manualCause: '',
      });
    });
  }

  checkCauses() {
    const otherControl = this.causeControls.controls.find(
      (control) => (control as ServiceInspectionCauseForm).get('id')?.value === 'other'
    ) as ServiceInspectionCauseForm;

    if (this.causeControls.length === 1 && otherControl) {
      otherControl.patchValue({
        isChecked: true,
        manualCause: this.itemForm.get('label')?.value,
      });
    }
  }
}
