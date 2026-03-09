export type TaskCategory = '工作' | '学习' | '生活' | '项目';

export type TaskPriority = '高' | '中' | '低';

export interface Task {
  id: string;
  title: string;
  category: TaskCategory;
  priority: TaskPriority;
  dueDate?: Date | null;
  completed: boolean;
  createdAt: Date;
}
