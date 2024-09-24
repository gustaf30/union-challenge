import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Task, TaskStatus } from '../model/task';

export class UpdatedTaskDTO {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsEnum(TaskStatus)
    @IsOptional()
    status?: TaskStatus;
}