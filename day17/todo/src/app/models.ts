export enum Priority {
  Low = 0, Medium, High
}
export interface Task {
  description: string;
  priority: Priority
}

export interface Todo {
  id: string;
  title: string;
  tasks: Task[];
}
