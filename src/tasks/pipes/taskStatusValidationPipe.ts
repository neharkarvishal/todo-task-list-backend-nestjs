/* tslint:disable:no-console */
import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task.model';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatses = [
    TaskStatus.OPEN,
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
  ];

  private isStatusIsValid(status: any) {
    // indexOf() returns `-1` if status does not exist in allowedStatus array.
    const index = this.allowedStatses.indexOf(status);
    return index !== -1;
  }

  transform(value: any) {
    value = value.toUpperCase();
    if (!this.isStatusIsValid(value)) {
      throw new BadRequestException(`'${value}' is an invalid status.`);
    }
    return value;
  }
}
