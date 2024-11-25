import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Design } from '../types/design';    

type DesignStore = {
  designs: Design[];
  addDesign: (design: Omit<Design, 'id' | 'createdAt'>) => void;
  deleteDesign: (id: string) => void;
  updateDesignStatus: (id: string, status: Design['status']) => void;
};

export const useDesignStore = create<DesignStore>()(
  persist(
    (set) => ({
      designs: [],
      addDesign: (design) =>
        set((state) => ({
          designs: [...state.designs, {
            ...design,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
          }],
        })),
      deleteDesign: (id) =>
        set((state) => ({
          designs: state.designs.filter((design) => design.id !== id),
        })),
      updateDesignStatus: (id, status) =>
        set((state) => ({
          designs: state.designs.map((design) =>
            design.id === id ? { ...design, status } : design
          ),
        })),
    }),
    {
      name: 'design-storage',
    }
  )
); 