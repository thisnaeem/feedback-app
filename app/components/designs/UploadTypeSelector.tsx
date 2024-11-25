"use client";

import { useState } from 'react';
import { PhotoIcon, ViewColumnsIcon } from '@heroicons/react/24/outline';

interface UploadTypeSelectorProps {
  onSelect: (type: 'single' | 'carousel') => void;
}

export default function UploadTypeSelector({ onSelect }: UploadTypeSelectorProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Choose Upload Type</h2>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => onSelect('single')}
            className="p-6 border-2 border-dashed rounded-xl hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          >
            <PhotoIcon className="w-12 h-12 mx-auto mb-2 text-gray-500" />
            <span className="block text-sm font-medium">Single Image</span>
            <span className="text-xs text-gray-500">Upload one design</span>
          </button>
          
          <button
            onClick={() => onSelect('carousel')}
            className="p-6 border-2 border-dashed rounded-xl hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          >
            <ViewColumnsIcon className="w-12 h-12 mx-auto mb-2 text-gray-500" />
            <span className="block text-sm font-medium">Carousel</span>
            <span className="text-xs text-gray-500">Upload multiple designs</span>
          </button>
        </div>
      </div>
    </div>
  );
} 