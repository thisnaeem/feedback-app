import { useState, useEffect } from 'react';

interface ViewSettings {
  view: "grid" | "list";
  columns: number;
}

export function usePersistedViewSettings() {
  const [settings, setSettings] = useState<ViewSettings>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('designViewSettings');
      return saved ? JSON.parse(saved) : { view: "grid", columns: 3 };
    }
    return { view: "grid", columns: 3 };
  });

  useEffect(() => {
    localStorage.setItem('designViewSettings', JSON.stringify(settings));
  }, [settings]);

  return [settings, setSettings] as const;
} 