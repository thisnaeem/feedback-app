"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import DesignCarousel from "./DesignCarousel";

interface DesignPreviewProps {
  design: {
    type: 'single' | 'carousel';
    images: string[];
    imageUrl?: string;
    title: string;
  };
  onClose: () => void;
}

export default function DesignPreview({ design, onClose }: DesignPreviewProps) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="relative w-full max-w-5xl">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300"
        >
          <XMarkIcon className="w-8 h-8" />
        </button>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
          {design.type === 'carousel' ? (
            <DesignCarousel images={design.images} />
          ) : (
            <img
              src={design.imageUrl}
              alt={design.title}
              className="w-full h-auto max-h-[80vh] object-contain"
            />
          )}
        </div>
      </div>
    </div>
  );
} 