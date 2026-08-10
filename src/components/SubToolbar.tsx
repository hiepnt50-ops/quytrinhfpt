import React from 'react';
import { Plus, ChevronRight, Search, RotateCcw, Loader2 } from 'lucide-react';
import { QuyTrinhItem } from '../types';

interface SubToolbarProps {
  selectedCategory: string;
  selectedProcedure: QuyTrinhItem | null;
  onOpenAddModal: () => void;
  onBackToList: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onResetData: () => void;
  isLoading?: boolean;
}

export const SubToolbar: React.FC<SubToolbarProps> = ({
  selectedCategory,
  selectedProcedure,
  onOpenAddModal,
  onBackToList,
  searchTerm,
  setSearchTerm,
  onResetData,
  isLoading = false,
}) => {
  return (
    <div className="bg-white border-b border-gray-200 py-2.5 px-4 sm:px-6 lg:px-8 shadow-2xs">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left Side: Green Add Button + Breadcrumbs */}
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-0.5">
          {/* Green Add Button */}
          <button
            onClick={onOpenAddModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-full shadow-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm quy trình</span>
          </button>

          {/* Vertical Separator */}
          <div className="h-4 w-px bg-gray-300 shrink-0" />

          {/* Breadcrumb Multi-level Navigation */}
          <nav className="flex items-center gap-1.5 text-xs text-gray-600 font-medium whitespace-nowrap min-w-0">
            <button
              onClick={onBackToList}
              className="hover:text-blue-900 transition-colors cursor-pointer shrink-0 font-semibold text-gray-700"
            >
              Mảng
            </button>

            <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />

            <button
              onClick={onBackToList}
              className={`hover:text-blue-900 transition-colors cursor-pointer shrink-0 ${
                !selectedProcedure
                  ? 'text-amber-600 font-bold'
                  : 'text-gray-700 font-semibold'
              }`}
            >
              {selectedCategory || 'Tất cả'}
            </button>

            {selectedProcedure && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <button
                  onClick={onBackToList}
                  className="hover:text-blue-900 transition-colors cursor-pointer text-gray-700 font-semibold shrink-0"
                >
                  {selectedProcedure.phuTrach}
                </button>

                <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span
                  title={selectedProcedure.quyTrinh}
                  className="text-amber-600 font-bold truncate max-w-[220px] sm:max-w-[320px]"
                >
                  {selectedProcedure.quyTrinh}
                </span>
              </>
            )}
          </nav>
        </div>

        {/* Right Side: Search Box + Refresh Data */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm quy trình..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-7 py-1.5 bg-gray-100 hover:bg-gray-200/70 focus:bg-white border border-gray-200 rounded-full text-xs text-gray-900 focus:ring-2 focus:ring-blue-900 outline-none transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 hover:text-gray-600 bg-gray-200 rounded-full w-4 h-4 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          <button
            onClick={onResetData}
            title="Làm mới dữ liệu từ Google Sheet"
            className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full border border-gray-200 transition-colors cursor-pointer shrink-0 flex items-center gap-1 text-xs px-2.5 font-medium"
          >
            {isLoading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-900" />
            ) : (
              <RotateCcw className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:inline">Làm mới</span>
          </button>
        </div>
      </div>
    </div>
  );
};

