import { TaskStatus } from './task-status.enum';

export interface Task {
  id: any;
  title: string;
  description: string;
  status: TaskStatus;
}
