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
    findAll(@Query('status') status?: TaskStatus) : Promise<Task[]> {
        return this.taskService.findAll(status);
    }

    @Get(':id')
    findOne(@Param('id') id: string) : Promise<Task> {
        return this.taskService.findOne(id);
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
