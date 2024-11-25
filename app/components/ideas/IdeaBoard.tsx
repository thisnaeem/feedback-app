"use client";

import { useState } from "react";
import { useIdeaStore } from "../../stores/ideaStore";
import { TrashIcon } from "@heroicons/react/24/outline";
import IdeaCreate from "./IdeaCreate";
import LinkPreview from "./LinkPreview";

export default function IdeaBoard() {
  const { columns, addColumn, deleteColumn, addIdea, deleteIdea, moveIdea } = useIdeaStore();
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const [draggedIdea, setDraggedIdea] = useState<{ id: string; columnId: string } | null>(null);

  const handleAddColumn = (e: React.FormEvent) => {
    e.preventDefault();
    if (newColumnTitle.trim()) {
      addColumn(newColumnTitle.trim());
      setNewColumnTitle("");
    }
  };

  const handleDrop = (columnId: string) => {
    if (draggedIdea && draggedIdea.columnId !== columnId) {
      moveIdea(draggedIdea.columnId, columnId, draggedIdea.id);
    }
    setDraggedIdea(null);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleAddColumn} className="flex gap-2">
        <input
          type="text"
          value={newColumnTitle}
          onChange={(e) => setNewColumnTitle(e.target.value)}
          placeholder="Enter column title"
          className="flex-1 max-w-xs p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add Column
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {columns.map((column) => (
          <div
            key={column.id}
            className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(column.id)}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">{column.title}</h3>
              <button
                onClick={() => deleteColumn(column.id)}
                className="text-gray-400 hover:text-red-500"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              {column.ideas.map((idea) => (
                <div
                  key={idea.id}
                  draggable
                  onDragStart={() => setDraggedIdea({ id: idea.id, columnId: column.id })}
                >
                  <LinkPreview
                    url={idea.url}
                    preview={idea.preview}
                    onDelete={() => deleteIdea(column.id, idea.id)}
                  />
                </div>
              ))}
              <IdeaCreate columnId={column.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 