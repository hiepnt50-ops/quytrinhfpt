import React, { useState, useMemo, useEffect } from 'react';
import { initialQuyTrinhData } from './data/quyTrinhData';
import { QuyTrinhItem } from './types';
import { Header } from './components/Header';
import { SubToolbar } from './components/SubToolbar';
import { TabBar } from './components/TabBar';
import { CategoryHeader } from './components/CategoryHeader';
import { PhuTrachGrid } from './components/PhuTrachGrid';
import { ProcedureDetailView } from './components/ProcedureDetailView';
import { EditModal } from './components/EditModal';
import { Sparkles, RefreshCw } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'quy_trinh_data_v2_store';

export default function App() {
  // Load initial data from localStorage if available, or static JSON fallback
  const [data, setData] = useState<QuyTrinhItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    return initialQuyTrinhData;
  });

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedProcedure, setSelectedProcedure] = useState<QuyTrinhItem | null>(null);
  const [editingProcedure, setEditingProcedure] = useState<QuyTrinhItem | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Save to localStorage on data change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      console.error('Failed to save state to localStorage', err);
    }
  }, [data]);

  // Toast notification helper
  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Derive unique categories with item counts
  const categoriesWithCounts = useMemo(() => {
    const countsMap: Record<string, number> = {};
    data.forEach((item) => {
      const cat = item.mang?.trim() || 'Khác';
      countsMap[cat] = (countsMap[cat] || 0) + 1;
    });

    return Object.keys(countsMap).map((catName) => ({
      name: catName,
      count: countsMap[catName],
    }));
  }, [data]);

  // Set default active tab (category with highest count) on load
  useEffect(() => {
    if (categoriesWithCounts.length > 0 && !selectedCategory) {
      const sorted = [...categoriesWithCounts].sort((a, b) => b.count - a.count);
      setSelectedCategory(sorted[0].name);
    }
  }, [categoriesWithCounts, selectedCategory]);

  // Filter procedures by category and search keyword
  const filteredProcedures = useMemo(() => {
    let result = data;

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.quyTrinh?.toLowerCase().includes(term) ||
          p.phuTrach?.toLowerCase().includes(term) ||
          p.sanPham?.toLowerCase().includes(term) ||
          p.noiDung?.toLowerCase().includes(term) ||
          p.boPhan?.toLowerCase().includes(term) ||
          p.mang?.toLowerCase().includes(term)
      );
    } else if (selectedCategory) {
      result = result.filter((p) => p.mang === selectedCategory);
    }

    return result;
  }, [data, selectedCategory, searchTerm]);

  // Active category procedure count
  const activeCategoryCount = useMemo(() => {
    return data.filter((p) => p.mang === selectedCategory).length;
  }, [data, selectedCategory]);

  // Handlers
  const handleSelectProcedure = (item: QuyTrinhItem) => {
    setSelectedProcedure(item);
  };

  const handleOpenAddModal = () => {
    setEditingProcedure(null);
    setIsEditModalOpen(true);
  };

  const handleEditProcedure = (item: QuyTrinhItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditingProcedure(item);
    setIsEditModalOpen(true);
  };

  const handleDeleteProcedure = (item: QuyTrinhItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (confirm(`Bạn có chắc chắn muốn xóa quy trình "${item.quyTrinh}"?`)) {
      setData((prev) => prev.filter((p) => p.tt !== item.tt || p.quyTrinh !== item.quyTrinh));
      showToast(`Đã xóa quy trình "${item.quyTrinh}"`);
      if (selectedProcedure?.tt === item.tt) {
        setSelectedProcedure(null);
      }
    }
  };

  const handleSaveProcedure = (savedItem: QuyTrinhItem) => {
    setData((prev) => {
      const existsIndex = prev.findIndex((p) => p.tt === savedItem.tt);
      if (existsIndex >= 0) {
        const updated = [...prev];
        updated[existsIndex] = savedItem;
        return updated;
      } else {
        return [savedItem, ...prev];
      }
    });

    showToast(
      editingProcedure ? 'Cập nhật quy trình thành công!' : 'Đã thêm quy trình mới thành công!'
    );

    if (selectedProcedure && selectedProcedure.tt === savedItem.tt) {
      setSelectedProcedure(savedItem);
    }
  };

  const handleResetData = () => {
    if (confirm('Khôi phục lại toàn bộ dữ liệu quy trình ban đầu từ JSON?')) {
      setData(initialQuyTrinhData);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      setSelectedProcedure(null);
      showToast('Đã khôi phục dữ liệu quy trình gốc!');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/60 font-sans text-slate-800 flex flex-col selection:bg-blue-200">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700 animate-in slide-in-from-bottom-3 duration-200">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* 1. Header (Black background, Title) */}
      <Header totalProcedures={data.length} />

      {/* 2. Sub-Toolbar (+ Thêm quy trình green button + Breadcrumb + Search + Reset) */}
      <SubToolbar
        selectedCategory={selectedCategory}
        selectedProcedure={selectedProcedure}
        onOpenAddModal={handleOpenAddModal}
        onBackToList={() => setSelectedProcedure(null)}
        searchTerm={searchTerm}
        setSearchTerm={(term) => {
          setSearchTerm(term);
          if (term) setSelectedProcedure(null); // Return to list view on search
        }}
        onResetData={handleResetData}
      />

      {/* 3. TabBar ("MẢNG:") */}
      <TabBar
        categories={categoriesWithCounts}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setSelectedProcedure(null); // Always switch back to Mode A (List mode) when selecting category tab
          setSearchTerm('');
        }}
      />

      {/* 4. MAIN CONTENT AREA - 2 EXCLUSIVE MODES */}
      <main className="flex-1 pb-12">
        {!selectedProcedure ? (
          /* MODE A: LIST VIEW */
          <div className="animate-in fade-in duration-200">
            <CategoryHeader
              categoryName={searchTerm ? `Kết quả tìm kiếm: "${searchTerm}"` : selectedCategory}
              count={searchTerm ? filteredProcedures.length : activeCategoryCount}
            />

            <PhuTrachGrid
              items={filteredProcedures}
              selectedProcedure={selectedProcedure}
              onSelectProcedure={handleSelectProcedure}
              onEditProcedure={handleEditProcedure}
              onDeleteProcedure={handleDeleteProcedure}
              onOpenAddModal={handleOpenAddModal}
              searchTerm={searchTerm}
            />
          </div>
        ) : (
          /* MODE B: PROCEDURE DETAIL VIEW WITH DIRECT GOOGLE DOC EMBED */
          <ProcedureDetailView
            item={selectedProcedure}
            onEdit={handleEditProcedure}
            onDelete={handleDeleteProcedure}
            onOpenAddModal={handleOpenAddModal}
            onRefresh={() => {
              showToast('Đã làm mới tài liệu quy trình');
            }}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 px-4 text-center text-xs text-slate-500 mt-auto">
        <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Hệ thống Tra Cứu Quy Trình Học Tập & Vận Hành © Trường Học</span>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Tổng số: {data.length} quy trình</span>
            <span>•</span>
            <button
              onClick={handleResetData}
              className="hover:text-slate-600 transition-colors cursor-pointer flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Khôi phục dữ liệu gốc</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Edit / Add Procedure Modal */}
      <EditModal
        item={editingProcedure}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveProcedure}
        availableCategories={categoriesWithCounts.map((c) => c.name)}
      />

    </div>
  );
}

