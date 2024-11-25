"use client";

import { ViewColumnsIcon, ListBulletIcon } from "@heroicons/react/24/outline";

type ViewControlsProps = {
  view: "grid" | "list";
  columns: number;
  setView: (view: "grid" | "list") => void;
  setColumns: (columns: number) => void;
};

export default function TaskViewControls({ view, columns, setView, setColumns }: ViewControlsProps) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        <button
          onClick={() => setView("grid")}
          className={`p-2 rounded ${
            view === "grid"
              ? "bg-white dark:bg-gray-700 shadow"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <ViewColumnsIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => setView("list")}
          className={`p-2 rounded ${
            view === "list"
              ? "bg-white dark:bg-gray-700 shadow"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <ListBulletIcon className="w-5 h-5" />
        </button>
      </div>
      {view === "grid" && (
        <select
          value={columns}
          onChange={(e) => setColumns(Number(e.target.value))}
          className="px-3 py-2 bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700"
        >
          <option value={3}>3 Columns</option>
          <option value={6}>6 Columns</option>
          <option value={8}>8 Columns</option>
        </select>
      )}
    </div>
  );
} 