import React from 'react';
import { Layers, MousePointerClick } from 'lucide-react';

interface CategoryHeaderProps {
  categoryName: string;
  count: number;
}

export const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  categoryName,
  count,
}) => {
  return (
    <div className="bg-white border-b border-gray-200 py-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        {/* Left: Icon Layer + Mảng: [Tên mảng] ([số lượng] quy trình) */}
        <div className="flex items-center gap-2 text-base text-gray-700">
          <div className="p-1.5 rounded-md bg-blue-50 text-blue-900 border border-blue-200 shrink-0">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <span>Mảng: </span>
            <span className="text-blue-900 font-bold">{categoryName}</span>{' '}
            <span className="text-gray-500 text-xs sm:text-sm font-normal">
              ({count} quy trình)
            </span>
          </div>
        </div>

        {/* Right: Hint */}
        <div className="flex items-center gap-1.5 text-xs text-gray-400 italic">
          <MousePointerClick className="w-3.5 h-3.5 text-gray-400" />
          <span>Click chọn quy trình bên dưới để tra cứu</span>
        </div>
      </div>
    </div>
  );
};


