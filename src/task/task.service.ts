import { HttpCode, Injectable } from '@nestjs/common';
import { CreateTaskDTO } from './create-task-dto';
import { Task, TaskStatus } from './task';
import { UpdateTaskDTO } from './update-task-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

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

    async findAll(status?: TaskStatus, page?: string, limit?: string): Promise<Task[]> {
        const query = this.taskRepository.createQueryBuilder('task');

        if (status) {
            query.andWhere('task.status = :status', { status });
        }

        return await query.take(parseInt(limit))
                            .skip(parseInt(limit) * parseInt(page) - parseInt(limit))
                            .getMany();
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

    async findByTitle(title: string): Promise<Task[]> {
        const tasks = await this.taskRepository.find({
            where: {
                title: Like(`%${title}%`),
            },
        });
        
        return tasks;
    }    

    async deleteTask(id: string) : Promise<void> {
        this.taskRepository.softDelete(id);
    }
}
