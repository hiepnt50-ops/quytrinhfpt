import React, { useState, useEffect } from 'react';
import { X, Save, Plus, Trash2, Link2 } from 'lucide-react';
import { QuyTrinhItem, TaiLieu } from '../types';

interface EditModalProps {
  item: QuyTrinhItem | null; // null means Add New
  isOpen: boolean;
  onClose: () => void;
  onSave: (savedItem: QuyTrinhItem) => void;
  availableCategories: string[];
}

export const EditModal: React.FC<EditModalProps> = ({
  item,
  isOpen,
  onClose,
  onSave,
  availableCategories,
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
    taiLieu: [],
  });

  const [docList, setDocList] = useState<TaiLieu[]>([]);

  useEffect(() => {
    if (item) {
      setFormData(item);
      setDocList(item.taiLieu || []);
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
        taiLieu: [],
      });
      setDocList([]);
    }
  }, [item, isOpen, availableCategories]);

  if (!isOpen) return null;

  const handleAddDoc = () => {
    setDocList([...docList, { ten: '', link: '', embedLink: '' }]);
  };

  const handleDocChange = (index: number, field: keyof TaiLieu, value: string) => {
    const updated = [...docList];
    updated[index][field] = value;
    // Auto populate embedLink if Google Docs edit link provided
    if (field === 'link' && value.includes('docs.google.com') && !updated[index].embedLink) {
      updated[index].embedLink = value.replace(/\/edit.*$/, '/preview');
    }
    setDocList(updated);
  };

  const handleRemoveDoc = (index: number) => {
    setDocList(docList.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.quyTrinh?.trim()) return;

    const newItem: QuyTrinhItem = {
      tt: item?.tt || Date.now().toString(),
      mang: formData.mang || 'TC&QLĐT',
      phuTrach: formData.phuTrach || formData.mang || 'Chưa phân công',
      quyTrinh: formData.quyTrinh || '',
      trangThai: formData.trangThai || 'Chưa xác định',
      sanPham: formData.sanPham || '',
      boPhan: formData.boPhan || '',
      noiDung: formData.noiDung || '',
      tomTat: formData.tomTat || formData.quyTrinh || '',
      loaiDeXuat: formData.loaiDeXuat || '',
      linhVucDeXuat: formData.linhVucDeXuat || '',
      taiLieu: docList.filter((d) => d.ten || d.link),
    };

    onSave(newItem);
    onClose();
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
            className="p-1 text-white/80 hover:text-white rounded transition-colors cursor-pointer"
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
                value={formData.mang}
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
                value={formData.phuTrach}
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
              value={formData.quyTrinh}
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
                value={formData.sanPham}
                onChange={(e) => setFormData({ ...formData, sanPham: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:outline-none"
                placeholder="Bỏ trống nếu chưa có sản phẩm"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Bộ phận thực hiện</label>
              <input
                type="text"
                value={formData.boPhan}
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
                value={formData.loaiDeXuat}
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
                value={formData.linhVucDeXuat}
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
              rows={5}
              value={formData.noiDung}
              onChange={(e) => setFormData({ ...formData, noiDung: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:outline-none font-mono text-xs"
              placeholder="Nhập nội dung các bước, dùng gạch đầu dòng (-) để tự động định dạng danh sách..."
            />
          </div>

          {/* Tài liệu đính kèm */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-bold text-slate-700">Tài liệu đính kèm (Google Docs)</label>
              <button
                type="button"
                onClick={handleAddDoc}
                className="inline-flex items-center gap-1 text-[#1e3a8a] font-semibold hover:underline text-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Thêm tài liệu</span>
              </button>
            </div>

            {docList.map((doc, idx) => (
              <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg mb-2 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-slate-700">Tài liệu #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveDoc(idx)}
                    className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Tên tài liệu..."
                  value={doc.ten}
                  onChange={(e) => handleDocChange(idx, 'ten', e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md bg-white"
                />
                <input
                  type="text"
                  placeholder="Link Google Docs (https://docs.google.com/...)"
                  value={doc.link}
                  onChange={(e) => handleDocChange(idx, 'link', e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md bg-white"
                />
              </div>
            ))}
          </div>

          {/* Footer Submit */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 font-semibold cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1e3a8a] hover:bg-blue-900 text-white font-semibold rounded-lg shadow-xs cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{item ? 'Lưu thay đổi' : 'Tạo mới'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
