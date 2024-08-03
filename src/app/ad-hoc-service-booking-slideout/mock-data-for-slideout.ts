import { InspectionFailureData } from "../models/inspectionFailureData.model";
import { ServiceInspectionCause } from "../models/serviceInspectionCause.model";
import { ServiceInspectionItem } from "../models/serviceInspectionItem.model";
import { VehicleType } from "./mock-data";

export const MOCK_SERVICE_INSPECTION_ITEMS: ServiceInspectionItem[] = [
    {
      id: 'item1',
      description: 'Brake Inspection',
      causes: [
        { id: 'cause1', inspectionItemId: 'item1', description: 'Worn Brake Pads'},
        { id: 'cause2', inspectionItemId: 'item1', description: 'Brake Fluid Low' }
      ],
      isUrgent:true,
      vehicleType: VehicleType.SUV
    },
    {
      id: 'item2',
      description: 'Oil Check',
      causes: [
        { id: 'cause3', inspectionItemId: 'item2', description: 'Low Oil Level' }
      ],
      isUrgent:true,
      vehicleType: VehicleType.SUV

    },
    {
      id: 'item3',
      description: 'Tire Pressure Check',
      causes: [
        { id: 'cause4', inspectionItemId: 'item3', description: 'Low Tire Pressure'}
      ],
      isUrgent:true,
      vehicleType: VehicleType.SUV
    },
    {
      id: 'item1',
      description: 'Brake Inspection',
      causes: [
        { id: 'cause1', inspectionItemId: 'item1', description: 'Worn Brake Pads'},
        { id: 'cause2', inspectionItemId: 'item1', description: 'Brake Fluid Low' }
      ],
      isUrgent:true,
      vehicleType: VehicleType.Truck
    },
    {
      id: 'item2',
      description: 'Oil Check',
      causes: [
        { id: 'cause3', inspectionItemId: 'item2', description: 'Low Oil Level' }
      ],
      isUrgent:true,
      vehicleType: VehicleType.Truck

    },
    {
      id: 'item3',
      description: 'Tire Pressure Check',
      causes: [
        { id: 'cause4', inspectionItemId: 'item3', description: 'Low Tire Pressure'}
      ],
      isUrgent:true,
      vehicleType: VehicleType.Truck
    },
  ];
  
  export const MOCK_SERVICE_INSPECTION_CAUSES: ServiceInspectionCause[] = [
    { id: 'cause1', inspectionItemId: 'item1', description: 'Worn Brake Pads'},
    { id: 'cause2', inspectionItemId: 'item1', description: 'Brake Fluid Low'},
    { id: 'cause3', inspectionItemId: 'item2', description: 'Low Oil Level'},
    { id: 'cause4', inspectionItemId: 'item3', description: 'Low Tire Pressure' },
  ];
  
  export const MOCK_INSPECTION_FAILURES: InspectionFailureData[] = [
    {
      inspectionItemId: 'item1',
      inspectionItemCauseId: 'cause1'   
    },
    {
      inspectionItemId: 'item2',
      inspectionItemCauseId: 'cause3',
      
    },
    {
      inspectionItemId: 'item3',
      inspectionItemCauseId: 'cause4',
      
    },
  ];
  