import { IsEnum, IsNotEmpty, IsOptional, IsString, IsDateString } from 'class-validator';
import { TaskStatus } from '../entity/task';

export class CreateTaskDTO {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description?: string;

    @IsDateString()
    @IsOptional() 
    dueDate?: string;
}