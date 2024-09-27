import { IsEnum, IsOptional, IsString, IsDateString, MaxLength, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../entity/task.entity';

export class UpdateTaskDTO {
    @IsString()
    @IsNotEmpty()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsEnum(TaskStatus)
    @IsOptional()
    status?: TaskStatus;

    @IsOptional()
    @IsDateString()  
    dueDate?: string;
}