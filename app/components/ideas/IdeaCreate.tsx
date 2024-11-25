"use client";

import { useState } from "react";
import { useIdeaStore } from "../../stores/ideaStore";
import { PlusIcon } from "@heroicons/react/24/outline";

interface IdeaCreateProps {
  columnId: string;
}

export default function IdeaCreate({ columnId }: IdeaCreateProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const addIdea = useIdeaStore((state) => state.addIdea);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      setIsLoading(true);
      try {
        const response = await fetch('/api/link-preview', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: url.trim() })
        });
        
        const { preview } = await response.json();
        
        addIdea(columnId, { 
          url: url.trim(),
          preview
        });
        
        setUrl("");
        setIsOpen(false);
      } catch (error) {
        console.error('Error fetching preview:', error);
        addIdea(columnId, { 
          url: url.trim(),
          preview: null
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full p-2 text-gray-500 hover:text-gray-700 flex items-center justify-center gap-1 rounded-lg border-2 border-dashed"
        >
          <PlusIcon className="w-4 h-4" />
          Add Link
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste link here"
            className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
            required
            disabled={isLoading}
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-3 py-1 text-gray-600 hover:text-gray-800"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Add'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
} 