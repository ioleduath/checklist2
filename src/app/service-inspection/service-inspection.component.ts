import { Component, OnDestroy, Input, Output, SimpleChanges, EventEmitter } from "@angular/core";
import { FormArray, FormGroup } from "@angular/forms";
import { Observable, Subject, takeUntil } from "rxjs";
import { ServiceInspectionItem } from "../models/serviceInspectionItem.model";
import { ServiceInspectionCause } from "../models/serviceInspectionCause.model";
import { InspectionFailureData } from "../models/inspectionFailureData.model";
import { ServiceInspectionService } from "../services/service-inspection-service.service";
import { ServiceInspectionForm } from "./classes/serviceInspectionForm";
import { ServiceInspectionItemForm } from "./classes/serviceInspectionItemForm";


@Component({
  selector: 'app-service-inspection',
  templateUrl: './service-inspection.component.html',
  styleUrls: ['./service-inspection.component.scss'],
})
export class ServiceInspectionComponent implements OnDestroy {
  @Input() form!: FormGroup; 
  @Input() isViewOnly: boolean = false;
  @Input() inspectionItems!: ServiceInspectionItem[];
  @Input() inspectionItemCauses!: ServiceInspectionCause[];
  @Input() currentServiceFailures!: InspectionFailureData[];
  @Output() formReady = new EventEmitter<ServiceInspectionForm>();
  @Output() hasUrgentError = new EventEmitter<boolean>();

  public hasUrgentError$: Observable<boolean>;

  private _onDestroy = new Subject<void>();

  constructor(private serviceInspectionService: ServiceInspectionService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['inspectionItems'] ||
      changes['inspectionItemCauses'] ||
      changes['currentServiceFailures']
    ) {

      console.log('changes', changes);
      if (this.inspectionItems && this.inspectionItemCauses && this.currentServiceFailures) {
        this.form = this.serviceInspectionService.createInspectionForms(
          this.inspectionItems,
          this.inspectionItemCauses,
          this.currentServiceFailures
        );

        this.serviceInspectionService.setupUrgentErrorDetection(this.form as ServiceInspectionForm);

        this.hasUrgentError$ = this.serviceInspectionService.hasUrgentError$;

        this.hasUrgentError$.pipe(takeUntil(this._onDestroy)).subscribe((value) => {
          this.hasUrgentError.emit(value);
        });

        this.formReady.emit(this.form as ServiceInspectionForm);
      }
    }
  }

  get inspectionItemControls(): FormArray {
    return this.form.get('inspectionItems') as FormArray; 
  }

  getServiceInspectionItemForm(index: number): ServiceInspectionItemForm {
    return this.inspectionItemControls.at(index) as ServiceInspectionItemForm;
  }

 
  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
