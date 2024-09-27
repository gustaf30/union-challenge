import { IsEnum, IsNotEmpty, IsOptional, IsString, IsDateString } from 'class-validator';

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