"use client";

import { useState } from "react";

export default function ArchiveFilter() {
  const [filters, setFilters] = useState({
    type: "all",
    date: "all",
  });

  const types = ["all", "design", "task", "idea"];
  const dateRanges = ["all", "last-week", "last-month", "last-year"];

  return (
    <div className="flex gap-4">
      <select
        value={filters.type}
        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        className="px-3 py-2 bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700"
      >
        {types.map((type) => (
          <option key={type} value={type}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </option>
        ))}
      </select>

      <select
        value={filters.date}
        onChange={(e) => setFilters({ ...filters, date: e.target.value })}
        className="px-3 py-2 bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700"
      >
        {dateRanges.map((range) => (
          <option key={range} value={range}>
            {range.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
          </option>
        ))}
      </select>
    </div>
  );
} 