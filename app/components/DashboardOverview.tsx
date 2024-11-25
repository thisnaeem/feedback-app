"use client";

import { useDesignStore } from '../stores/designStore';
import { useTaskStore } from '../stores/taskStore';
import { useIdeaStore } from '../stores/ideaStore';
import { startOfWeek, endOfWeek } from 'date-fns';

export default function DashboardOverview() {
  const designs = useDesignStore((state) => state.designs) || [];
  const tasks = useTaskStore((state) => state.tasks) || [];
  const ideas = useIdeaStore((state) => state.ideas) || [];

  // Get the start and end of the current week
  const weekStart = startOfWeek(new Date());
  const weekEnd = endOfWeek(new Date());

  const stats = [
    { 
      label: 'Pending Reviews', 
      value: designs.filter(d => d.status === 'In Review').length
    },
    { 
      label: 'Active Tasks', 
      value: tasks.filter(t => !t.completed).length
    },
    { 
      label: 'New Ideas', 
      value: ideas.length
    },
    { 
      label: 'Completed This Week', 
      value: tasks.filter(t => {
        const taskDate = new Date(t.date);
        return t.completed && 
               taskDate >= weekStart && 
               taskDate <= weekEnd;
      }).length
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
            <div className="text-3xl font-bold mt-2">{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
} 