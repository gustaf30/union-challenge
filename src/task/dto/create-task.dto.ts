import { IsNotEmpty, IsOptional, IsString, IsDateString, MaxLength } from 'class-validator';

export class CreateTaskDTO {
    @IsNotEmpty()
    @IsString()
    title: string;
    
    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsDateString() 
    dueDate?: string;
}