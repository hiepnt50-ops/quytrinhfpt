import React from 'react';
import { X, ExternalLink, FileText, Download } from 'lucide-react';
import { TaiLieu } from '../types';

interface DocPreviewModalProps {
  doc: TaiLieu | null;
  onClose: () => void;
}

export const DocPreviewModal: React.FC<DocPreviewModalProps> = ({ doc, onClose }) => {
  if (!doc) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 text-white">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-blue-600/30 flex items-center justify-center text-blue-300 shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold truncate">{doc.ten}</h3>
              <p className="text-[11px] text-slate-400">Xem trước tài liệu Google Docs</p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {doc.link && (
              <a
                href={doc.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-medium transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Mở tab mới</span>
              </a>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Embedded Iframe Preview */}
        <div className="flex-1 bg-slate-100 relative">
          <iframe
            src={doc.embedLink || doc.link.replace(/\/edit.*$/, '/preview')}
            title={doc.ten}
            className="w-full h-full border-0"
            allow="autoplay"
          />
        </div>

        {/* Footer */}
        <div className="px-5 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Nếu khung xem trước không tải, vui lòng bấm &quot;Mở tab mới&quot;.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-md font-semibold transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
};
