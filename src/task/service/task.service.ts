import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDTO } from '../dto/create-task.dto';
import { Task, TaskStatus } from '../entity/task.entity';
import { UpdateTaskDTO } from '../dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

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
            throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
        }
    
        Object.assign(task, updateTaskDTO);

        try {
            await this.taskRepository.save(task);
            return task;
        } catch {
            throw new HttpException('Failed to update the task', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async findOne(id: string): Promise<Task> {
        try {
            const task = await this.taskRepository.findOne({ where: { id } });
            return task;
        } catch {
            throw new HttpException('Could not find this id', HttpStatus.NOT_FOUND)
        }
    }

    async findAll(status?: TaskStatus, overdue?: boolean, page?: string, limit?: string): Promise<Task[]> {
        const query = this.taskRepository.createQueryBuilder('task');

        if (!page && limit) throw new HttpException('Bad URL', HttpStatus.BAD_REQUEST);
        if (page && !limit) throw new HttpException('Bad URL', HttpStatus.BAD_REQUEST);

        if (status) query.andWhere('task.status = :status', { status });

        if(overdue == undefined) {
            try {
                const tasks = await query.getMany();
                return tasks;
            } catch (error) {
                throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }

        if (overdue) {
            query.andWhere('task.dueDate < :now', { now: new Date() });
        }
        else {
            query.andWhere(('task.dueDate >= :now OR task.dueDate IS NULL'), { now: new Date() });
        }

        if(!page) {
            try {
                const tasks = await query.getMany();
                return tasks;
            } catch (error) {
                throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }

        try {
            const tasks = await query.take(parseInt(limit))
                                        .skip(parseInt(limit) * parseInt(page) - parseInt(limit))
                                        .getMany();
            return tasks;
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
        const task = this.taskRepository.create({
            title: createTaskDTO.title,
            description: createTaskDTO.description,
            status: TaskStatus.PENDING,
            dueDate: createTaskDTO.dueDate,
        });

        if (!task) throw new HttpException('Failed to handle the user information given', HttpStatus.NOT_ACCEPTABLE)
        
        try {
            await this.taskRepository.save(task);
            return task;
        } catch (error) {
            throw new HttpException('Failed to create task', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async findByTitle(title: string): Promise<Task[]> {
        try {
            const tasks = await this.taskRepository.find({
                where: {
                    title: ILike(`%${title}%`),
                },
            });

            return tasks;
        } catch {
            throw new HttpException('Failed to search by the given title', HttpStatus.NOT_ACCEPTABLE)
        }
    }    

    async deleteTask(id: string) : Promise<void> {
        try {
            this.taskRepository.softDelete(id);
        } catch {
            throw new HttpException('Failed to delete task', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
