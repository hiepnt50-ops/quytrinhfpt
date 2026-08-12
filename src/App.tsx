import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { initialQuyTrinhData } from './data/quyTrinhData';
import { QuyTrinhItem, TaiLieu, GoogleUser } from './types';
import { Header } from './components/Header';
import { SubToolbar } from './components/SubToolbar';
import { TabBar } from './components/TabBar';
import { CategoryHeader } from './components/CategoryHeader';
import { PhuTrachGrid } from './components/PhuTrachGrid';
import { ProcedureDetailView } from './components/ProcedureDetailView';
import { EditModal } from './components/EditModal';
import { Sparkles, AlertTriangle, X, Loader2 } from 'lucide-react';

const API_URL = "https://script.google.com/macros/s/AKfycbxM-2KYQfJ9Fgg0uNaoqlIw5WbH_jIahs550_UxlU5f6oY0v1-3JWlc5GEYsPD7-08MvA/exec";
const OAUTH_CLIENT_ID = "354828369573-lr07c15usiopi6jdoh6re6vfmc78a5ao.apps.googleusercontent.com";
const LOCAL_STORAGE_USER_KEY = 'fpt_quy_trinh_user_v1';

// Normalize category names to unify variations like "Khối Chủ nhiệm", "Khối chủ nhiệm ", etc.
const normalizeCategory = (cat?: string): string => {
  if (!cat) return 'Khác';
  const cleaned = cat.trim().replace(/\s+/g, ' ');
  const lower = cleaned.toLowerCase();
  if (lower === 'khối chủ nhiệm' || lower === 'khoi chu nhiem' || lower === 'chủ nhiệm' || lower === 'kcn') {
    return 'Khối chủ nhiệm';
  }
  if (lower === 'tc&qlđt' || lower === 'tc&qldt' || lower === 'tc & qlđt') {
    return 'TC&QLĐT';
  }
  if (lower === 'tcm') return 'TCM';
  if (lower === 'cths') return 'CTHS';
  if (lower === 'dvhs') return 'DVHS';
  if (lower === 'ts&tt' || lower === 'ts & tt') return 'TS&TT';
  if (lower === 'vp') return 'VP';
  return cleaned;
};

export default function App() {
  const [data, setData] = useState<QuyTrinhItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [user, setUser] = useState<GoogleUser | null>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedProcedure, setSelectedProcedure] = useState<QuyTrinhItem | null>(null);
  const [editingProcedure, setEditingProcedure] = useState<QuyTrinhItem | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  
  const [notification, setNotification] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Toast notification helper
  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const showErrorMessage = (msg: string) => {
    setErrorMessage(msg);
  };

  // Google Identity Services Login Callback
  const handleCredentialResponse = (credential: string) => {
    try {
      const base64Url = credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const payload = JSON.parse(jsonPayload);
      const newUser: GoogleUser = {
        idToken: credential,
        email: payload.email || '',
        name: payload.name || '',
        picture: payload.picture || '',
      };
      setUser(newUser);
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(newUser));
      showToast(`Đăng nhập thành công: ${newUser.email}`);
    } catch (err) {
      console.error('Error decoding credential:', err);
      showErrorMessage('Không thể giải mã thông tin đăng nhập từ Google');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    if (window.google?.accounts?.id) {
      window.google.accounts.id.disableAutoSelect();
    }
    showToast('Đã đăng xuất');
  };

  // Check login requirement for protected actions
  const checkAuth = (): boolean => {
    if (!user || !user.idToken) {
      showErrorMessage('Vui lòng đăng nhập bằng tài khoản Google @fpt.edu.vn để thực hiện thao tác này');
      if (window.google?.accounts?.id) {
        window.google.accounts.id.prompt();
      }
      return false;
    }
    return true;
  };

  // GET Data from Apps Script Backend
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) {
        throw new Error(`Mã lỗi HTTP: ${res.status}`);
      }
      const json = await res.json();
      if (json && json.success && Array.isArray(json.data)) {
        const apiFormatted: QuyTrinhItem[] = json.data.map((item: any) => ({
          ...item,
          tt: String(item.tt ?? ''),
          mang: normalizeCategory(item.mang),
          phuTrach: item.phuTrach ? String(item.phuTrach).trim() : '',
          taiLieu: Array.isArray(item.taiLieu)
            ? item.taiLieu.map((doc: TaiLieu) => ({
                ...doc,
                embedLink: doc.link
                  ? doc.link.replace(/\/edit.*$/, '/preview').replace(/\/view.*$/, '/preview')
                  : '',
              }))
            : [],
        }));

        // Keep all 17 items for "Khối chủ nhiệm" and full dataset intact by merging any missing items
        const apiTtSet = new Set(apiFormatted.map((p) => p.tt));
        const apiNameSet = new Set(apiFormatted.map((p) => p.quyTrinh?.trim().toLowerCase()));

        const missingStaticItems = initialQuyTrinhData
          .map((item) => ({ ...item, mang: normalizeCategory(item.mang) }))
          .filter(
            (item) =>
              !apiTtSet.has(item.tt) &&
              !apiNameSet.has(item.quyTrinh?.trim().toLowerCase())
          );

        const mergedData = [...apiFormatted, ...missingStaticItems];
        setData(mergedData);

        // Keep active detail view in sync
        setSelectedProcedure((prev) => {
          if (!prev) return null;
          return mergedData.find((p) => p.tt === prev.tt) || prev;
        });
      } else if (json && json.error) {
        showErrorMessage(json.error);
        // Fallback to static initial dataset if backend error
        setData(initialQuyTrinhData.map((item) => ({ ...item, mang: normalizeCategory(item.mang) })));
      } else {
        showErrorMessage('Dữ liệu trả về từ Google Sheet không đúng định dạng');
        setData(initialQuyTrinhData.map((item) => ({ ...item, mang: normalizeCategory(item.mang) })));
      }
    } catch (err: any) {
      console.error('Fetch error:', err);
      showErrorMessage(`Không thể kết nối đến máy chủ Google Apps Script: ${err.message || 'Lỗi mạng'}`);
      setData(initialQuyTrinhData.map((item) => ({ ...item, mang: normalizeCategory(item.mang) })));
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch data on initial mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Derive unique categories with item counts
  const categoriesWithCounts = useMemo(() => {
    const countsMap: Record<string, number> = {};
    data.forEach((item) => {
      const cat = normalizeCategory(item.mang);
      countsMap[cat] = (countsMap[cat] || 0) + 1;
    });

    return Object.keys(countsMap).map((catName) => ({
      name: catName,
      count: countsMap[catName],
    }));
  }, [data]);

  // Set default active tab (category with highest count)
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
      result = result.filter((p) => normalizeCategory(p.mang) === normalizeCategory(selectedCategory));
    }

    return result;
  }, [data, selectedCategory, searchTerm]);

  // Active category procedure count
  const activeCategoryCount = useMemo(() => {
    return data.filter((p) => normalizeCategory(p.mang) === normalizeCategory(selectedCategory)).length;
  }, [data, selectedCategory]);

  // Handlers
  const handleSelectProcedure = (item: QuyTrinhItem) => {
    setSelectedProcedure(item);
  };

  const handleOpenAddModal = () => {
    if (!checkAuth()) return;
    setEditingProcedure(null);
    setIsEditModalOpen(true);
  };

  const handleEditProcedure = (item: QuyTrinhItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!checkAuth()) return;
    setEditingProcedure(item);
    setIsEditModalOpen(true);
  };

  // POST Add / Edit procedure
  const handleSaveProcedure = async (savedItem: QuyTrinhItem) => {
    if (!checkAuth()) return;

    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      const isEdit = Boolean(editingProcedure && savedItem.tt);
      const action = isEdit ? 'edit' : 'add';

      const firstDoc = savedItem.taiLieu && savedItem.taiLieu.length > 0 ? savedItem.taiLieu[0] : null;

      const payload: any = {
        action,
        idToken: user!.idToken,
        mang: savedItem.mang,
        phuTrach: savedItem.phuTrach,
        quyTrinh: savedItem.quyTrinh,
        boPhan: savedItem.boPhan || '',
        noiDung: savedItem.noiDung || '',
        sanPham: savedItem.sanPham || '',
        loaiDeXuat: savedItem.loaiDeXuat || '',
        linhVucDeXuat: savedItem.linhVucDeXuat || '',
        taiLieu: firstDoc && firstDoc.link ? [{ ten: firstDoc.ten || savedItem.sanPham || savedItem.quyTrinh, link: firstDoc.link }] : [],
      };

      if (isEdit) {
        payload.tt = savedItem.tt;
      }

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (json && json.success) {
        showToast(isEdit ? 'Cập nhật quy trình thành công!' : 'Thêm quy trình mới thành công!');
        setIsEditModalOpen(false);
        await fetchData(); // Refresh data to get server re-indexed list
      } else {
        const errMsg = json?.error || 'Có lỗi xảy ra khi lưu quy trình vào Google Sheet';
        showErrorMessage(errMsg);
      }
    } catch (err: any) {
      console.error('Save error:', err);
      showErrorMessage(`Lỗi lưu dữ liệu: ${err.message || 'Không kết nối được với máy chủ'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Save single link from ProcedureDetailView
  const handleSaveLink = async (item: QuyTrinhItem, newTen: string, newLink: string): Promise<boolean> => {
    if (!checkAuth()) return false;

    setErrorMessage(null);
    try {
      const payload = {
        action: 'edit',
        idToken: user!.idToken,
        tt: item.tt,
        mang: item.mang,
        phuTrach: item.phuTrach,
        quyTrinh: item.quyTrinh,
        boPhan: item.boPhan || '',
        noiDung: item.noiDung || '',
        sanPham: item.sanPham || '',
        loaiDeXuat: item.loaiDeXuat || '',
        linhVucDeXuat: item.linhVucDeXuat || '',
        taiLieu: newLink ? [{ ten: newTen || item.sanPham || item.quyTrinh, link: newLink }] : [],
      };

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (json && json.success) {
        showToast('Đã gắn link tài liệu Google Docs thành công!');
        await fetchData(); // Refresh data
        return true;
      } else {
        showErrorMessage(json?.error || 'Không thể cập nhật link tài liệu');
        return false;
      }
    } catch (err: any) {
      console.error('Save link error:', err);
      showErrorMessage(`Lỗi lưu link: ${err.message || 'Không kết nối được với máy chủ'}`);
      return false;
    }
  };

  // POST Delete procedure
  const handleDeleteProcedure = async (item: QuyTrinhItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!checkAuth()) return;

    if (confirm(`Bạn có chắc chắn muốn xóa quy trình "${item.quyTrinh}"?`)) {
      setErrorMessage(null);
      try {
        const payload = {
          action: 'delete',
          idToken: user!.idToken,
          tt: item.tt,
        };

        const res = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify(payload),
        });

        const json = await res.json();

        if (json && json.success) {
          showToast(`Đã xóa quy trình "${item.quyTrinh}"`);
          if (selectedProcedure?.tt === item.tt) {
            setSelectedProcedure(null);
          }
          await fetchData(); // Server re-indexes tt, must re-fetch full list
        } else {
          showErrorMessage(json?.error || 'Không thể xóa quy trình này');
        }
      } catch (err: any) {
        console.error('Delete error:', err);
        showErrorMessage(`Lỗi xóa dữ liệu: ${err.message || 'Không kết nối được với máy chủ'}`);
      }
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

      {/* Server Error Alert Banner / Modal */}
      {errorMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-lg bg-red-600 text-white p-4 rounded-xl shadow-2xl border border-red-700 flex items-start justify-between gap-3 animate-in slide-in-from-top-4 duration-200">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-amber-300" />
            <div className="space-y-0.5">
              <h4 className="font-bold text-xs">Thông báo từ hệ thống</h4>
              <p className="text-xs text-red-100 leading-snug">{errorMessage}</p>
            </div>
          </div>
          <button
            onClick={() => setErrorMessage(null)}
            className="p-1 hover:bg-red-700 rounded transition-colors cursor-pointer shrink-0 text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 1. Header (Google Login integration) */}
      <Header
        totalProcedures={data.length}
        user={user}
        oauthClientId={OAUTH_CLIENT_ID}
        onLoginCredential={handleCredentialResponse}
        onLogout={handleLogout}
      />

      {/* 2. Sub-Toolbar (+ Thêm quy trình green button + Breadcrumb + Search + Refresh) */}
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
        onResetData={fetchData}
        isLoading={isLoading}
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
        {isLoading && data.length === 0 ? (
          /* Loading State */
          <div className="py-24 px-4 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-900 flex items-center justify-center mx-auto border border-blue-200 shadow-xs">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
            <h3 className="text-base font-bold text-slate-800">Đang tải dữ liệu từ Google Sheet...</h3>
            <p className="text-xs text-slate-500">Vui lòng chờ trong giây lát</p>
          </div>
        ) : !selectedProcedure ? (
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
            onRefresh={fetchData}
            onSaveLink={handleSaveLink}
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
              onClick={fetchData}
              className="hover:text-slate-600 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Loader2 className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Đồng bộ từ Google Sheet</span>
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
        isSubmitting={isSubmitting}
      />

    </div>
  );
}


