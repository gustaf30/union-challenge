import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { Task, TaskStatus } from '../entity/task.entity';
import { TaskService } from '../service/task.service';
import { CreateTaskDTO } from '../dto/create-task.dto';
import { UpdateTaskDTO } from '../dto/update-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TaskService) {}

    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(@Body() createTaskDTO: CreateTaskDTO) : Promise<Task> {
        return this.taskService.createTask(createTaskDTO);
    }

    @HttpCode(HttpStatus.ACCEPTED)
    @Get()
    findAll(@Query('status') status?: TaskStatus,  @Query('overdue') overdue?: string, @Query('page') page?: string, @Query('limit') limit?: string) : Promise<Task[]> {
        const overdueBool = overdue === 'true' ? true : overdue === 'false' ? false : undefined;
        return this.taskService.findAll(status, overdueBool, page, limit);
    }

    @HttpCode(HttpStatus.ACCEPTED)
    @Get(':id')
    findOne(@Param('id') id: string) : Promise<Task> {
        return this.taskService.findOne(id);
    }

    @HttpCode(HttpStatus.ACCEPTED)
    @Get('search/:title')
    findByTitle(@Param('title') title: string) : Promise<Task[]> {
        return this.taskService.findByTitle(title);
    }

    @HttpCode(HttpStatus.ACCEPTED)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTaskDTO : UpdateTaskDTO) {
        return this.taskService.update(id, updateTaskDTO);
    }

    @HttpCode(HttpStatus.ACCEPTED)
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.taskService.deleteTask(id);
    }
}
