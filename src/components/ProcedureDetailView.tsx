import React, { useState, useEffect } from 'react';
import {
  FileText,
  Plus,
  Pencil,
  Trash2,
  RotateCcw,
  Link2,
  Maximize2,
  Minimize2,
  Loader2,
  ChevronDown,
  Info,
  ChevronRight,
  Check,
  ExternalLink,
} from 'lucide-react';
import { QuyTrinhItem, TaiLieu } from '../types';

interface ProcedureDetailViewProps {
  item: QuyTrinhItem;
  onEdit: (item: QuyTrinhItem) => void;
  onDelete: (item: QuyTrinhItem, e: React.MouseEvent) => void;
  onOpenAddModal: () => void;
  onRefresh: () => void;
}

export const ProcedureDetailView: React.FC<ProcedureDetailViewProps> = ({
  item,
  onEdit,
  onDelete,
  onOpenAddModal,
  onRefresh,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedDocIndex, setSelectedDocIndex] = useState<number>(0);
  const [isLinkDropdownOpen, setIsLinkDropdownOpen] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showTextContent, setShowTextContent] = useState<boolean>(false);

  const docsList: TaiLieu[] = item.taiLieu || [];
  const activeDoc: TaiLieu | undefined = docsList[selectedDocIndex] || docsList[0];


  // Trigger loading state whenever item or active doc changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, [item.tt, selectedDocIndex]);

  const handleRefreshClick = () => {
    setIsLoading(true);
    onRefresh();
    setTimeout(() => {
      setIsLoading(false);
    }, 700);
  };

  // Construct valid embed URL for Google Docs / Drive
  const getEmbedUrl = (doc?: TaiLieu) => {

    if (!doc) return '';
    if (doc.embedLink && doc.embedLink.trim()) {
      return doc.embedLink;
    }
    if (doc.link && doc.link.trim()) {
      // Convert standard edit/view link to preview/embed
      return doc.link.replace(/\/edit.*$/, '/preview').replace(/\/view.*$/, '/preview');
    }
    return '';
  };

  const embedUrl = getEmbedUrl(activeDoc);

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden flex flex-col">
        {/* Header Section */}
        <div className="p-5 sm:p-6 border-b border-gray-200 bg-gray-50/70">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Title & Badge */}
            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center gap-2.5 flex-wrap">
                <div className="p-2 bg-blue-900 rounded-lg text-white shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <h2 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 leading-snug">
                  {item.quyTrinh}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-blue-50 text-blue-900 border border-blue-200 shrink-0">
                  {item.loaiDeXuat || 'Chuẩn hóa'}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500 flex-wrap pl-1">
                <span>
                  Mảng: <strong className="text-gray-700">{item.mang}</strong>
                </span>
                <span>•</span>
                <span>
                  Phụ trách: <strong className="text-gray-700">{item.phuTrach}</strong>
                </span>
                {item.boPhan && (
                  <>
                    <span>•</span>
                    <span>
                      Bộ phận: <strong className="text-gray-700">{item.boPhan}</strong>
                    </span>
                  </>
                )}
                {item.sanPham && (
                  <>
                    <span>•</span>
                    <span>
                      Sản phẩm: <strong className="text-blue-900">{item.sanPham}</strong>
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Header Action Buttons Row */}
            <div className="flex items-center gap-2 flex-wrap shrink-0 self-start lg:self-auto">
              {/* + Thêm mới */}
              <button
                onClick={onOpenAddModal}
                className="inline-flex items-center gap-1 px-3 py-1.5 border border-emerald-600 text-emerald-700 hover:bg-emerald-50 rounded-full text-xs font-semibold transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Thêm mới</span>
              </button>

              {/* ✏ Sửa */}
              <button
                onClick={() => onEdit(item)}
                className="inline-flex items-center gap-1 px-3 py-1.5 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-full text-xs font-medium transition-colors cursor-pointer"
              >
                <Pencil className="w-3.5 h-3.5" />
                <span>Sửa</span>
              </button>

              {/* 🗑 Xóa */}
              <button
                onClick={(e) => onDelete(item, e)}
                className="inline-flex items-center gap-1 px-3 py-1.5 border border-red-300 text-red-600 hover:bg-red-50 rounded-full text-xs font-medium transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Xóa</span>
              </button>

              {/* ↻ Làm mới */}
              <button
                onClick={handleRefreshClick}
                className="inline-flex items-center gap-1 px-3 py-1.5 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-full text-xs font-medium transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Làm mới</span>
              </button>

              {/* 🔗 Gắn link (n) Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsLinkDropdownOpen(!isLinkDropdownOpen)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 font-bold rounded-full text-xs transition-colors cursor-pointer shadow-2xs"
                >
                  <Link2 className="w-3.5 h-3.5 text-amber-800" />
                  <span>Gắn link ({docsList.length})</span>
                  <ChevronDown className="w-3 h-3 text-amber-800" />
                </button>

                {/* Dropdown Menu for Selecting Document Link */}
                {isLinkDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                      Danh sách tài liệu ({docsList.length})
                    </div>
                    {docsList.length > 0 ? (
                      docsList.map((doc, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setSelectedDocIndex(idx);
                            setIsLinkDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-blue-50 transition-colors cursor-pointer ${
                            selectedDocIndex === idx
                              ? 'bg-blue-50 text-blue-900 font-bold'
                              : 'text-gray-700'
                          }`}
                        >
                          <span className="truncate pr-2">
                            {doc.ten || `Tài liệu #${idx + 1}`}
                          </span>
                          {selectedDocIndex === idx && (
                            <Check className="w-3.5 h-3.5 text-blue-900 shrink-0" />
                          )}
                        </button>
                      ))
                    ) : (
                      <div className="px-3 py-3 text-xs text-gray-400 italic">
                        Chưa có link tài liệu
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* ⤢ Mở rộng */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center gap-1 px-3 py-1.5 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-full text-xs font-medium transition-colors cursor-pointer"
              >
                {isExpanded ? (
                  <>
                    <Minimize2 className="w-3.5 h-3.5" />
                    <span>Thu nhỏ</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Mở rộng</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Optional Text Content Toggle Bar */}
          <div className="mt-3 pt-3 border-t border-gray-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <span className="font-semibold text-gray-800">
                Tài liệu đang xem:
              </span>
              <span className="font-bold text-blue-900">
                {activeDoc?.ten || 'Văn bản hướng dẫn chuẩn'}
              </span>
              {activeDoc?.link && (
                <a
                  href={activeDoc.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-0.5 text-blue-700 hover:underline ml-1"
                >
                  <span>Mở Google Doc</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            {item.noiDung && (
              <button
                onClick={() => setShowTextContent(!showTextContent)}
                className="text-xs text-blue-900 font-semibold hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>{showTextContent ? 'Ẩn văn bản tóm tắt' : 'Xem văn bản tóm tắt'}</span>
                <ChevronRight
                  className={`w-3.5 h-3.5 transition-transform ${
                    showTextContent ? 'rotate-90' : ''
                  }`}
                />
              </button>
            )}
          </div>

          {/* Expandable Text Summary Box */}
          {showTextContent && item.noiDung && (
            <div className="mt-3 p-4 bg-white rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-800 leading-relaxed space-y-2 animate-in fade-in duration-200">
              <h4 className="font-bold text-blue-900 uppercase tracking-wide text-xs">
                Nội dung mô tả quy trình:
              </h4>
              <p className="whitespace-pre-line text-gray-700">{item.noiDung}</p>
            </div>
          )}
        </div>

        {/* Main Content Area - Document Embed Frame with Loading State */}
        <div className="p-4 sm:p-6 bg-gray-100/60 min-h-[600px] flex flex-col justify-center items-center">
          {isLoading ? (
            /* Loading State */
            <div className="py-24 px-6 text-center space-y-3 animate-in fade-in duration-150">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-900 flex items-center justify-center mx-auto shadow-xs border border-blue-200">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
              <h3 className="text-base font-bold text-gray-800">
                Đang tải nội dung tài liệu...
              </h3>
              <p className="text-xs text-gray-500 max-w-md mx-auto">
                Xử lý hiển thị file xem trực tiếp từ Google Docs / Drive
              </p>
            </div>
          ) : embedUrl ? (
            /* Direct Iframe Embedded Google Doc */
            <div
              className={`w-full bg-white rounded-xl overflow-hidden border border-gray-300 shadow-sm transition-all duration-300 ${
                isExpanded ? 'h-[900px]' : 'h-[680px] sm:h-[760px]'
              }`}
            >
              <iframe
                src={embedUrl}
                title={activeDoc?.ten || item.quyTrinh}
                className="w-full h-full border-0"
                allow="autoplay"
              />
            </div>
          ) : (
            /* Empty Document State */
            <div className="py-20 px-6 text-center bg-white rounded-xl border border-gray-200 shadow-2xs max-w-lg w-full space-y-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mx-auto">
                <Info className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-gray-800">
                  Chưa có tài liệu đính kèm cho quy trình này
                </h3>
                <p className="text-xs text-gray-500">
                  Bạn có thể cập nhật và gắn link Google Docs bằng nút thêm mới bên dưới.
                </p>
              </div>
              <button
                onClick={() => onEdit(item)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-bold transition-colors cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>+ Thêm mới tài liệu</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
