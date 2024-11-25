export type Task = {
  id: string;
  title: string;
  priority: 'Low' | 'Medium' | 'High';
  deadline: string;
  createdAt: string;
}; 