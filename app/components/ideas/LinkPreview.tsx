"use client";

import { useState, useEffect } from 'react';
import { TrashIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

interface LinkPreviewProps {
  url: string;
  preview: {
    title: string;
    description: string;
    image?: string;
  } | null;
  onDelete: () => void;
}

export default function LinkPreview({ url, preview, onDelete }: LinkPreviewProps) {
  return (
    <div className="group relative bg-white dark:bg-gray-700 p-3 rounded shadow hover:shadow-md transition-shadow">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div className="flex flex-col gap-2">
          {preview?.image && (
            <img 
              src={preview.image} 
              alt="" 
              className="w-full h-32 object-cover rounded"
            />
          )}
          <div>
            <div className="flex items-start justify-between gap-2">
              <h4 className="font-medium line-clamp-2">{preview?.title || url}</h4>
              <ArrowTopRightOnSquareIcon className="w-4 h-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            {preview?.description && (
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {preview.description}
              </p>
            )}
          </div>
        </div>
      </a>
      <button
        onClick={onDelete}
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <TrashIcon className="w-4 h-4" />
      </button>
    </div>
  );
} 