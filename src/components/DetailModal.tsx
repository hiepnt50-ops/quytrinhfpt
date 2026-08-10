import React, { useState } from 'react';
import {
  X,
  FileText,
  ExternalLink,
  Eye,
  Pencil,
  Building,
  UserCheck,
  Tag,
  CheckCircle2,
  FolderTree,
  ChevronRight,
  List,
} from 'lucide-react';
import { QuyTrinhItem, TaiLieu } from '../types';
import { DocPreviewModal } from './DocPreviewModal';

interface DetailModalProps {
  item: QuyTrinhItem | null;
  onClose: () => void;
  onEdit: (item: QuyTrinhItem) => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  item,
  onClose,
  onEdit,
}) => {
  const [previewDoc, setPreviewDoc] = useState<TaiLieu | null>(null);

  if (!item) return null;

  // Render procedure content cleanly with structured bullet formatting
  const renderFormattedContent = (content: string) => {
    if (!content || !content.trim()) {
      return (
        <p className="text-xs text-slate-400 italic">
          Chưa có chi tiết nội dung quy trình.
        </p>
      );
    }

    const lines = content.split('\n');

    return (
      <div className="space-y-2 text-xs leading-relaxed text-slate-700">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) return <div key={idx} className="h-1" />;

          // Check if line is a bullet point
          if (
            trimmed.startsWith('-') ||
            trimmed.startsWith('+') ||
            trimmed.startsWith('*') ||
            trimmed.startsWith('•')
          ) {
            const text = trimmed.substring(1).trim();
            return (
              <div key={idx} className="flex items-start gap-2 pl-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1e3a8a] mt-1.5 shrink-0" />
                <span>{text}</span>
              </div>
            );
          }

          // Check if line is sub-bullet (e.g., "+ ")
          if (trimmed.startsWith('+')) {
            return (
              <div key={idx} className="flex items-start gap-2 pl-6 text-slate-600">
                <span className="w-1 h-1 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                <span>{trimmed.substring(1).trim()}</span>
              </div>
            );
          }

          // Section header line (e.g. bold or capitalized or ends with :)
          if (trimmed.endsWith(':') || trimmed.startsWith('*') && trimmed.endsWith('*')) {
            return (
              <h4 key={idx} className="font-bold text-slate-900 pt-2 text-xs flex items-center gap-1.5 text-[#1e3a8a]">
                <ChevronRight className="w-3.5 h-3.5" />
                <span>{trimmed.replace(/\*/g, '')}</span>
              </h4>
            );
          }

          return (
            <p key={idx} className="text-slate-800">
              {trimmed}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-6 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
          
          {/* Header */}
          <div className="px-6 py-4 bg-[#1e3a8a] text-white flex items-start justify-between gap-4">
            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-bold bg-white/20 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Mảng: {item.mang}
                </span>
                <span className="text-[10px] font-bold bg-blue-500/30 text-blue-100 px-2 py-0.5 rounded-full">
                  Phụ trách: {item.phuTrach}
                </span>
                {item.loaiDeXuat && (
                  <span className="text-[10px] font-bold bg-emerald-500/30 text-emerald-100 px-2 py-0.5 rounded-full">
                    {item.loaiDeXuat}
                  </span>
                )}
              </div>

              <h2 className="text-base sm:text-lg font-bold leading-snug">
                {item.quyTrinh}
              </h2>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => onEdit(item)}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                <Pencil className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sửa</span>
              </button>
              <button
                onClick={onClose}
                className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body Content - Scrollable */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5 divide-y divide-slate-100">
            
            {/* Quick Overview Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
                <Building className="w-4 h-4 text-[#1e3a8a] shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[10px]">Bộ phận:</span>
                  <span className="font-semibold text-slate-800">
                    {item.boPhan || 'Chưa phân loại'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
                <FolderTree className="w-4 h-4 text-[#1e3a8a] shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[10px]">Lĩnh vực đề xuất:</span>
                  <span className="font-semibold text-slate-800">
                    {item.linhVucDeXuat || 'Thuộc quy trình chuẩn'}
                  </span>
                </div>
              </div>

              {item.sanPham && (
                <div className="sm:col-span-2 flex items-center gap-2 bg-blue-50/60 p-2.5 rounded-lg border border-blue-200/80">
                  <CheckCircle2 className="w-4 h-4 text-[#1e3a8a] shrink-0" />
                  <div>
                    <span className="text-blue-600 font-bold text-[10px] block">Sản phẩm đầu ra:</span>
                    <span className="font-semibold text-slate-800">{item.sanPham}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Tóm tắt */}
            {item.tomTat && item.tomTat !== item.quyTrinh && (
              <div className="pt-4">
                <h3 className="text-xs font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#1e3a8a]" />
                  <span>Tóm tắt</span>
                </h3>
                <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
                  {item.tomTat}
                </p>
              </div>
            )}

            {/* Detailed Content */}
            <div className="pt-4">
              <h3 className="text-xs font-bold text-slate-900 mb-2.5 flex items-center gap-1.5">
                <List className="w-3.5 h-3.5 text-[#1e3a8a]" />
                <span>Nội dung chi tiết quy trình</span>
              </h3>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                {renderFormattedContent(item.noiDung)}
              </div>
            </div>

            {/* Attached Documents (Tài liệu) */}
            <div className="pt-4">
              <h3 className="text-xs font-bold text-slate-900 mb-2.5 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#1e3a8a]" />
                <span>Tài liệu đính kèm ({item.taiLieu?.length || 0})</span>
              </h3>

              {item.taiLieu && item.taiLieu.length > 0 ? (
                <div className="space-y-2">
                  {item.taiLieu.map((doc, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-white border border-slate-200 rounded-xl hover:border-blue-300 transition-colors gap-2"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#1e3a8a] shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-slate-800 truncate">
                            {doc.ten || 'Tài liệu hướng dẫn'}
                          </h4>
                          <p className="text-[10px] text-slate-400 truncate">
                            Google Docs Preview
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                        <button
                          onClick={() => setPreviewDoc(doc)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#1e3a8a] hover:bg-blue-900 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Xem trực tiếp</span>
                        </button>

                        {doc.link && (
                          <a
                            href={doc.link}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>Mở link</span>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-400 italic">
                  Chưa có tài liệu đính kèm cho quy trình này.
                </div>
              )}
            </div>

          </div>

          {/* Footer */}
          <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">STT: #{item.tt}</span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              Đóng
            </button>
          </div>

        </div>
      </div>

      {/* Embedded Document Viewer Sub-modal */}
      <DocPreviewModal doc={previewDoc} onClose={() => setPreviewDoc(null)} />
    </>
  );
};
