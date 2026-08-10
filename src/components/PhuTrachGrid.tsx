import React from 'react';
import { User, SearchX, Plus } from 'lucide-react';
import { QuyTrinhItem } from '../types';
import { QuyTrinhCard } from './QuyTrinhCard';

interface PhuTrachGridProps {
  items: QuyTrinhItem[];
  selectedProcedure?: QuyTrinhItem | null;
  onSelectProcedure: (item: QuyTrinhItem) => void;
  onEditProcedure: (item: QuyTrinhItem, e: React.MouseEvent) => void;
  onDeleteProcedure: (item: QuyTrinhItem, e: React.MouseEvent) => void;
  onOpenAddModal: () => void;
  searchTerm?: string;
}

export const PhuTrachGrid: React.FC<PhuTrachGridProps> = ({
  items,
  selectedProcedure,
  onSelectProcedure,
  onEditProcedure,
  onDeleteProcedure,
  onOpenAddModal,
  searchTerm,
}) => {
  if (items.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center my-6 max-w-xl mx-auto shadow-xs">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mx-auto mb-3">
          <SearchX className="w-6 h-6" />
        </div>
        <h3 className="text-base font-semibold text-gray-800 mb-1">
          Không tìm thấy quy trình phù hợp
        </h3>
        <p className="text-xs text-gray-500 mb-4">
          {searchTerm
            ? `Không có kết quả nào khớp với từ khóa "${searchTerm}"`
            : 'Mảng này hiện chưa có quy trình nào.'}
        </p>
        <button
          onClick={onOpenAddModal}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-900 text-white rounded-full text-xs font-semibold hover:bg-blue-950 transition-colors cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Tạo quy trình mới</span>
        </button>
      </div>
    );
  }

  // Group items by "phuTrach"
  const groupedData: Record<string, QuyTrinhItem[]> = {};
  items.forEach((item) => {
    const groupName = item.phuTrach?.trim() || 'Chưa phân công';
    if (!groupedData[groupName]) {
      groupedData[groupName] = [];
    }
    groupedData[groupName].push(item);
  });


  const groupKeys = Object.keys(groupedData);

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto">
      {/* Responsive grid matching layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
        {groupKeys.map((phuTrachName) => {
          const groupProcedures = groupedData[phuTrachName];

          return (
            <div
              key={phuTrachName}
              className="bg-gray-50/80 border border-gray-200 rounded-lg p-4 flex flex-col gap-3 shadow-2xs"
            >
              {/* Group Header matching Professional Polish specification */}
              <div className="flex items-center justify-between pb-2 border-b-2 border-blue-900">
                <div className="flex items-center gap-2 min-w-0">
                  <User className="w-4 h-4 text-blue-900 shrink-0" />
                  <span className="text-xs font-bold text-gray-700 uppercase tracking-wider truncate">
                    Phụ trách: <span className="text-blue-900 font-extrabold">{phuTrachName}</span>
                  </span>
                </div>

                {/* Badge with count */}
                <span className="shrink-0 text-[10px] font-extrabold bg-blue-900 text-white px-2 py-0.5 rounded-full">
                  {groupProcedures.length}
                </span>
              </div>

              {/* Procedure Cards Stack */}
              <div className="flex flex-col gap-2.5">
                {groupProcedures.map((proc) => (
                  <QuyTrinhCard
                    key={`${proc.tt}-${proc.quyTrinh}`}
                    item={proc}
                    isSelected={selectedProcedure?.tt === proc.tt}
                    onSelect={onSelectProcedure}
                    onEdit={onEditProcedure}
                    onDelete={onDeleteProcedure}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

