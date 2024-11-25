"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useDesignStore } from '../../stores/designStore';
import { format, startOfWeek, addDays } from 'date-fns';

export default function DesignMetrics() {
  const designs = useDesignStore((state) => state.designs);
  
  // Calculate designs per day for the last week
  const startDate = startOfWeek(new Date());
  const weekData = Array.from({ length: 7 }).map((_, index) => {
    const date = addDays(startDate, index);
    const count = designs.filter(design => 
      new Date(design.date).toDateString() === date.toDateString()
    ).length;
    
    return {
      name: format(date, 'EEE'),
      designs: count
    };
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-6">Design Activity</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weekData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Bar dataKey="designs" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 