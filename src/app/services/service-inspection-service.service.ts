import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ServiceInspectionCauseForm } from '../service-inspection/classes/serviceInspectionCauseForm';
import { ServiceInspectionForm } from '../service-inspection/classes/serviceInspectionForm';
import { ServiceInspectionItemForm } from '../service-inspection/classes/serviceInspectionItemForm';
import { ServiceErrorCode } from '../models/serviceErrorCode';
import { ServiceInspectionItem } from '../models/serviceInspectionItem.model';
import { ServiceInspectionCause } from '../models/serviceInspectionCause.model';
import { InspectionFailureData } from '../models/inspectionFailureData.model';


@Injectable({
  providedIn: 'root',
})
export class ServiceInspectionService {
  private _hasUrgentError = new BehaviorSubject<boolean>(false);
  public hasUrgentError$ = this._hasUrgentError.asObservable();

  createInspectionForms(
    inspectionItems: ServiceInspectionItem[],
    inspectionItemCauses: ServiceInspectionCause[],
    failureDataList: InspectionFailureData[]
  ): ServiceInspectionForm {

    const inspectionItemForms = inspectionItems.map((item) => {
      const causes = inspectionItemCauses
        .filter((cause) => cause.inspectionItemId === item.id)
        .map((cause) => {
          const failureData = failureDataList.find(
            (failure) => failure.inspectionItemCauseId === cause.id
          );
          return new ServiceInspectionCauseForm(
            cause.id,
            cause.description,
            !!failureData,
            item.isUrgent);
        });

      const errorCode = failureDataList.some(
        (failure) => failure.inspectionItemId === item.id
      )
        ? ServiceErrorCode.NonCompliant
        : ServiceErrorCode.Compliant;

      return new ServiceInspectionItemForm(
        item.id,
        item.description,
        errorCode,
        causes,
        item.isUrgent
      );
    });

    return new ServiceInspectionForm(inspectionItemForms);
  }

  setupUrgentErrorDetection(formGroup: ServiceInspectionForm): void {
    formGroup.inspectionItems.controls.forEach((itemControl) => {
      const itemForm = itemControl as ServiceInspectionItemForm;

      itemForm.causes.valueChanges.subscribe(() => {
        this.updateUrgentErrorStatus(formGroup);
      });
    });
  }

  updateUrgentErrorStatus(formGroup: ServiceInspectionForm): void {
    const hasUrgentError = formGroup.inspectionItems.controls.some(
      (itemControl) => {
        const itemForm = itemControl as ServiceInspectionItemForm;
        return itemForm.hasUrgentFault();
      }
    );

    this._hasUrgentError.next(hasUrgentError);
  }

  mapFormDataToServiceFailures(formGroup: ServiceInspectionForm): any[] {
    return formGroup.inspectionItems.controls.reduce((acc, itemControl) => {
      const itemForm = itemControl as ServiceInspectionItemForm;
      const failures = itemForm.mapToServiceFailureData();
      return acc.concat(failures);
    }, []);
  }
}
