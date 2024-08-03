import { FormGroup, FormControl, FormArray, AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { ServiceInspectionCauseForm } from "./serviceInspectionCauseForm";
import { ServiceErrorCode } from "src/app/models/serviceErrorCode";

export class ServiceInspectionItemForm extends FormGroup {
    id: FormControl;
    label: FormControl;
    errorCode: FormControl;
    causes: FormArray;
    isUrgent: FormControl;
  
    constructor(
      id: string,
      label: string,
      errorCode: number,
      causes: ServiceInspectionCauseForm[],
      isUrgent: boolean = false
    ) {
      const controls = {
        id: new FormControl(id),
        label: new FormControl(label),
        errorCode: new FormControl(errorCode),
        causes: new FormArray(causes),
        isUrgent: new FormControl(isUrgent),
      };
  
      super(controls);
  
      this.id = controls.id;
      this.label = controls.label;
      this.errorCode = controls.errorCode;
      this.causes = controls.causes;
      this.isUrgent = controls.isUrgent;
  
      this.setValidators(atLeastOneCauseSelectedValidator);
    }
  
    hasUrgentFault(): boolean {
      return this.causes.controls.some((control: FormGroup) => {
        const causeForm = control as ServiceInspectionCauseForm;
        return causeForm.isChecked.value && causeForm.isUrgent.value;
      });
    }
  
    mapToServiceFailureData(): any[] {
      if (this.errorCode.value !== ServiceErrorCode.NonCompliant) {
        return [];
      }
  
      return this.causes.controls
        .map((control: FormGroup) => {
          const causeForm = control as ServiceInspectionCauseForm;
          if (causeForm.isChecked.value) {
            return {
              inspectionItemId: this.id.value,
              inspectionItemCauseId:
                causeForm.id.value !== 'other' ? causeForm.id.value : null,
              manualCause:
                causeForm.id.value === 'other'
                  ? causeForm.manualCause.value
                  : '',
              lastModifiedTime: new Date(),
            };
          }
          return null;
        })
        .filter((failure) => failure !== null);
    }
  }

  export const atLeastOneCauseSelectedValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const causesGroup = control.get('causes') as FormGroup;
    const errorCode = control.get('errorCode').value;
    const selectedCauses = Object.keys(causesGroup.controls).filter(
      (key) => causesGroup.get(key).get('isChecked').value
    );
  
    if (errorCode === ServiceErrorCode.NonCompliant && selectedCauses.length === 0) {
      return { atLeastOneCauseSelected: true };
    }
    return null;
  };