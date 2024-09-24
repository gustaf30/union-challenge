import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from './task';

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
}