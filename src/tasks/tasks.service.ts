import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { getTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskStatus } from './task-status.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  getTasks(filterDto: getTaskFilterDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto);
  }

  async getTaskById(id: number) {
    const found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`task with id ${id} not found`);
    }
    return found;
  }

  async cretaeTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`task with id ${id} not found`);
    }
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    task.save();

    return task;
  }
}
