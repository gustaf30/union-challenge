import { IsEnum, IsOptional, IsString, IsDateString } from 'class-validator';
import { TaskStatus } from '../entity/task';

export class UpdateTaskDTO {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsEnum(TaskStatus)
    @IsOptional()
    status?: TaskStatus;

    @IsDateString()
    @IsOptional()  
    dueDate?: string;
}