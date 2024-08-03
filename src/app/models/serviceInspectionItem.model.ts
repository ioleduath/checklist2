import { VehicleType } from "../ad-hoc-service-booking-slideout/mock-data";
import { ServiceInspectionCause } from "./serviceInspectionCause.model";

export interface ServiceInspectionItem {
    id: string;                   
    description: string;          
    causes: ServiceInspectionCause[];
    isUrgent: boolean ;
    vehicleType: VehicleType;
  }
  