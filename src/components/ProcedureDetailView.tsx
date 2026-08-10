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
  Info,
  ChevronRight,
  ExternalLink,
  X,
  Save,
} from 'lucide-react';
import { QuyTrinhItem, TaiLieu } from '../types';

interface ProcedureDetailViewProps {
  item: QuyTrinhItem;
  onEdit: (item: QuyTrinhItem) => void;
  onDelete: (item: QuyTrinhItem, e: React.MouseEvent) => void;
  onOpenAddModal: () => void;
  onRefresh: () => void;
  onSaveLink: (item: QuyTrinhItem, newTen: string, newLink: string) => Promise<boolean>;
}

export const ProcedureDetailView: React.FC<ProcedureDetailViewProps> = ({
  item,
  onEdit,
  onDelete,
  onOpenAddModal,
  onRefresh,
  onSaveLink,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAttachModalOpen, setIsAttachModalOpen] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showTextContent, setShowTextContent] = useState<boolean>(false);
  const [isSavingLink, setIsSavingLink] = useState<boolean>(false);

  const docsList: TaiLieu[] = item.taiLieu || [];
  const activeDoc: TaiLieu | undefined = docsList[0];

  const [linkInput, setLinkInput] = useState<string>('');
  const [nameInput, setNameInput] = useState<string>('');

  useEffect(() => {
    if (activeDoc) {
      setLinkInput(activeDoc.link || '');
      setNameInput(activeDoc.ten || item.sanPham || item.quyTrinh || '');
    } else {
      setLinkInput('');
      setNameInput(item.sanPham || item.quyTrinh || '');
    }
  }, [item, activeDoc]);

  // Trigger loading state whenever item changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [item.tt, item.taiLieu]);

  const handleRefreshClick = () => {
    setIsLoading(true);
    onRefresh();
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  };

  // Construct valid embed URL for Google Docs / Drive
  const getEmbedUrl = (doc?: TaiLieu) => {
    if (!doc) return '';
    if (doc.embedLink && doc.embedLink.trim()) {
      return doc.embedLink;
    }
    if (doc.link && doc.link.trim()) {
      return doc.link.replace(/\/edit.*$/, '/preview').replace(/\/view.*$/, '/preview');
    }
    return '';
  };

  const embedUrl = getEmbedUrl(activeDoc);

  const handleSaveAttachLinkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingLink(true);
    const success = await onSaveLink(item, nameInput, linkInput);
    setIsSavingLink(false);
    if (success) {
      setIsAttachModalOpen(false);
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 500);
    }
  };

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

              {/* 🔗 Gắn link Modal Button */}
              <button
                onClick={() => setIsAttachModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 font-bold rounded-full text-xs transition-colors cursor-pointer shadow-2xs"
              >
                <Link2 className="w-3.5 h-3.5 text-amber-800" />
                <span>Gắn link ({docsList.length > 0 ? 1 : 0})</span>
              </button>

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
                {activeDoc?.ten || 'Chưa gắn link tài liệu'}
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
                  Bạn có thể cập nhật và gắn link Google Docs bằng nút bên dưới.
                </p>
              </div>
              <button
                onClick={() => setIsAttachModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-full text-xs font-bold transition-colors cursor-pointer shadow-xs"
              >
                <Link2 className="w-4 h-4" />
                <span>Gắn link tài liệu Google Docs</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal Gắn Link Tài Liệu (Strictly 1 link & 1 name field) */}
      {isAttachModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden">
            <div className="px-5 py-3.5 bg-amber-600 text-white flex items-center justify-between">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <Link2 className="w-4 h-4" />
                <span>Gắn link tài liệu Google Docs</span>
              </h3>
              <button
                onClick={() => setIsAttachModalOpen(false)}
                disabled={isSavingLink}
                className="text-white/80 hover:text-white p-1 rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAttachLinkSubmit} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Tên tài liệu *</label>
                <input
                  type="text"
                  required
                  placeholder="VD: Quy trình Đào tạo 2025"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Link Google Docs / Drive *</label>
                <input
                  type="url"
                  required
                  placeholder="https://docs.google.com/document/d/..."
                  value={linkInput}
                  onChange={(e) => setLinkInput(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                />
                <p className="text-[10px] text-slate-500 mt-1 italic">
                  Link dạng .../edit hoặc .../view sẽ tự động chuyển thành .../preview để nhúng vào trang.
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAttachModalOpen(false)}
                  disabled={isSavingLink}
                  className="px-3.5 py-1.5 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 font-semibold cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isSavingLink}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg shadow-2xs cursor-pointer disabled:opacity-50"
                >
                  {isSavingLink ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Đang lưu...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      <span>Lưu link</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

