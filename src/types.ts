export interface TaiLieu {
  ten: string;
  link: string;
  embedLink: string;
}

export interface QuyTrinhItem {
  tt: string;
  mang: string;
  phuTrach: string;
  quyTrinh: string;
  trangThai: string;
  sanPham: string;
  boPhan: string;
  noiDung: string;
  taiLieu: TaiLieu[];
  tomTat: string;
  loaiDeXuat: string;
  linhVucDeXuat: string;
}
