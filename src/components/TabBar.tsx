import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface TabBarProps {
  categories: { name: string; count: number }[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const TabBar: React.FC<TabBarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <nav className="bg-gray-50 border-b border-gray-200 py-2.5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1600px] mx-auto flex items-center gap-3">
        {/* Label MẢNG: */}
        <span className="text-xs font-black text-gray-500 uppercase tracking-wider whitespace-nowrap shrink-0">
          MẢNG:
        </span>

        {/* Horizontal scrollable tab container */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 scroll-smooth">
          {categories.map((cat) => {
            const isSelected = cat.name === selectedCategory;
            return (
              <button
                key={cat.name}
                onClick={() => onSelectCategory(cat.name)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-2xs whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-blue-900 text-white ring-2 ring-blue-900/20'
                    : 'bg-gray-200 hover:bg-gray-300/80 text-gray-700'
                }`}
              >
                <span>{cat.name}</span>

                {/* Badge with count */}
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-300 text-gray-700'
                  }`}
                >
                  {cat.count < 10 ? `0${cat.count}` : cat.count}
                </span>

                {/* Dropdown chevron icon (▼ when closed, ▲ when open) */}
                {isSelected ? (
                  <ChevronUp className="w-3.5 h-3.5 text-white" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};


