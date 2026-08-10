import React, { useState, useEffect } from 'react';
import { X, Save, Link2, Loader2 } from 'lucide-react';
import { QuyTrinhItem } from '../types';

interface EditModalProps {
  item: QuyTrinhItem | null; // null means Add New
  isOpen: boolean;
  onClose: () => void;
  onSave: (savedItem: QuyTrinhItem) => Promise<void> | void;
  availableCategories: string[];
  isSubmitting?: boolean;
}

export const EditModal: React.FC<EditModalProps> = ({
  item,
  isOpen,
  onClose,
  onSave,
  availableCategories,
  isSubmitting = false,
}) => {
  const [formData, setFormData] = useState<Partial<QuyTrinhItem>>({
    mang: 'TC&QLĐT',
    phuTrach: 'TC&QLĐT',
    quyTrinh: '',
    sanPham: '',
    boPhan: '',
    noiDung: '',
    tomTat: '',
    loaiDeXuat: 'Cải tiến',
    linhVucDeXuat: '',
  });

  const [docLink, setDocLink] = useState<string>('');
  const [docName, setDocName] = useState<string>('');

  useEffect(() => {
    if (item) {
      setFormData(item);
      const firstDoc = item.taiLieu && item.taiLieu.length > 0 ? item.taiLieu[0] : null;
      setDocLink(firstDoc?.link || '');
      setDocName(firstDoc?.ten || '');
    } else {
      setFormData({
        mang: availableCategories[0] || 'TC&QLĐT',
        phuTrach: 'TC&QLĐT',
        quyTrinh: '',
        sanPham: '',
        boPhan: '',
        noiDung: '',
        tomTat: '',
        loaiDeXuat: 'Cải tiến',
        linhVucDeXuat: '',
      });
      setDocLink('');
      setDocName('');
    }
  }, [item, isOpen, availableCategories]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.quyTrinh?.trim()) return;

    const finalDocName = docName.trim() || formData.sanPham?.trim() || formData.quyTrinh?.trim() || 'Tài liệu hướng dẫn';
    const finalDocLink = docLink.trim();

    const newItem: QuyTrinhItem = {
      tt: item?.tt || '',
      mang: formData.mang?.trim() || 'TC&QLĐT',
      phuTrach: formData.phuTrach?.trim() || formData.mang?.trim() || 'Chưa phân công',
      quyTrinh: formData.quyTrinh?.trim() || '',
      trangThai: formData.trangThai || 'Chưa xác định',
      sanPham: formData.sanPham?.trim() || '',
      boPhan: formData.boPhan?.trim() || '',
      noiDung: formData.noiDung?.trim() || '',
      tomTat: formData.tomTat?.trim() || formData.quyTrinh?.trim() || '',
      loaiDeXuat: formData.loaiDeXuat || 'Cải tiến',
      linhVucDeXuat: formData.linhVucDeXuat?.trim() || '',
      taiLieu: finalDocLink ? [{ ten: finalDocName, link: finalDocLink }] : [],
    };

    await onSave(newItem);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#1e3a8a] text-white flex items-center justify-between">
          <h3 className="text-sm sm:text-base font-bold">
            {item ? 'Chỉnh sửa quy trình' : 'Thêm quy trình mới'}
          </h3>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="p-1 text-white/80 hover:text-white rounded transition-colors cursor-pointer disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
          
          {/* Mảng & Phụ trách */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Mảng *</label>
              <input
                type="text"
                list="category-suggestions"
                required
                value={formData.mang || ''}
                onChange={(e) => setFormData({ ...formData, mang: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:outline-none"
                placeholder="VD: TC&QLĐT, TCM, CTHS..."
              />
              <datalist id="category-suggestions">
                {availableCategories.map((cat) => (
                  <option key={cat} value={cat} />
                ))}
              </datalist>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Phụ trách *</label>
              <input
                type="text"
                required
                value={formData.phuTrach || ''}
                onChange={(e) => setFormData({ ...formData, phuTrach: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:outline-none"
                placeholder="VD: TC&QLĐT, Tự nhiên, VP..."
              />
            </div>
          </div>

          {/* Tên quy trình */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">Tên quy trình *</label>
            <input
              type="text"
              required
              value={formData.quyTrinh || ''}
              onChange={(e) => setFormData({ ...formData, quyTrinh: e.target.value, tomTat: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:outline-none font-semibold text-slate-900"
              placeholder="Nhập tên quy trình..."
            />
          </div>

          {/* Sản phẩm & Bộ phận */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Sản phẩm đầu ra</label>
              <input
                type="text"
                value={formData.sanPham || ''}
                onChange={(e) => setFormData({ ...formData, sanPham: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:outline-none"
                placeholder="Bỏ trống nếu chưa có sản phẩm"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Bộ phận thực hiện</label>
              <input
                type="text"
                value={formData.boPhan || ''}
                onChange={(e) => setFormData({ ...formData, boPhan: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:outline-none"
                placeholder="VD: Tổ chức và Quản lý Đào tạo..."
              />
            </div>
          </div>

          {/* Loại đề xuất & Lĩnh vực */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Loại đề xuất</label>
              <select
                value={formData.loaiDeXuat || 'Cải tiến'}
                onChange={(e) => setFormData({ ...formData, loaiDeXuat: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:outline-none bg-white"
              >
                <option value="Cải tiến">Cải tiến</option>
                <option value="Viết mới">Viết mới</option>
                <option value="Chuẩn hóa">Chuẩn hóa</option>
                <option value="Vận hành">Vận hành</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Lĩnh vực đề xuất</label>
              <input
                type="text"
                value={formData.linhVucDeXuat || ''}
                onChange={(e) => setFormData({ ...formData, linhVucDeXuat: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:outline-none"
                placeholder="Lĩnh vực chuyên môn..."
              />
            </div>
          </div>

          {/* Nội dung chi tiết */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">Nội dung chi tiết quy trình</label>
            <textarea
              rows={4}
              value={formData.noiDung || ''}
              onChange={(e) => setFormData({ ...formData, noiDung: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:outline-none font-mono text-xs"
              placeholder="Nhập nội dung các bước, dùng gạch đầu dòng (-) để tự động định dạng danh sách..."
            />
          </div>

          {/* Link tài liệu Google Docs */}
          <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2.5">
            <div className="flex items-center gap-1.5 font-bold text-amber-900 text-xs">
              <Link2 className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Link tài liệu Google Docs / Drive</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-amber-800 mb-0.5">Tên tài liệu</label>
                <input
                  type="text"
                  placeholder="VD: Quy trình Đào tạo 2025..."
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-amber-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-amber-800 mb-0.5">Link Google Docs/Drive</label>
                <input
                  type="text"
                  placeholder="https://docs.google.com/document/d/..."
                  value={docLink}
                  onChange={(e) => setDocLink(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-amber-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>
            <p className="text-[10px] text-amber-700 italic">
              Note: Backend lưu 1 link tài liệu duy nhất cho mỗi quy trình.
            </p>
          </div>

          {/* Footer Submit */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 font-semibold cursor-pointer disabled:opacity-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1e3a8a] hover:bg-blue-900 text-white font-semibold rounded-lg shadow-xs cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Đang lưu...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{item ? 'Lưu thay đổi' : 'Tạo mới'}</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

