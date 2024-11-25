"use client";

import { useState } from "react";
import { useTaskStore } from "../../stores/taskStore";
import { TrashIcon } from "@heroicons/react/24/outline";
import TaskViewControls from "./TaskViewControls";

export default function TaskList() {
  const { tasks, deleteTask } = useTaskStore();
  const [view, setView] = useState<"grid" | "list">("list");
  const [columns, setColumns] = useState(3);

  const TaskCard = ({ task }: { task: any }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <h3 className="font-semibold">{task.title}</h3>
          <p className="text-sm text-gray-500">Due: {task.deadline}</p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className={`px-2 py-1 text-xs rounded-full ${
            task.priority === 'High' 
              ? 'bg-red-100 text-red-800' 
              : task.priority === 'Medium'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-green-100 text-green-800'
          }`}>
            {task.priority}
          </span>
          <button
            onClick={() => deleteTask(task.id)}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <TaskViewControls
        view={view}
        columns={columns}
        setView={setView}
        setColumns={setColumns}
      />
      
      {tasks.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No tasks yet. Create one to get started!
        </div>
      ) : view === "list" ? (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{task.title}</h3>
                  <p className="text-sm text-gray-500">Due: {task.deadline}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    task.priority === 'High' 
                      ? 'bg-red-100 text-red-800' 
                      : task.priority === 'Medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {task.priority}
                  </span>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-4`}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
} 