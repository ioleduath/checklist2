import { FormGroup, FormArray } from "@angular/forms";
import { ServiceInspectionItemForm } from "./serviceInspectionItemForm";

export class ServiceInspectionForm extends FormGroup {
    inspectionItems: FormArray;
  
    constructor(inspectionItemForms: ServiceInspectionItemForm[]) {
      const controls = {
        inspectionItems: new FormArray(inspectionItemForms),
      };
  
      super(controls);
  
      this.inspectionItems = controls.inspectionItems;
    }
  }