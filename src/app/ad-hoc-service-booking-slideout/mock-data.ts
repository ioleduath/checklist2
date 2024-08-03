// mock-static-data.ts

export enum VehicleType {
  SUV = 1,
  Sedan,
  Truck,
  Motorbike,
}

export interface VehicleTypeModel {
    name: string;
    id: VehicleType;
  }
  
  export interface LocationModel {
    name: string;
    id: string;
  }
  
  export interface VINNumberModel {
    vinNumber: string;
    id: string;
  }
  
  export const MOCK_VEHICLE_TYPES: VehicleTypeModel[] = [
    { name: 'SUV', id: VehicleType.SUV },
    { name: 'Sedan', id: VehicleType.Sedan },
    { name: 'Truck', id: VehicleType.Truck },
    { name: 'Motorbike', id: VehicleType.Motorbike },
  ];
  
  export const MOCK_LOCATIONS: LocationModel[] = [
    { name: 'Location A', id: 'locationA' },
    { name: 'Location B', id: 'locationB' },
  ];
  
  export const MOCK_VIN_NUMBERS: VINNumberModel[] = [
    { vinNumber: 'VIN 001', id: '001' },
    { vinNumber: 'VIN 002', id: '002' },
  ];
  
  // export const MOCK_INSPECTION_ITEMS = [
  //   { id: 'item1', description: 'Brake Inspection', inspectionItemId: '001', manualCause: '' },
  //   { id: 'item2', description: 'Oil Check', inspectionItemId: '002', manualCause: '' },
  // ];
  
  // export const MOCK_INSPECTION_CAUSES = [
  //   { id: 'cause1', inspectionItemId: '001', causeDescription: 'Worn Brake Pads' },
  //   { id: 'cause2', inspectionItemId: '002', causeDescription: 'Low Oil Level' },
  // ];


  
  export const VehicleTypeDisplayNameMap = new Map<VehicleType, string>([
    [VehicleType.SUV, 'SUV'],
    [VehicleType.Sedan, 'Sedan'],
    [VehicleType.Truck, 'Truck'],
    [VehicleType.Motorbike, 'Motorbike'],
  ]);

  
  export const VehicleTypeDisplayImageMap = new Map<VehicleType, string>([
    [VehicleType.SUV, '/assets/images/suv.png'],
    [VehicleType.Sedan, '/assets/images/sedan.png'],
    [VehicleType.Truck, '/assets/images/truck.png'],
    [VehicleType.Motorbike, '/assets/images/motorbike.png'],
  ]);

  

  
  