export interface Idea {
  id: string;
  url: string;
  preview: {
    title: string;
    description: string;
    image?: string;
  } | null;
  createdAt: string;
}

export interface IdeaColumn {
  id: string;
  title: string;
  ideas: Idea[];
} 