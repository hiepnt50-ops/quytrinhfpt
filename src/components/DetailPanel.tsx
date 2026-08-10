import React, { useEffect, useRef } from 'react';
import {
  X,
  FileText,
  ExternalLink,
  Pencil,
  Building,
  CheckCircle2,
  FolderTree,
  ChevronRight,
  List,
  ArrowUp,
  BookOpen,
  Info,
} from 'lucide-react';
import { QuyTrinhItem } from '../types';

interface DetailPanelProps {
  item: QuyTrinhItem | null;
  onClose: () => void;
  onEdit: (item: QuyTrinhItem) => void;
}

export const DetailPanel: React.FC<DetailPanelProps> = ({
  item,
  onClose,
  onEdit,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to detail panel when item is selected
  useEffect(() => {
    if (item && panelRef.current) {
      panelRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [item]);

  if (!item) return null;

  // Format procedure content with bullet points and clean structure
  const renderFormattedContent = (content: string) => {
    if (!content || !content.trim()) {
      return (
        <p className="text-xs text-gray-400 italic">
          Chưa có chi tiết nội dung quy trình.
        </p>
      );
    }

    const lines = content.split('\n');

    return (
      <div className="space-y-2.5 text-xs sm:text-sm leading-relaxed text-gray-700">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) return <div key={idx} className="h-1.5" />;

          // Bullet points starting with - or + or * or •
          if (
            trimmed.startsWith('-') ||
            trimmed.startsWith('+') ||
            trimmed.startsWith('*') ||
            trimmed.startsWith('•')
          ) {
            const text = trimmed.substring(1).trim();
            return (
              <div key={idx} className="flex items-start gap-2.5 pl-2">
                <span className="w-2 h-2 rounded-full bg-blue-900 mt-1.5 shrink-0" />
                <span className="text-gray-800 font-normal">{text}</span>
              </div>
            );
          }

          // Section headers ending with :
          if (
            trimmed.endsWith(':') ||
            (trimmed.startsWith('*') && trimmed.endsWith('*'))
          ) {
            return (
              <h4
                key={idx}
                className="font-bold text-blue-900 pt-3 text-xs sm:text-sm flex items-center gap-1.5 uppercase tracking-wide border-b border-gray-100 pb-1"
              >
                <ChevronRight className="w-4 h-4 text-blue-900" />
                <span>{trimmed.replace(/\*/g, '')}</span>
              </h4>
            );
          }

          return (
            <p key={idx} className="text-gray-800">
              {trimmed}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div
      ref={panelRef}
      className="my-8 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20 animate-in fade-in duration-300"
    >
      <div className="bg-white rounded-2xl shadow-xl border-2 border-blue-900 overflow-hidden">
        {/* Top Banner Header */}
        <div className="bg-blue-900 text-white px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 min-w-0">
            <div className="flex items-center gap-2 flex-wrap text-[11px] font-semibold">
              <span className="bg-white/20 text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                MẢNG: {item.mang}
              </span>
              <span className="bg-blue-800/80 text-blue-100 px-2.5 py-0.5 rounded-full">
                Phụ trách: {item.phuTrach}
              </span>
              {item.loaiDeXuat && (
                <span className="bg-emerald-600/90 text-white px-2.5 py-0.5 rounded-full">
                  {item.loaiDeXuat}
                </span>
              )}
            </div>

            <h2 className="text-lg sm:text-xl font-bold leading-snug flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-200 shrink-0" />
              <span>{item.quyTrinh}</span>
            </h2>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
            <button
              onClick={() => onEdit(item)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-xs font-semibold transition-colors cursor-pointer"
            >
              <Pencil className="w-3.5 h-3.5" />
              <span>Chỉnh sửa</span>
            </button>
            <button
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-blue-900 hover:bg-gray-100 rounded-full text-xs font-bold transition-colors shadow-xs cursor-pointer"
            >
              <X className="w-4 h-4" />
              <span>Thu gọn / Đóng</span>
            </button>
          </div>
        </div>

        {/* Panel Main Content Area */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Metadata Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 bg-gray-50 p-3.5 rounded-xl border border-gray-200">
              <Building className="w-5 h-5 text-blue-900 shrink-0" />
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold tracking-wider">
                  Bộ phận thực hiện
                </span>
                <span className="font-bold text-gray-800 text-xs sm:text-sm">
                  {item.boPhan || 'Chưa phân loại'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-gray-50 p-3.5 rounded-xl border border-gray-200">
              <FolderTree className="w-5 h-5 text-blue-900 shrink-0" />
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold tracking-wider">
                  Lĩnh vực đề xuất
                </span>
                <span className="font-bold text-gray-800 text-xs sm:text-sm">
                  {item.linhVucDeXuat || 'Quy trình chuẩn hóa'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-blue-50/70 p-3.5 rounded-xl border border-blue-200">
              <CheckCircle2 className="w-5 h-5 text-blue-900 shrink-0" />
              <div>
                <span className="text-blue-900 block text-[10px] uppercase font-bold tracking-wider">
                  Sản phẩm đầu ra
                </span>
                <span className="font-bold text-gray-900 text-xs sm:text-sm">
                  {item.sanPham || 'Chưa có sản phẩm cụ thể'}
                </span>
              </div>
            </div>
          </div>

          {/* Tóm tắt */}
          {item.tomTat && item.tomTat !== item.quyTrinh && (
            <div className="bg-amber-50/60 border border-amber-200 p-4 rounded-xl">
              <h3 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-amber-700" />
                <span>Tóm tắt quy trình</span>
              </h3>
              <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
                {item.tomTat}
              </p>
            </div>
          )}

          {/* Nội dung chi tiết quy trình */}
          <div>
            <h3 className="text-sm font-bold text-blue-900 uppercase tracking-wider mb-3 flex items-center gap-2 border-b-2 border-blue-900 pb-2">
              <List className="w-4 h-4 text-blue-900" />
              <span>Nội dung chi tiết quy trình</span>
            </h3>
            <div className="bg-gray-50 p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-2xs">
              {renderFormattedContent(item.noiDung)}
            </div>
          </div>

          {/* Direct Embedded Google Docs Documents (CẤP 3 Requirement) */}
          <div>
            <h3 className="text-sm font-bold text-blue-900 uppercase tracking-wider mb-3 flex items-center gap-2 border-b-2 border-blue-900 pb-2">
              <FileText className="w-4 h-4 text-blue-900" />
              <span>Tài liệu đính kèm quy trình ({item.taiLieu?.length || 0})</span>
            </h3>

            {item.taiLieu && item.taiLieu.length > 0 ? (
              <div className="space-y-6">
                {item.taiLieu.map((doc, idx) => {
                  // Ensure embedLink is valid or construct fallback preview URL
                  const embedUrl =
                    doc.embedLink ||
                    doc.link.replace(/\/edit.*$/, '/preview');

                  return (
                    <div
                      key={idx}
                      className="bg-gray-50 border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3"
                    >
                      {/* Document Title Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-gray-200">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center text-blue-900 shrink-0 font-bold">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-sm font-bold text-gray-900 truncate">
                              {doc.ten || `Tài liệu hướng dẫn #${idx + 1}`}
                            </h4>
                            <p className="text-xs text-gray-500">
                              Trình xem trực tiếp Google Docs ngay tại chỗ
                            </p>
                          </div>
                        </div>

                        {doc.link && (
                          <a
                            href={doc.link}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full text-xs font-semibold transition-colors shrink-0 self-start sm:self-auto"
                          >
                            <ExternalLink className="w-3.5 h-3.5 text-gray-600" />
                            <span>Mở tab mới</span>
                          </a>
                        )}
                      </div>

                      {/* Direct Iframe Embedded Google Doc */}
                      <div className="w-full bg-white rounded-xl overflow-hidden border border-gray-300 shadow-inner">
                        <iframe
                          src={embedUrl}
                          title={doc.ten || `Tài liệu quy trình ${item.quyTrinh}`}
                          className="w-full h-[650px] sm:h-[750px] border-0"
                          allow="autoplay"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-500 italic flex items-center gap-2">
                <Info className="w-4 h-4 text-gray-400 shrink-0" />
                <span>Chưa có tài liệu đính kèm cho quy trình này.</span>
              </div>
            )}
          </div>
        </div>

        {/* Panel Bottom Footer Bar */}
        <div className="px-6 py-4 bg-gray-100 border-t border-gray-200 flex items-center justify-between">
          <span className="text-xs text-gray-500 font-medium">
            Mã quy trình: #{item.tt} • Mảng: {item.mang}
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1 text-xs text-gray-600 hover:text-blue-900 font-semibold cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Về đầu trang</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 bg-blue-900 hover:bg-blue-950 text-white rounded-full text-xs font-bold transition-colors shadow-xs cursor-pointer"
            >
              Quay lại danh sách
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
