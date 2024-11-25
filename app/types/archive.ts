export type ArchivedItem = {
  id: string;
  type: 'design' | 'task' | 'idea';
  title: string;
  date: string;
  status?: string;
  imageUrl?: string;
  createdAt: string;
  archivedAt: string;
}; 