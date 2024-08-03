import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ServiceInspectionPopupComponent } from './service-inspection-popup/service-inspection-popup.component';
import { MOCK_INSPECTION_FAILURES, MOCK_SERVICE_INSPECTION_CAUSES, MOCK_SERVICE_INSPECTION_ITEMS } from './ad-hoc-service-booking-slideout/mock-data-for-slideout';
import { AdHocServiceBookingSlideoutComponent } from './ad-hoc-service-booking-slideout/ad-hoc-service-booking-slideout.component';
import { VehicleType, VehicleTypeModel } from './ad-hoc-service-booking-slideout/mock-data';
import { InspectionFailureData } from './models/inspectionFailureData.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public dialog: MatDialog) {}
  vehicleType = VehicleType;
  cachedItems = MOCK_SERVICE_INSPECTION_ITEMS;
  cachedCauses = MOCK_SERVICE_INSPECTION_CAUSES;
  truckFakeData: InspectionFailureData[] = [  {
    inspectionItemId: 'item1',
    inspectionItemCauseId: 'cause1'   
  }];

  suvFakeData: InspectionFailureData[] = [    {
    inspectionItemId: 'item2',
    inspectionItemCauseId: 'cause3',
    
  }];

  openDialog(vehicleCurrentFailures: InspectionFailureData[], vehicleType: VehicleType, vehicleVin: string): void {
   const items = this.cachedItems.filter(
      i => i.vehicleType == vehicleType
    );

    console.log(items);
    
    const causesIds = items.flatMap(i => i.causes.map(c => c.id));
    console.log(causesIds);
    const causes = MOCK_SERVICE_INSPECTION_CAUSES.filter(
      cause => causesIds.includes(cause.id)
    );
    console.log(causes);

    console.log(vehicleCurrentFailures);

    this.dialog.open(ServiceInspectionPopupComponent, {
      width: '700px',
      data: { cachedItems : items, cachedCauses: causes, failuresOnItem: vehicleCurrentFailures, vinNumber: vehicleVin },
    });
  }


  sendToManufacturer(): void {
    this.dialog.open(AdHocServiceBookingSlideoutComponent, {
      width: '700px',
      data: { },
    });
  }
}
