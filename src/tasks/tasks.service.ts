import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/createTask.dto';
import { GetTaskFilterDto } from './dto/getTaskFilterDto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  findTaskById(id: string): Task {
    return this.tasks.find(task => task.id === id);
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.findTaskById(id);
    task.status = status;
    return task;
  }

  getTaskWithFilter(filterDto: GetTaskFilterDto): Task[] {
    const { status, search } = filterDto;
    if (!status && !search) {
      return this.getAllTasks();
    }
    let tasks = this.tasks;
    if (status) {
      tasks = this.tasks.filter(task => task.status === status);
    }
    if (search) {
      tasks = this.tasks.filter(
        task =>
          task.title.includes(search) || task.description.includes(search),
      );
    }
    return tasks;
  }
}
