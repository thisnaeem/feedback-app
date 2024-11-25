export type Design = {
  id: string;
  title: string;
  status: 'Draft' | 'In Review' | 'Approved' | 'Rejected';
  date: string;
  imageUrl?: string;
  createdAt: string;
}; 