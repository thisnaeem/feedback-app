"use client";

import { useDesignStore } from '../stores/designStore';
import { useTaskStore } from '../stores/taskStore';
import { useIdeaStore } from '../stores/ideaStore';
import { formatDistanceToNow } from 'date-fns';

export default function RecentActivity() {
  const designs = useDesignStore((state) => state.designs) || [];
  const tasks = useTaskStore((state) => state.tasks) || [];
  const ideas = useIdeaStore((state) => state.ideas) || [];

  const formatTimeDistance = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      return 'Invalid date';
    }
  };

  // Combine and sort activities by date
  const activities = [
    ...(Array.isArray(designs) ? designs.map(d => ({
      type: 'design',
      text: `${d.title} ${d.status === 'In Review' ? 'uploaded for review' : `marked as ${d.status}`}`,
      time: d.date || new Date().toISOString()
    })) : []),
    ...(Array.isArray(tasks) ? tasks.map(t => ({
      type: 'task',
      text: `${t.title} ${t.completed ? 'completed' : 'created'}`,
      time: t.date || new Date().toISOString()
    })) : []),
    ...(Array.isArray(ideas) ? ideas.map(i => ({
      type: 'idea',
      text: `New idea added: ${i.title}`,
      time: i.createdAt || new Date().toISOString()
    })) : [])
  ]
  .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
  .slice(0, 5);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3 text-sm">
            <div className="w-2 h-2 mt-1.5 rounded-full bg-blue-500" />
            <div>
              <p className="text-gray-800 dark:text-gray-200">{activity.text}</p>
              <p className="text-gray-500 dark:text-gray-400 text-xs">
                {formatTimeDistance(activity.time)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 