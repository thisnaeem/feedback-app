"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  HomeIcon,
  SwatchIcon,
  ClipboardDocumentListIcon,
  LightBulbIcon,
  ArchiveBoxIcon,
} from '@heroicons/react/24/outline';

export default function Navigation() {
  const pathname = usePathname();
  
  const navItems = [
    { href: '/', label: 'Dashboard', icon: HomeIcon },
    { href: '/designs', label: 'Designs', icon: SwatchIcon },
    { href: '/tasks', label: 'Tasks', icon: ClipboardDocumentListIcon },
    { href: '/ideas', label: 'Content Ideas', icon: LightBulbIcon },
    { href: '/archive', label: 'Archive', icon: ArchiveBoxIcon },
  ];

  return (
    <nav className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-6">
      <div className="mb-10">
        <div className="relative">
          <Image
            src="/logo.svg"
            alt="RoomCoders Logo"
            width={130}
            height={40}
            className="transition-opacity duration-200 dark:brightness-100 dark:contrast-100 dark:invert-0"
            priority
          />
        </div>
      </div>
      <div className="space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                ${isActive 
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600 dark:text-blue-400' : ''}`} />
              <span className="font-medium">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
} 