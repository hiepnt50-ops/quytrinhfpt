import React from 'react';
import { Pencil, Trash2, FileText } from 'lucide-react';
import { QuyTrinhItem } from '../types';

interface QuyTrinhCardProps {
  item: QuyTrinhItem;
  isSelected?: boolean;
  onSelect: (item: QuyTrinhItem) => void;
  onEdit: (item: QuyTrinhItem, e: React.MouseEvent) => void;
  onDelete: (item: QuyTrinhItem, e: React.MouseEvent) => void;
}

export const QuyTrinhCard: React.FC<QuyTrinhCardProps> = ({
  item,
  isSelected = false,
  onSelect,
  onEdit,
  onDelete,
}) => {
  // Determine badge label and color
  const getBadgeInfo = () => {
    const proposal = item.loaiDeXuat?.trim();
    if (proposal === 'Cải tiến') {
      return {
        label: 'Cải tiến',
        bgClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      };
    }
    if (proposal === 'Viết mới') {
      return {
        label: 'Viết mới',
        bgClass: 'bg-purple-50 text-purple-700 border-purple-200',
      };
    }
    if (item.linhVucDeXuat?.includes('Vận hành') || proposal === 'Vận hành') {
      return {
        label: 'Vận hành',
        bgClass: 'bg-sky-50 text-sky-700 border-sky-200',
      };
    }
    if (proposal) {
      return {
        label: proposal,
        bgClass: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      };
    }
    return {
      label: 'Chuẩn hóa',
      bgClass: 'bg-gray-100 text-gray-700 border-gray-200',
    };
  };

  const badge = getBadgeInfo();
  const hasDoc = item.taiLieu && item.taiLieu.length > 0;

  return (
    <div
      onClick={() => onSelect(item)}
      className={`group relative rounded-lg p-3 transition-all shadow-2xs cursor-pointer flex flex-col justify-between gap-2 ${
        isSelected
          ? 'bg-blue-50/70 border-2 border-blue-900 ring-2 ring-blue-900/15 shadow-sm'
          : 'bg-white border border-gray-200 hover:border-blue-300 hover:shadow-xs hover:bg-gray-50'
      }`}
    >
      {/* Top row: Title and Badge */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-xs font-bold text-gray-900 group-hover:text-blue-900 leading-snug line-clamp-2 transition-colors">
          {item.quyTrinh}
        </h3>

        <span
          className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badge.bgClass}`}
        >
          {badge.label}
        </span>
      </div>

      {/* Sub-line: Product status / name + Icons */}
      <div className="flex items-center justify-between gap-2 pt-1.5 border-t border-gray-100 text-[11px]">
        {/* Left: Product or document badge indicator */}
        <div className="flex items-center gap-1.5 min-w-0 text-gray-500">
          {hasDoc && (
            <span
              title="Có tài liệu đính kèm"
              className="inline-flex items-center gap-0.5 text-[10px] font-medium text-blue-900 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200 shrink-0"
            >
              <FileText className="w-2.5 h-2.5" />
              <span>Doc</span>
            </span>
          )}

          <span className="truncate">
            {item.sanPham ? (
              <span className="text-gray-600" title={item.sanPham}>
                {item.sanPham}
              </span>
            ) : (
              <span className="text-gray-400 italic">Chưa có sản phẩm</span>
            )}
          </span>
        </div>

        {/* Right action icons: Pencil (Edit) & Trash (Delete) */}
        <div className="flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => onEdit(item, e)}
            title="Chỉnh sửa quy trình"
            className="p-1 text-gray-400 hover:text-blue-900 hover:bg-blue-50 rounded transition-colors"
          >
            <Pencil className="w-3 h-3" />
          </button>
          <button
            onClick={(e) => onDelete(item, e)}
            title="Xóa quy trình"
            className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

