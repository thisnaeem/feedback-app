"use client";

import { useState } from 'react';
import { PlusIcon } from "@heroicons/react/24/outline";

interface LinkCreateProps {
  columnId: string;
  onAdd: (columnId: string, url: string) => void;
}

export default function LinkCreate({ columnId, onAdd }: LinkCreateProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onAdd(columnId, url.trim());
      setUrl('');
      setIsAdding(false);
    }
  };

  return isAdding ? (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Paste link here"
        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        autoFocus
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add
        </button>
        <button
          type="button"
          onClick={() => setIsAdding(false)}
          className="px-3 py-1 text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      </div>
    </form>
  ) : (
    <button
      onClick={() => setIsAdding(true)}
      className="w-full p-2 text-gray-500 hover:text-gray-700 border-2 border-dashed rounded flex items-center justify-center gap-2"
    >
      <PlusIcon className="w-4 h-4" />
      Add Link
    </button>
  );
} 