import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import { Subject } from "rxjs";
import { ServiceInspectionForm } from "../service-inspection/classes/serviceInspectionForm";
import { ServiceInspectionService } from "../services/service-inspection-service.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { VehicleTypeDisplayNameMap } from "../ad-hoc-service-booking-slideout/mock-data";


@Component({
  selector: 'app-service-inspection-popup',
  templateUrl: './service-inspection-popup.component.html',
  styleUrls: ['./service-inspection-popup.component.scss'],
})
export class ServiceInspectionPopupComponent implements OnInit, OnDestroy {
  isFormValid = false;
  selectedFormData: any[] = [];
  hasUrgentError = false;
  isViewOnly: boolean;
  newServiceInspectionForm: ServiceInspectionForm;
  serviceAction: ServiceActionType = ServiceActionType.None;
  serviceActionType = ServiceActionType ;
  vehicleTypeDisplayNameMap = VehicleTypeDisplayNameMap;
  protected _onDestroy = new Subject<void>();

  submitPressed = false;
  shouldShowErrors = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ServiceInspectionPopupComponent>,
    public serviceInspectionService: ServiceInspectionService
  ) {}

  ngOnInit() {
    this.dialogRef.backdropClick().subscribe(() => {
      this.submitServiceData();
    });

    this.isViewOnly = this.data?.isViewOnly;
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  onFormReady(form: ServiceInspectionForm) {
    this.newServiceInspectionForm = form;
    this.newServiceInspectionForm.markAllAsTouched();
    this.newServiceInspectionForm.markAsDirty();
  }

  getHasUrgentError(val): void {
    this.hasUrgentError = val;
  }

  changeServiceAction(action: ServiceActionType): void {
    this.serviceAction = action;
  }

  onSubmitForm() {
    this.shouldShowErrors = true;

    const hasUrgentErrorWarning = this.checkForUrgentErrorWarning();

    if (!this.newServiceInspectionForm.valid || hasUrgentErrorWarning) {
      return;
    }

    this.submitServiceData();
  }

  private checkForUrgentErrorWarning(): boolean {
    return this.hasUrgentError && this.serviceAction === ServiceActionType.None;
  }

  private submitServiceData() {
    const updatedServiceData = this.serviceInspectionService.mapFormDataToServiceFailures(
      this.newServiceInspectionForm
    );
    if (updatedServiceData) {
      this.dialogRef.close({
        updatedServiceData: updatedServiceData,
        serviceAction: this.serviceAction,
      });
    } else {
      this.dialogRef.close();
    }
  }
}

export enum ServiceActionType {
  None = 'None',
  SendToManufacturer = 'SendToManufacturer', 
  ServiceOnSite = 'ServiceOnSite',          
  ScheduleRepair = 'ScheduleRepair',        
}
