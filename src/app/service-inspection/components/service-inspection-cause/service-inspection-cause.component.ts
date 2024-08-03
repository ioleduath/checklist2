import { Component, Input } from '@angular/core';
import { ServiceInspectionCauseForm } from '../../classes/serviceInspectionCauseForm';

@Component({
  selector: 'app-service-inspection-cause',
  templateUrl: './service-inspection-cause.component.html',
  styleUrls: ['./service-inspection-cause.component.scss'],
})
export class ServiceInspectionCauseComponent {
  @Input() causeForm!: ServiceInspectionCauseForm;
  @Input() isViewOnly: boolean = false;
}
