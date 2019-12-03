import { TaskStatus } from '../task.model';
import { IsEmpty, IsIn, IsNotEmpty, IsOptional } from 'class-validator';

export class GetTaskFilterDto {
  @IsOptional()
  @IsIn([TaskStatus.DONE, TaskStatus.OPEN, TaskStatus.IN_PROGRESS])
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
