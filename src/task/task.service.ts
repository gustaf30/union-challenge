import { HttpCode, Injectable } from '@nestjs/common';
import { CreateTaskDTO } from './create-task-dto';
import { Task, TaskStatus } from './task';
import { UpdateTaskDTO } from './update-task-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
    ) {}

    async update(id: string, updateTaskDTO: UpdateTaskDTO) {
        const task = await this.taskRepository.findOne({ where: { id } });
        task.updatedAt = new Date();

        if (!task) {
            throw new Error('Task not found');
        }
    
        Object.assign(task, updateTaskDTO);

        return await this.taskRepository.save(task);
    }

    findOne(id: string): Promise<Task> {
        return this.taskRepository.findOne({ where: { id } });
    }

    async findAll(status?: TaskStatus): Promise<Task[]> {
        const query = this.taskRepository.createQueryBuilder('task');

        if (status) {
            query.andWhere('task.status = :status', { status });
        }

        return await query.getMany();
    }

    async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
        const task = this.taskRepository.create({
            title: createTaskDTO.title,
            description: createTaskDTO.description,
            status: TaskStatus.PENDING,
        });

        await this.taskRepository.save(task);
        return task;
    }

    async deleteTask(id: string) : Promise<void> {
        this.taskRepository.softDelete(id);
    }
}
