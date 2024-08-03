import { FormGroup, FormControl, AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class ServiceInspectionCauseForm extends FormGroup {
    id: FormControl;
    description: FormControl;
    isChecked: FormControl;
    isUrgent: FormControl;
    manualCause: FormControl;
  
    constructor(
      id: string,
      description: string,
      isChecked: boolean = false,
      isUrgent: boolean = false,
    ) {
      const controls = {
        id: new FormControl(id),
        description: new FormControl(description),
        isChecked: new FormControl(isChecked),
        isUrgent: new FormControl(isUrgent),
      };
  
      super(controls);
  
      this.id = controls.id;
      this.description = controls.description;
      this.isChecked = controls.isChecked;
      this.isUrgent = controls.isUrgent;
  
      if (id === 'other') {
        this.setValidators(noManualCauseGivenForOtherValidator(id));
      }
    }
  }

  export function noManualCauseGivenForOtherValidator(
    causeId: string
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isChecked = control.get('isChecked')?.value;
      const manualCause = control.get('manualCause')?.value;
  
      if (causeId === 'other' && isChecked && !manualCause) {
        return { noManualCauseGivenForOther: true };
      }
      return null;
    };
  }
  