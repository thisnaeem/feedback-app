import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Idea, IdeaColumn } from '../types/idea';    

type IdeaStore = {
  columns: IdeaColumn[];
  addColumn: (title: string) => void;
  deleteColumn: (columnId: string) => void;
  addIdea: (columnId: string, idea: Omit<Idea, 'id' | 'createdAt'>) => void;
  deleteIdea: (columnId: string, ideaId: string) => void;
  moveIdea: (fromColumnId: string, toColumnId: string, ideaId: string) => void;
};

export const useIdeaStore = create<IdeaStore>()(
  persist(
    (set) => ({
      columns: [],
      addColumn: (title) =>
        set((state) => ({
          columns: [...state.columns, { id: crypto.randomUUID(), title, ideas: [] }],
        })),
      deleteColumn: (columnId) =>
        set((state) => ({
          columns: state.columns.filter((col) => col.id !== columnId),
        })),
      addIdea: (columnId, idea) =>
        set((state) => ({
          columns: state.columns.map((col) =>
            col.id === columnId
              ? {
                  ...col,
                  ideas: [
                    ...col.ideas,
                    { ...idea, id: crypto.randomUUID(), createdAt: new Date().toISOString() },
                  ],
                }
              : col
          ),
        })),
      deleteIdea: (columnId, ideaId) =>
        set((state) => ({
          columns: state.columns.map((col) =>
            col.id === columnId
              ? { ...col, ideas: col.ideas.filter((idea) => idea.id !== ideaId) }
              : col
          ),
        })),
      moveIdea: (fromColumnId, toColumnId, ideaId) =>
        set((state) => {
          const fromColumn = state.columns.find((col) => col.id === fromColumnId);
          const idea = fromColumn?.ideas.find((i) => i.id === ideaId);
          if (!fromColumn || !idea) return state;

          return {
            columns: state.columns.map((col) => {
              if (col.id === fromColumnId) {
                return { ...col, ideas: col.ideas.filter((i) => i.id !== ideaId) };
              }
              if (col.id === toColumnId) {
                return { ...col, ideas: [...col.ideas, idea] };
              }
              return col;
            }),
          };
        }),
    }),
    {
      name: 'idea-storage',
    }
  )
); 