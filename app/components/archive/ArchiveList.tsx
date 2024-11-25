"use client";

import { useArchiveStore } from "../../stores/archiveStore";    
import { TrashIcon } from "@heroicons/react/24/outline";

export default function ArchiveList() {
  const { items, removeFromArchive } = useArchiveStore();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="mt-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow divide-y divide-gray-200 dark:divide-gray-700">
        {items.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No archived items yet
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  {item.type === 'design' && item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <div className="flex gap-2 mt-1">
                      <span className="text-sm text-gray-500 capitalize">
                        Type: {item.type}
                      </span>
                      {item.status && (
                        <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">
                    {new Date(item.archivedAt).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => removeFromArchive(item.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 