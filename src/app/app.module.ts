import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from "@angular/common";
import { ServiceInspectionPopupComponent } from "./service-inspection-popup/service-inspection-popup.component";
import { ServiceInspectionComponent } from "./service-inspection/service-inspection.component";
import { ServiceInspectionItemComponent } from "./service-inspection/components/service-inspection-item/service-inspection-item.component";
import { ServiceInspectionCauseComponent } from "./service-inspection/components/service-inspection-cause/service-inspection-cause.component";
import { AdHocServiceBookingSlideoutComponent } from "./ad-hoc-service-booking-slideout/ad-hoc-service-booking-slideout.component";
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    ServiceInspectionPopupComponent,
    ServiceInspectionComponent,
    ServiceInspectionItemComponent,
    ServiceInspectionCauseComponent,
    AdHocServiceBookingSlideoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatDialogModule,
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
