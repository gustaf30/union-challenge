import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Task, TaskStatus } from './task';
import { TaskService } from './task.service';
import { CreateTaskDTO } from './create-task-dto';
import { UpdateTaskDTO } from './update-task-dto';

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TaskService) {}

    @Post()
    create(@Body() createTaskDTO: CreateTaskDTO) : Promise<Task> {
        return this.taskService.createTask(createTaskDTO);
    }

    @Get()
    findAll(@Query('status') status?: TaskStatus, @Query('page') page?: string, @Query('limit') limit?: string, @Query('overdue') overdue?: string) : Promise<Task[]> {
        const overdueBool = overdue === 'true' ? true : overdue === 'false' ? false : undefined;
        return this.taskService.findAll(status, page, limit, overdueBool);
    }

    @Get(':id')
    findOne(@Param('id') id: string) : Promise<Task> {
        return this.taskService.findOne(id);
    }

    @Get('search/:title')
    findByTitle(@Param('title') title: string) : Promise<Task[]> {
        return this.taskService.findByTitle(title);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTaskDTO : UpdateTaskDTO) {
        return this.taskService.update(id, updateTaskDTO);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.taskService.deleteTask(id);
    }
}
