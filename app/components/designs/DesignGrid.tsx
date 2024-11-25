"use client";

import { useState } from "react";
import { useDesignStore } from "../../stores/designStore";
import { TrashIcon, EllipsisHorizontalIcon, ViewColumnsIcon, PhotoIcon } from "@heroicons/react/24/outline";
import DesignViewControls from "./DesignViewControls";
import { useArchiveStore } from "../../stores/archiveStore";    
import DesignCarousel from "./DesignCarousel";
import DesignPreview from "./DesignPreview";
import { usePersistedViewSettings } from '../../hooks/usePersistedViewSettings';

interface Design {
  id: string;
  title: string;
  status: string;
  date: string;
  type: 'single' | 'carousel';
  images: string[];
  imageUrl?: string;
}

const gridColumnClasses = {
  3: 'grid-cols-1 md:grid-cols-3',
  6: 'grid-cols-1 md:grid-cols-6',
  9: 'grid-cols-1 md:grid-cols-9'
} as const;

export default function DesignGrid() {
  const { designs, deleteDesign, updateDesignStatus } = useDesignStore();
  const addToArchive = useArchiveStore((state) => state.addToArchive);
  const [{ view, columns }, setViewSettings] = usePersistedViewSettings();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);

  const statusColors = {
    'Draft': 'bg-gray-100 text-gray-800',
    'In Review': 'bg-yellow-100 text-yellow-800',
    'Approved': 'bg-green-100 text-green-800',
    'Rejected': 'bg-red-100 text-red-800',
  };

  const statusOptions = ['Draft', 'In Review', 'Approved', 'Rejected'];

  const handleArchive = (design: Design) => {
    addToArchive(design);
    deleteDesign(design.id);
    setActiveMenu(null);
  };

  const handleViewChange = (newView: "grid" | "list") => {
    setViewSettings(prev => ({ ...prev, view: newView }));
  };

  const handleColumnsChange = (newColumns: number) => {
    setViewSettings(prev => ({ ...prev, columns: newColumns }));
  };

  const DesignCard = ({ design }: { design: Design }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="relative">
        <div 
          onClick={() => setSelectedDesign(design)}
          className="cursor-pointer"
        >
          <div className="absolute top-2 left-2 z-10 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium">
            {design.type === 'carousel' ? (
              <>
                <ViewColumnsIcon className="w-4 h-4" />
                <span>Carousel Post</span>
              </>
            ) : (
              <>
                <PhotoIcon className="w-4 h-4" />
                <span>Single Post</span>
              </>
            )}
          </div>

          {design.type === 'carousel' ? (
            <DesignCarousel images={design.images} />
          ) : (
            design.imageUrl ? (
              <img
                src={design.imageUrl}
                alt={design.title}
                className="aspect-video object-cover rounded-t-lg"
              />
            ) : (
              <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-t-lg" />
            )
          )}
        </div>

        <div className="absolute top-2 right-2">
          <button
            onClick={() => setActiveMenu(activeMenu === design.id ? null : design.id)}
            className="p-1 rounded-full bg-white/80 hover:bg-white shadow"
          >
            <EllipsisHorizontalIcon className="w-5 h-5" />
          </button>

          {activeMenu === design.id && (
            <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700">
              <select
                value={design.status}
                onChange={(e) => updateDesignStatus(design.id, e.target.value)}
                className="w-full p-2 text-sm border-b dark:border-gray-700"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <button
                onClick={() => handleArchive(design)}
                className="w-full p-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
              >
                <TrashIcon className="w-4 h-4" />
                Archive Design
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium truncate">{design.title}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${statusColors[design.status as keyof typeof statusColors]}`}>
            {design.status}
          </span>
        </div>
        <p className="text-sm text-gray-500">{new Date(design.date).toLocaleDateString()}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 mt-6">
      <DesignViewControls
        view={view}
        columns={columns}
        setView={handleViewChange}
        setColumns={handleColumnsChange}
      />

      <div 
        className={`grid gap-6 ${
          view === "grid"
            ? gridColumnClasses[columns as keyof typeof gridColumnClasses]
            : "grid-cols-1"
        }`}
      >
        {designs.map((design) => (
          <DesignCard key={design.id} design={design} />
        ))}
      </div>

      {selectedDesign && (
        <DesignPreview
          design={selectedDesign}
          onClose={() => setSelectedDesign(null)}
        />
      )}
    </div>
  );
} 