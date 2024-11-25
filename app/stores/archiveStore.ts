import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ArchivedItem } from '../types/archive';

type ArchiveStore = {
  items: ArchivedItem[];
  addToArchive: (item: Omit<ArchivedItem, 'archivedAt'>) => void;
  removeFromArchive: (id: string) => void;
};

export const useArchiveStore = create<ArchiveStore>()(
  persist(
    (set) => ({
      items: [],
      addToArchive: (item) =>
        set((state) => {
          const newItems = [
            { ...item, archivedAt: new Date().toISOString() },
            ...state.items,
          ].slice(0, 50);
          
          return { items: newItems };
        }),
      removeFromArchive: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
    }),
    {
      name: 'archive-storage',
    }
  )
); 