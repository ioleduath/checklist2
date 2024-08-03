import { Component, ChangeDetectionStrategy, ViewEncapsulation, OnInit, Inject, ChangeDetectorRef } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { InspectionFailureData } from "../models/inspectionFailureData.model";
import { ServiceInspectionCause } from "../models/serviceInspectionCause.model";
import { ServiceInspectionItem } from "../models/serviceInspectionItem.model";
import { VINNumberModel, VehicleTypeModel, LocationModel, MOCK_VEHICLE_TYPES, MOCK_LOCATIONS, MOCK_VIN_NUMBERS,  VehicleType, VehicleTypeDisplayImageMap, VehicleTypeDisplayNameMap } from "./mock-data";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ServiceActionType } from "../service-inspection-popup/service-inspection-popup.component";
import { MOCK_SERVICE_INSPECTION_CAUSES, MOCK_SERVICE_INSPECTION_ITEMS } from "./mock-data-for-slideout";

@Component({
  selector: 'app-ad-hoc-service-booking-slideout',
  templateUrl: './ad-hoc-service-booking-slideout.component.html',
  styleUrls: ['./ad-hoc-service-booking-slideout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AdHocServiceBookingSlideoutComponent implements OnInit {
  inspectionItems!: ServiceInspectionItem[];
  inspectionItemCauses!: ServiceInspectionCause[];
  currentServiceFailures!: InspectionFailureData[];

  public vinFilterDropdownData: VINNumberModel[] = [];
  public vehicleTypeDisplayNameMap = VehicleTypeDisplayNameMap;
  public vehicleTypeDisplayImageMap = VehicleTypeDisplayImageMap;
  public backdropClickSubscription: Subscription | undefined;
  isFormValid = false;
  newInspectionForm: FormGroup = new FormGroup({});

  selectedFormData: InspectionFailureData[] = [];
  public vehicleTypeFilterDropdownData: VehicleTypeModel[] = [];
  public locationFilterDropdownData: LocationModel[] = [];

  vehicleTypeFormControl: FormControl = new FormControl();
  locationFormControl: FormControl = new FormControl();
  vinFormControl: FormControl = new FormControl();

  public unitType: VehicleType;
  public selectLocationDisabled: boolean = false;
  public vehicleTypeDisabled: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,  
    public dialogRef: MatDialogRef<AdHocServiceBookingSlideoutComponent>,
  ) {}

  ngOnInit(): void {
    this.backdropClickSubscription = this.dialogRef
      .backdropClick()
      .subscribe(() => {
        this.closeDialog();
      });
    this.loadMockData();
  }

  private loadMockData(): void {
    this.vehicleTypeFilterDropdownData = MOCK_VEHICLE_TYPES;
    this.locationFilterDropdownData = MOCK_LOCATIONS;
    this.vinFilterDropdownData = MOCK_VIN_NUMBERS;  
  }

  onFormReady(form: FormGroup) {
    this.newInspectionForm = form;
    this.newInspectionForm.markAllAsTouched();
    this.newInspectionForm.markAsDirty();
  }

  updateVehicleType() {
    this.inspectionItems = MOCK_SERVICE_INSPECTION_ITEMS.filter(
      i => i.vehicleType == this.vehicleTypeFormControl.value
    );
    
    const causesIds = this.inspectionItems.flatMap(i => i.causes.map(c => c.id));
    
    this.inspectionItemCauses = MOCK_SERVICE_INSPECTION_CAUSES.filter(
      cause => causesIds.includes(cause.id)
    );
    

    console.log("causes", this.inspectionItemCauses);
  }

  updateLocation() {
    console.log("Location changed:", this.locationFormControl.value);
  }

  public addItemToServiceBooking(): void {
    const response = {
      operatorAction: ServiceActionType.SendToManufacturer,
      updatedInspectionFailures: this.selectedFormData,
      adHocBookingVINNumberLink: this.vinFormControl.value,
    };

    this.dialogRef.close(response);
  }

  closeDialog(): void {
    if (this.selectedFormData) {
      this.dialogRef.close({
        updatedInspectionFailures: this.selectedFormData,
        operatorAction: ServiceActionType.SendToManufacturer,
      });
    } else {
      this.dialogRef.close();
    }
  }

  onSubmitForm() {
    if (this.isFormValid) {
      this.dialogRef.close();
    }
  }

  onFormValidityChange(event: {
    isValid: boolean;
    data: InspectionFailureData[];
    hasUrgentError: boolean;
  }) {
    this.isFormValid = event.isValid;
    this.selectedFormData = event.data;
  }
}
