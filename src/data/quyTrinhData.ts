import { QuyTrinhItem } from '../types';

export const initialQuyTrinhData: QuyTrinhItem[] = [
  {
    "tt": "1",
    "mang": "TC&QLĐT",
    "phuTrach": "TC&QLĐT",
    "quyTrinh": "Quy trình tổ chức khảo thí",
    "trangThai": "Chưa xác định",
    "sanPham": "",
    "boPhan": "Tổ chức và Quản lý Đào tạo",
    "noiDung": "Chuẩn hóa Quy trình thực hiện và phối hợp giữa các bộ phận\n- Đề xuất GV chỉ sinh 2 mã đề cho 1 bộ đề có yếu tố trắc nghiệm\n- TCM đóng gói đề dưới dạng file PDF; căn chỉnh độ dài đề tối ưu không quá 4 trang (trừ các trường hợp bất khả kháng)\n- Gửi đề file off, không gửi link online. Trường hợp file nặng thì tách ra gửi nhiều lần\n- Thực hiện công tác tập huấn coi kiểm tra duy nhất 1 lần đầu năm học, hình thức trực tiếp (chủ yếu phục vụ giáo viên mới)\n- Các đợt còn lại GV tự nghiên cứu Sổ tay hướng dẫn và tra cứu thông tin thông qua mini Chatbot nhắc việc\nTăng tốc độ ghép điểm theo phách\n- Gửi template nhập điểm theo phách ngay trong buổi thi\n- Xây dựng Web App cho phép giáo viên tải lên file chấm điểm theo phách, hệ thống tự trả lại danh sách điểm sau ghép phách",
    "taiLieu": [
      {
        "ten": "Quy trình tổ chức khảo thí",
        "link": "https://docs.google.com/document/d/17VAnCQNzpzQmQlFGKnbs-mSEgXm4RHj1/edit?usp=drive_link&ouid=117049086116373800124&rtpof=true&sd=true",
        "embedLink": "https://docs.google.com/document/d/17VAnCQNzpzQmQlFGKnbs-mSEgXm4RHj1/preview"
      }
    ],
    "tomTat": "Quy trình tổ chức khảo thí",
    "loaiDeXuat": "Cải tiến",
    "linhVucDeXuat": "Quy trình tổ chức khảo thí"
  },
  {
    "tt": "2",
    "mang": "TCM",
    "phuTrach": "Tự nhiên",
    "quyTrinh": "Quy trình tổ chức lớp học phụ đạo, đội tuyển, ôn thi HSG",
    "trangThai": "Chưa xác định",
    "sanPham": "",
    "boPhan": "Tổ chức và Quản lý Đào tạo",
    "noiDung": "Chuẩn hóa Quy trình thực hiện\n- Cả Ban làm 1 kế hoạch tổng hợp đầu năm học:\n+ Các TCM gửi Kế hoạch cho PĐT (hoặc có thể điền link tổng hợp) trước thời điểm triển chậm nhất 10 ngày\n+ PĐT dựa trên PCCM/đề xuất xếp lịch tiến hành lên TKB phụ đạo đảm bảo 1 HS có thể học tất cả các lớp phụ đạo trong khối lớp\n+ PĐT lập KH tổng hợp gửi CEO phê duyệt cho cả năm học\n- Trong quá trình triển khai, Trưởng Ban Đào tạo sẽ quyết định thời điểm nào nghỉ tạm thời (trong hoặc sau thời gian kiểm tra định kỳ, hoạt động dã ngoại, sự kiện...)\n- Kết thúc các đợt kiểm tra định kỳ, TCM báo vào luồng mail về việc có cập nhật danh sách phụ đạo hay không\nThực hiện báo cáo định kỳ\n- CB Đào tạo sử dụng dữ liệu thống kê điểm khảo sát đầu năm, điểm kiểm tra định kỳ để phân tích hiệu quả các lớp học Phụ đạo",
    "taiLieu": [],
    "tomTat": "Quy trình tổ chức lớp học phụ đạo, đội tuyển, ôn thi HSG",
    "loaiDeXuat": "Cải tiến",
    "linhVucDeXuat": "Quy trình tổ chức lớp học phụ đạo"
  },
  {
    "tt": "3",
    "mang": "TC&QLĐT",
    "phuTrach": "TC&QLĐT",
    "quyTrinh": "Hướng dẫn công việc nhập, xuất, quản lý dữ liệu trải nghiệm",
    "trangThai": "Chưa xác định",
    "sanPham": "",
    "boPhan": "Tổ chức và Quản lý Đào tạo",
    "noiDung": "Giải pháp quản lý tập trung dữ liệu\n- Xây dựng một Web App có các tính năng:\n+ Cho phép GV nhập dữ liệu trải nghiệm đã được kiểm soát format và cấu trúc\n+ Phân quyền truy cập dữ liệu cho đầu mối CTHS và ĐT\n+ Cho phép trích xuất dữ liệu đã được phân nhóm (dữ liệu về sự kiện, hoạt động trải nghiệm nội bộ cho CTHS; dữ liệu thành tích thi ngoài cho ĐT)\n+ Có Dashboard thống kê thành tích\nCấu trúc cơ sở dữ liệu trải nghiệm\n- Xây dựng bộ quy tắc ghi nhận dữ liệu trải nghiệm",
    "taiLieu": [
      {
        "ten": "Hướng dẫn công việc nhập, xuất, quản lý dữ liệu trải nghiệm",
        "link": "https://docs.google.com/document/d/1pzLTDa9hKcWhKXvRlTI5ELoPI4T1R-gh/edit?usp=sharing&ouid=117049086116373800124&rtpof=true&sd=true",
        "embedLink": "https://docs.google.com/document/d/1pzLTDa9hKcWhKXvRlTI5ELoPI4T1R-gh/preview"
      }
    ],
    "tomTat": "Hướng dẫn công việc nhập, xuất, quản lý dữ liệu trải nghiệm",
    "loaiDeXuat": "Cải tiến",
    "linhVucDeXuat": "Hướng dẫn công việc nhập, xuất, quản lý dữ liệu trải nghiệm"
  },
  {
    "tt": "4",
    "mang": "CTHS",
    "phuTrach": "CTHS",
    "quyTrinh": "Quy trình ghi nhận bảng điểm trải nghiệm",
    "trangThai": "Chưa xác định",
    "sanPham": "",
    "boPhan": "Khối THCS",
    "noiDung": "*Bảng điểm trải nghiệm\n- Thống nhất các nội dung ghi nhận trong bảng điểm trải nghiệm: Nội dung ghi nhận trải nghiệm; Nội dung ghi nhận thành tích.\n- Xây dựng chuẩn hoá quy trình và nhiệm vụ, thời gian trong việc ghi nhận thành tích trong Bảng điểm TN cho học sinh.\n- Review theo tháng BĐTN.\n*Bảng điểm học tập\n- Xây dựng hướng dẫn nhận xét bảng điểm học tập chi tiết đến từng đối tượng môn học: Vởi FSP thì như thế nào? Với CSDL thì như thế nào? Nội dung nhận xét là gì? Thời gian nhận xét cần hoàn thành bao lâu kể trước ngày họp PHHS...\n*Xử lí kỉ luật\n- Xây dựng kho các hình thức kỉ luật tích cực.\n- Xây dựng rõ ràng quy trình xử lí kỷ luật, sự vụ.\n- Quy định và triển khai rõ ràng về việc phòng ban đối tượng nào sẽ ghi nhận các biên bản sự vụ/khi sảy ra sự vụ vai trò của GVCN & GTHĐ là gì? \n- Quy định về cách thức phối hợp và thông báo, thông tin về sự vụ trong ngày/trong tiết\n=> Các nội dung hướng dẫn và quy trình cần ngắn gọn, được gọi tên và chia bước, phân cấp đối tượng rõ ràng.\n*Quy trình triển khai thông tin, phối hợp tổ chức các sự kiện\n- Phân cấp triển khai thông tin => Tối ưu thời gian tránh việc tham gia họp nhiều lần.\n- Phân bước rõ ràng cách thức triển khai thông tin 01 sự kiện => Thống nhất 01 công cụ triển khai và thời gian gửi thông tin triển khai.\n- Thống nhất phối hợp & thông tin trong việc lấy học sinh tham gia các sự kiện: Lấy học sinh trong thời gian như thế nào? Gửi thông tin đến ai để xin học sinh...\n*Thống nhất quy định về việc đón trả học sinh trong thời gian học tập.\n*Quy trình triển khai tổ chức các lớp học sau giờ.",
    "taiLieu": [],
    "tomTat": "Quy trình ghi nhận bảng điểm trải nghiệm",
    "loaiDeXuat": "",
    "linhVucDeXuat": "Vận hành"
  },
  {
    "tt": "5",
    "mang": "TCM",
    "phuTrach": "Xã hội",
    "quyTrinh": "Quy trình nhận xét học sinh trong sổ điểm",
    "trangThai": "Chưa xác định",
    "sanPham": "",
    "boPhan": "",
    "noiDung": "",
    "taiLieu": [],
    "tomTat": "Quy trình nhận xét học sinh trong sổ điểm",
    "loaiDeXuat": "",
    "linhVucDeXuat": ""
  },
  {
    "tt": "7",
    "mang": "DVHS",
    "phuTrach": "DVHS",
    "quyTrinh": "Quy trình đón - trả  học sinh",
    "trangThai": "Chưa xác định",
    "sanPham": "",
    "boPhan": "Tổ Tiểu học",
    "noiDung": "Quy trình đón - trả  học sinh",
    "taiLieu": [],
    "tomTat": "Quy trình đón - trả  học sinh",
    "loaiDeXuat": "",
    "linhVucDeXuat": "Nhóm quy trình rèn nền nếp HS Tiểu học"
  },
  {
    "tt": "8",
    "mang": "Khối chủ nhiệm",
    "phuTrach": "TH",
    "quyTrinh": "Hướng dẫn xây dựng nội quy và văn hóa lớp học - TH",
    "trangThai": "Chưa xác định",
    "sanPham": "",
    "boPhan": "",
    "noiDung": "Hướng dẫn xây dựng nội quy và văn hóa lớp học",
    "taiLieu": [
      {
        "ten": "Hướng dẫn xây dựng nội quy và văn hóa lớp học - TH",
        "link": "https://docs.google.com/document/d/1bq286PAzx7WhyU9o27z5uhYJ0ugfmOF2/edit?usp=sharing&ouid=115941244450785559380&rtpof=true&sd=true",
        "embedLink": "https://docs.google.com/document/d/1bq286PAzx7WhyU9o27z5uhYJ0ugfmOF2/preview"
      }
    ],
    "tomTat": "Hướng dẫn xây dựng nội quy và văn hóa lớp học - TH",
    "loaiDeXuat": "",
    "linhVucDeXuat": ""
  },
  {
    "tt": "9",
    "mang": "DVHS",
    "phuTrach": "DVHS",
    "quyTrinh": "Quy trình quản lý ăn - ngủ bán trú",
    "trangThai": "Chưa xác định",
    "sanPham": "",
    "boPhan": "",
    "noiDung": "Quy trình hướng dẫn xếp hàng và di chuyển trong trường",
    "taiLieu": [],
    "tomTat": "Quy trình quản lý ăn - ngủ bán trú",
    "loaiDeXuat": "",
    "linhVucDeXuat": ""
  },
  {
    "tt": "10",
    "mang": "TCM",
    "phuTrach": "TH",
    "quyTrinh": "Quy trình rèn nề nếp học sinh - TH",
    "trangThai": "Chưa xác định",
    "sanPham": "",
    "boPhan": "",
    "noiDung": "Quy trình quản lý giờ ăn - ngủ  bán trú",
    "taiLieu": [
      {
        "ten": "Quy trình rèn nề nếp học sinh - TH",
        "link": "https://docs.google.com/document/d/1KdLdC1uUeabKlyIvTzsmtFX1OVIDSnIh/edit?usp=sharing&ouid=115941244450785559380&rtpof=true&sd=true",
        "embedLink": "https://docs.google.com/document/d/1KdLdC1uUeabKlyIvTzsmtFX1OVIDSnIh/preview"
      }
    ],
    "tomTat": "Quy trình rèn nề nếp học sinh - TH",
    "loaiDeXuat": "",
    "linhVucDeXuat": ""
  },
  {
    "tt": "11",
    "mang": "CTHS",
    "phuTrach": "CTHS",
    "quyTrinh": "Quy trình khen thưởng HS",
    "trangThai": "Chưa xác định",
    "sanPham": "",
    "boPhan": "",
    "noiDung": "",
    "taiLieu": [],
    "tomTat": "Quy trình khen thưởng HS",
    "loaiDeXuat": "",
    "linhVucDeXuat": ""
  },
  {
    "tt": "12",
    "mang": "Khối chủ nhiệm",
    "phuTrach": "TrH",
    "quyTrinh": "Hướng dẫn xây dựng nội quy và văn hóa lớp học - TrH",
    "trangThai": "Chưa xác định",
    "sanPham": "",
    "boPhan": "",
    "noiDung": "Quy trình khen thưởng và ghi nhận hành vi tích cực cho HS",
    "taiLieu": [
      {
        "ten": "Hướng dẫn xây dựng nội quy và văn hóa lớp học - TrH",
        "link": "https://docs.google.com/document/d/1L168PrfF23unz178uKT15nvY-saZOmWG/edit?usp=share_link&ouid=118102972575303796752&rtpof=true&sd=true",
        "embedLink": "https://docs.google.com/document/d/1L168PrfF23unz178uKT15nvY-saZOmWG/preview"
      }
    ],
    "tomTat": "Hướng dẫn xây dựng nội quy và văn hóa lớp học - TrH",
    "loaiDeXuat": "",
    "linhVucDeXuat": ""
  },
  {
    "tt": "14",
    "mang": "TCM",
    "phuTrach": "TH",
    "quyTrinh": "Quy trình nhận xét học sinh tháng - TH",
    "trangThai": "Chưa xác định",
    "sanPham": "",
    "boPhan": "",
    "noiDung": "Quy trình nhận xét học sinh hàng tháng",
    "taiLieu": [
      {
        "ten": "Quy trình nhận xét học sinh tháng - TH",
        "link": "https://docs.google.com/document/d/1kvrJYlDxXZFBy58u-PTRhwdnGMCMLyfk/edit?usp=drive_link&ouid=115941244450785559380&rtpof=true&sd=true",
        "embedLink": "https://docs.google.com/document/d/1kvrJYlDxXZFBy58u-PTRhwdnGMCMLyfk/preview"
      }
    ],
    "tomTat": "Quy trình nhận xét học sinh tháng - TH",
    "loaiDeXuat": "",
    "linhVucDeXuat": ""
  },
  {
    "tt": "15",
    "mang": "TCM",
    "phuTrach": "TH",
    "quyTrinh": "Quy trình giao và kiểm soát bài tập về nhà",
    "trangThai": "Chưa xác định",
    "sanPham": "",
    "boPhan": "",
    "noiDung": "Quy trình giao và kiểm soát bài tập về nhà.",
    "taiLieu": [
      {
        "ten": "Quy trình giao và kiểm soát bài tập về nhà",
        "link": "https://docs.google.com/document/d/1EbuVRWd2M6C34WCS4KJuDFz5d2HmNCYP/edit?usp=sharing&ouid=115941244450785559380&rtpof=true&sd=true",
        "embedLink": "https://docs.google.com/document/d/1EbuVRWd2M6C34WCS4KJuDFz5d2HmNCYP/preview"
      }
    ],
    "tomTat": "Quy trình giao và kiểm soát bài tập về nhà",
    "loaiDeXuat": "",
    "linhVucDeXuat": ""
  },
  {
    "tt": "16",
    "mang": "TCM",
    "phuTrach": "TH",
    "quyTrinh": "Hướng dẫn rèn chữ viết cho HS - TH",
    "trangThai": "Chưa xác định",
    "sanPham": "",
    "boPhan": "",
    "noiDung": "Quy trình rèn chữ viết cho HS Tiểu học",
    "taiLieu": [
      {
        "ten": "Hướng dẫn rèn chữ viết cho HS - TH",
        "link": "https://docs.google.com/document/d/1IxVWQ99k-ZXRhwUjQKWAy_17CaK2SXia/edit?usp=sharing&ouid=115941244450785559380&rtpof=true&sd=true",
        "embedLink": "https://docs.google.com/document/d/1IxVWQ99k-ZXRhwUjQKWAy_17CaK2SXia/preview"
      }
    ],
    "tomTat": "Hướng dẫn rèn chữ viết cho HS - TH",
    "loaiDeXuat": "",
    "linhVucDeXuat": ""
  },
  {
    "tt": "17",
    "mang": "TS&TT",
    "phuTrach": "TS&TT",
    "quyTrinh": "Quy trình xử lý khủng hoảng truyền thông",
    "trangThai": "Chưa xác định",
    "sanPham": "",
    "boPhan": "",
    "noiDung": "Quy trình xử lý khủng hoảng truyền thông lớp học",
    "taiLieu": [],
    "tomTat": "Quy trình xử lý khủng hoảng truyền thông",
    "loaiDeXuat": "",
    "linhVucDeXuat": ""
  },
  {
    "tt": "18",
    "mang": "VP",
    "phuTrach": "VP",
    "quyTrinh": "Quy trình phối hợp xử lí các vấn đề sức khoẻ của HS - Y tế",
    "trangThai": "Chưa xác định",
    "sanPham": "",
    "boPhan": "",
    "noiDung": "Quy trình phối hợp với bộ phận y tế học đường",
    "taiLieu": [],
    "tomTat": "Quy trình phối hợp xử lí các vấn đề sức khoẻ của HS - Y tế",
    "loaiDeXuat": "",
    "linhVucDeXuat": ""
  },
  {
    "tt": "19",
    "mang": "TCM",
    "phuTrach": "PDP",
    "quyTrinh": "Quy trình bàn giao công việc khi giáo viên nghỉ việc",
    "trangThai": "Chưa xác định",
    "sanPham": "Phần thông tin với các bộ phận có liên quan (bàn giao GVCN, với chuyên môn, với PĐT)",
    "boPhan": "",
    "noiDung": "Quy trình bàn giao công việc khi giáo viên nghỉ hoặc đổi tiết",
    "taiLieu": [
      {
        "ten": "Phần thông tin với các bộ phận có liên quan (bàn giao GVCN, với chuyên môn, với PĐT)",
        "link": "https://docs.google.com/document/d/1a36GUiCaosBqaucUTfu_87KQvgmf_VTh/edit?usp=sharing&ouid=100463583246226251081&rtpof=true&sd=true",
        "embedLink": "https://docs.google.com/document/d/1a36GUiCaosBqaucUTfu_87KQvgmf_VTh/preview"
      }
    ],
    "tomTat": "Quy trình bàn giao công việc khi giáo viên nghỉ việc",
    "loaiDeXuat": "",
    "linhVucDeXuat": ""
  },
  {
    "tt": "20",
    "mang": "TC&QLĐT",
    "phuTrach": "TC&QLĐT",
    "quyTrinh": "Quy trình điểm danh HS trên FSP",
    "trangThai": "Chưa xác định",
    "sanPham": "",
    "boPhan": "DucNN16",
    "noiDung": "Quy trình điểm danh 5 bước",
    "taiLieu": [
      {
        "ten": "Quy trình điểm danh HS trên FSP",
        "link": "https://docs.google.com/document/d/1jTPhQudjM_T7y9MNF7rTmHt9xucp1s6C/edit?usp=sharing&ouid=117049086116373800124&rtpof=true&sd=true",
        "embedLink": "https://docs.google.com/document/d/1jTPhQudjM_T7y9MNF7rTmHt9xucp1s6C/preview"
      }
    ],
    "tomTat": "Quy trình điểm danh HS trên FSP",
    "loaiDeXuat": "Cải tiến",
    "linhVucDeXuat": ""
  },
  {
    "tt": "21",
    "mang": "TCM",
    "phuTrach": "PDP",
    "quyTrinh": "Quy trình đăng kí sử dụng phòng chức năng",
    "trangThai": "Chưa xác định",
    "sanPham": "",
    "boPhan": "",
    "noiDung": "Quy trình đăng kí sử dụng phòng chức năng",
    "taiLieu": [
      {
        "ten": "Quy trình đăng kí sử dụng phòng chức năng",
        "link": "https://docs.google.com/document/d/1DWw63ssKL8K942CQwGaWPSdkodZtE8Y3/edit?usp=sharing&ouid=100463583246226251081&rtpof=true&sd=true",
        "embedLink": "https://docs.google.com/document/d/1DWw63ssKL8K942CQwGaWPSdkodZtE8Y3/preview"
      }
    ],
    "tomTat": "Quy trình đăng kí sử dụng phòng chức năng",
    "loaiDeXuat": "Viết mới",
    "linhVucDeXuat": ""
  },
  {
    "tt": "22",
    "mang": "TC&QLĐT",
    "phuTrach": "TC&QLĐT",
    "quyTrinh": "Quy trình đổi tiết (khẩn cấp, có KH)",
    "trangThai": "Chưa xác định",
    "sanPham": "",
    "boPhan": "",
    "noiDung": "Quy trình đổi tiết (khẩn cấp, có KH)",
    "taiLieu": [
      {
        "ten": "Quy trình đổi tiết (khẩn cấp, có KH)",
        "link": "https://docs.google.com/document/d/1T05Gx-7z5tdqtpOK_0Fki5Xt-j05WnUu/edit?usp=sharing&ouid=117049086116373800124&rtpof=true&sd=true",
        "embedLink": "https://docs.google.com/document/d/1T05Gx-7z5tdqtpOK_0Fki5Xt-j05WnUu/preview"
      }
    ],
    "tomTat": "Quy trình đổi tiết (khẩn cấp, có KH)",
    "loaiDeXuat": "Cải tiến",
    "linhVucDeXuat": ""
  },
  {
    "tt": "24",
    "mang": "Khối chủ nhiệm",
    "phuTrach": "Ngocdtb20+ HieuNH39",
    "quyTrinh": "Quy trình xử lí sự vụ của HS",
    "trangThai": "Chưa xác định",
    "sanPham": "",
    "boPhan": "",
    "noiDung": "Quy trình xử lí sự vụ của HS",
    "taiLieu": [],
    "tomTat": "Quy trình xử lí sự vụ của HS",
    "loaiDeXuat": "Viết mới",
    "linhVucDeXuat": ""
  },
  {
    "tt": "25",
    "mang": "Khối chủ nhiệm",
    "phuTrach": "Ngocdtb20+ HieuNH39",
    "quyTrinh": "Quy trình nhận diện và hỗ trợ các vấn đề tâm lí của HS",
    "trangThai": "Chưa xác định",
    "sanPham": "",
    "boPhan": "",
    "noiDung": "Quy trình nhận diện và hỗ trợ các vấn đề tâm lí của HS",
    "taiLieu": [
      {
        "ten": "Quy trình nhận diện và hỗ trợ các vấn đề tâm lí của HS",
        "link": "https://docs.google.com/document/d/1SsiMnjLcQJYPy4JPgNi6xf1vTVqfaCaH/edit?usp=sharing&ouid=118102972575303796752&rtpof=true&sd=true",
        "embedLink": "https://docs.google.com/document/d/1SsiMnjLcQJYPy4JPgNi6xf1vTVqfaCaH/preview"
      }
    ],
    "tomTat": "Quy trình nhận diện và hỗ trợ các vấn đề tâm lí của HS",
    "loaiDeXuat": "Viết mới",
    "linhVucDeXuat": ""
  },
  {
    "tt": "26",
    "mang": "Khối chủ nhiệm",
    "phuTrach": "HieuNH39",
    "quyTrinh": "Quy trình tiếp nhận và xử lý phản hồi, khiếu nại của PHHS",
    "trangThai": "Chưa xác định",
    "sanPham": "",
    "boPhan": "",
    "noiDung": "Quy trình tiếp nhận và xử lý phản hồi, khiếu nại của phụ huynh",
    "taiLieu": [
      {
        "ten": "Quy trình tiếp nhận và xử lý phản hồi, khiếu nại của PHHS",
        "link": "https://docs.google.com/document/d/1FVo5uZL2klGR9o5pgPICvCHmM9cYlICo/edit?usp=sharing&ouid=118102972575303796752&rtpof=true&sd=true",
        "embedLink": "https://docs.google.com/document/d/1FVo5uZL2klGR9o5pgPICvCHmM9cYlICo/preview"
      }
    ],
    "tomTat": "Quy trình tiếp nhận và xử lý phản hồi, khiếu nại của PHHS",
    "loaiDeXuat": "Viết mới",
    "linhVucDeXuat": ""
  },
  {
    "tt": "27",
    "mang": "TC&QLĐT",
    "phuTrach": "TC&QLĐT",
    "quyTrinh": "Quy trình chuyển trường, thôi học",
    "trangThai": "Chưa xác định",
    "sanPham": "",
    "boPhan": "",
    "noiDung": "Quy trình chuyển trường, thôi học",
    "taiLieu": [],
    "tomTat": "Quy trình chuyển trường, thôi học",
    "loaiDeXuat": "Viết mới",
    "linhVucDeXuat": ""
  },
  {
    "tt": "28",
    "mang": "TC&QLĐT",
    "phuTrach": "TC&QLĐT",
    "quyTrinh": "Quy trình xếp lớp",
    "trangThai": "Chưa xác định",
    "sanPham": "",
    "boPhan": "",
    "noiDung": "Quy trình xếp lớp",
    "taiLieu": [],
    "tomTat": "Quy trình xếp lớp",
    "loaiDeXuat": "Viết mới",
    "linhVucDeXuat": ""
  },
  {
    "tt": "29",
    "mang": "TCM",
    "phuTrach": "Tự nhiên+ Xã hội + Tiểu học",
    "quyTrinh": "Danh mục các loại hồ sơ chuyên môn dành cho GV (danh mục, hướng dẫn thực hiện, biểu mẫu)",
    "trangThai": "Chưa xác định",
    "sanPham": "Đầu mối Tự nhiên",
    "boPhan": "",
    "noiDung": "Danh mục các loại hồ sơ chuyên môn dành cho GV (danh mục, hướng dẫn thực hiện, biểu mẫu)",
    "taiLieu": [],
    "tomTat": "Danh mục các loại hồ sơ chuyên môn dành cho GV (danh mục, hướng dẫn thực hiện, biểu mẫu)",
    "loaiDeXuat": "Cải tiến",
    "linhVucDeXuat": ""
  },
  {
    "tt": "30",
    "mang": "Khối chủ nhiệm",
    "phuTrach": "Ngocdtb20+ HieuNH39",
    "quyTrinh": "Danh mục các loại hồ sơ chuyên môn dành cho GVCN lớp (danh mục, hướng dẫn thực hiện, biểu mẫu)",
    "trangThai": "Chưa xác định",
    "sanPham": "",
    "boPhan": "",
    "noiDung": "Danh mục các loại hồ sơ chuyên môn dành cho GVCN lớp (danh mục, hướng dẫn thực hiện, biểu mẫu)",
    "taiLieu": [
      {
        "ten": "Danh mục các loại hồ sơ chuyên môn dành cho GVCN lớp (danh mục, hướng dẫn thực hiện, biểu mẫu)",
        "link": "https://docs.google.com/document/d/1jPYpqcGq5IlMhEXukAICF-JyBCnvMalF/edit?usp=share_link&ouid=118102972575303796752&rtpof=true&sd=truee",
        "embedLink": "https://docs.google.com/document/d/1jPYpqcGq5IlMhEXukAICF-JyBCnvMalF/preview"
      }
    ],
    "tomTat": "Danh mục các loại hồ sơ chuyên môn dành cho GVCN lớp (danh mục, hướng dẫn thực hiện, biểu mẫu)",
    "loaiDeXuat": "Cải tiến",
    "linhVucDeXuat": ""
  },
  {
    "tt": "31",
    "mang": "TCM",
    "phuTrach": "Tự nhiên+ Xã hội + Tiểu học",
    "quyTrinh": "Danh mục các loại hồ sơ chuyên môn dành cho TTCM (danh mục, hướng dẫn thực hiện, biểu mẫu)",
    "trangThai": "Chưa xác định",
    "sanPham": "Đầu mối Tự nhiên",
    "boPhan": "",
    "noiDung": "Danh mục các loại hồ sơ chuyên môn dành cho TTCM (danh mục, hướng dẫn thực hiện, biểu mẫu)",
    "taiLieu": [],
    "tomTat": "Danh mục các loại hồ sơ chuyên môn dành cho TTCM (danh mục, hướng dẫn thực hiện, biểu mẫu)",
    "loaiDeXuat": "Cải tiến",
    "linhVucDeXuat": ""
  },
  {
    "tt": "32",
    "mang": "TCM",
    "phuTrach": "Tiếng Anh",
    "quyTrinh": "Quy trình triển khai các cuộc thi, sân chơi",
    "trangThai": "Chưa xác định",
    "sanPham": "",
    "boPhan": "",
    "noiDung": "Quy trình triển khai các cuộc thi, sân chơi",
    "taiLieu": [],
    "tomTat": "Quy trình triển khai các cuộc thi, sân chơi",
    "loaiDeXuat": "Viết mới",
    "linhVucDeXuat": ""
  },
  {
    "tt": "33",
    "mang": "TCM",
    "phuTrach": "Xã hội",
    "quyTrinh": "Quy trình đảm bảo kỉ luật trong giờ học & xử lí sự cố",
    "trangThai": "Chưa xác định",
    "sanPham": "",
    "boPhan": "",
    "noiDung": "Quy trình đảm bảo kỉ luật trong giờ học & xử lí sự cố",
    "taiLieu": [],
    "tomTat": "Quy trình đảm bảo kỉ luật trong giờ học & xử lí sự cố",
    "loaiDeXuat": "Cải tiến",
    "linhVucDeXuat": ""
  },
  {
    "tt": "34",
    "mang": "TCM",
    "phuTrach": "Ducnn17",
    "quyTrinh": "Yêu cầu cho 1 giờ học hiệu quả",
    "trangThai": "Chưa xác định",
    "sanPham": "",
    "boPhan": "",
    "noiDung": "Yêu cầu cho 1 giờ học hiệu quả",
    "taiLieu": [
      {
        "ten": "Yêu cầu cho 1 giờ học hiệu quả",
        "link": "https://docs.google.com/document/d/1q9QH40PRue9MCYc-0J_2HZoeXAy5oEiF/edit?usp=sharing&ouid=102546773995785542789&rtpof=true&sd=true",
        "embedLink": "https://docs.google.com/document/d/1q9QH40PRue9MCYc-0J_2HZoeXAy5oEiF/preview"
      }
    ],
    "tomTat": "Yêu cầu cho 1 giờ học hiệu quả",
    "loaiDeXuat": "Cải tiến",
    "linhVucDeXuat": ""
  },
  {
    "tt": "35",
    "mang": "TCM",
    "phuTrach": "Ducnn17",
    "quyTrinh": "Danh mục các nội dung training CBGV mới",
    "trangThai": "Chưa xác định",
    "sanPham": "",
    "boPhan": "",
    "noiDung": "Danh mục các nội dung training CBGV mới",
    "taiLieu": [
      {
        "ten": "Danh mục các nội dung training CBGV mới",
        "link": "https://docs.google.com/document/d/1qYq4lAO4ZboNt3-1JkCvJdnpP64Cfjmg/edit?usp=sharing&ouid=102546773995785542789&rtpof=true&sd=true",
        "embedLink": "https://docs.google.com/document/d/1qYq4lAO4ZboNt3-1JkCvJdnpP64Cfjmg/preview"
      }
    ],
    "tomTat": "Danh mục các nội dung training CBGV mới",
    "loaiDeXuat": "Viết mới",
    "linhVucDeXuat": ""
  },
  {
    "tt": "36",
    "mang": "VP",
    "phuTrach": "VP",
    "quyTrinh": "Quy trình in ấn tài liệu",
    "trangThai": "Chưa xác định",
    "sanPham": "",
    "boPhan": "",
    "noiDung": "Quy trình in ấn tài liệu",
    "taiLieu": [],
    "tomTat": "Quy trình in ấn tài liệu",
    "loaiDeXuat": "Cải tiến",
    "linhVucDeXuat": ""
  },
  {
    "tt": "37",
    "mang": "TCM",
    "phuTrach": "Xã hội",
    "quyTrinh": "Quy trình đăng kí tiết dạy có yêu cầu HS mang laptop cá nhân",
    "trangThai": "Chưa xác định",
    "sanPham": "Chuyển sang mẫu mới",
    "boPhan": "",
    "noiDung": "Quy trình đăng kí tiết dạy có yêu cầu HS mang laptop cá nhân",
    "taiLieu": [],
    "tomTat": "Quy trình đăng kí tiết dạy có yêu cầu HS mang laptop cá nhân",
    "loaiDeXuat": "Cải tiến",
    "linhVucDeXuat": ""
  },
  {
    "tt": "38",
    "mang": "TC&QLĐT",
    "phuTrach": "TC&QLĐT",
    "quyTrinh": "Quy trình lập TKB",
    "trangThai": "Chưa xác định",
    "sanPham": "",
    "boPhan": "",
    "noiDung": "Quy trình lập TKB",
    "taiLieu": [
      {
        "ten": "Quy trình lập TKB",
        "link": "https://docs.google.com/document/d/1y0FkTVDKNIOIPrNM_WDs8D6RcerqoO0F/edit?usp=sharing&ouid=117049086116373800124&rtpof=true&sd=true",
        "embedLink": "https://docs.google.com/document/d/1y0FkTVDKNIOIPrNM_WDs8D6RcerqoO0F/preview"
      }
    ],
    "tomTat": "Quy trình lập TKB",
    "loaiDeXuat": "Viết mới",
    "linhVucDeXuat": ""
  },
  {
    "tt": "39",
    "mang": "Khối chủ nhiệm",
    "phuTrach": "Ngocdtb20",
    "quyTrinh": "Quy trình giải quyết việc HS xin nghỉ học (P/ KP)",
    "trangThai": "Chưa xác định",
    "sanPham": "",
    "boPhan": "",
    "noiDung": "Quy trình giải quyết việc HS xin nghỉ học (P/ KP)",
    "taiLieu": [],
    "tomTat": "Quy trình giải quyết việc HS xin nghỉ học (P/ KP)",
    "loaiDeXuat": "Viết mới",
    "linhVucDeXuat": ""
  },
  {
    "tt": "40",
    "mang": "TCM",
    "phuTrach": "Xã hội",
    "quyTrinh": "Quy trình phối hợp giữa GVCN - GVBM",
    "trangThai": "Chưa xác định",
    "sanPham": "",
    "boPhan": "",
    "noiDung": "Quy trình phối hợp giữa GVCN - GVBM",
    "taiLieu": [],
    "tomTat": "Quy trình phối hợp giữa GVCN - GVBM",
    "loaiDeXuat": "Viết mới",
    "linhVucDeXuat": ""
  },
  {
    "tt": "41",
    "mang": "TCM",
    "phuTrach": "Tiếng Anh",
    "quyTrinh": "Quy trình làm việc, trao đổi với GV có GPA thấp",
    "trangThai": "Chưa xác định",
    "sanPham": "",
    "boPhan": "",
    "noiDung": "Quy trình làm việc, trao đổi với GV có GPA thấp",
    "taiLieu": [],
    "tomTat": "Quy trình làm việc, trao đổi với GV có GPA thấp",
    "loaiDeXuat": "Viết mới",
    "linhVucDeXuat": ""
  },
  {
    "tt": "42",
    "mang": "Khối chủ nhiệm",
    "phuTrach": "Ngocdtb20+ HieuNH39",
    "quyTrinh": "Quy trình xử lí HS drop out",
    "trangThai": "Chưa xác định",
    "sanPham": "",
    "boPhan": "",
    "noiDung": "Quy trình xử lí HS drop out",
    "taiLieu": [],
    "tomTat": "Quy trình xử lí HS drop out",
    "loaiDeXuat": "Viết mới",
    "linhVucDeXuat": ""
  },
  {
    "tt": "43",
    "mang": "TCM",
    "phuTrach": "Ducnn17",
    "quyTrinh": "Quy trình phản ánh các vấn đề nội bộ của CBGV",
    "trangThai": "Chưa xác định",
    "sanPham": "",
    "boPhan": "",
    "noiDung": "Quy trình phản ánh các vấn đề nội bộ",
    "taiLieu": [],
    "tomTat": "Quy trình phản ánh các vấn đề nội bộ của CBGV",
    "loaiDeXuat": "Viết mới",
    "linhVucDeXuat": ""
  },
  {
    "tt": "44",
    "mang": "Khối chủ nhiệm",
    "phuTrach": "Ngocdtb20",
    "quyTrinh": "Quy trình gửi các thông tin, thông báo, truyền thông đến với PHHS",
    "trangThai": "Chưa xác định",
    "sanPham": "",
    "boPhan": "",
    "noiDung": "Quy trình gửi các thông tin, thông báo, truyền thông đến với PHHS",
    "taiLieu": [
      {
        "ten": "Quy trình gửi các thông tin, thông báo, truyền thông đến với PHHS",
        "link": "https://docs.google.com/document/d/1e-wr6yPUjrvfRo0ARTymDLTnZZQ5oC7V/edit?usp=sharing&ouid=115941244450785559380&rtpof=true&sd=true",
        "embedLink": "https://docs.google.com/document/d/1e-wr6yPUjrvfRo0ARTymDLTnZZQ5oC7V/preview"
      }
    ],
    "tomTat": "Quy trình gửi các thông tin, thông báo, truyền thông đến với PHHS",
    "loaiDeXuat": "Viết mới",
    "linhVucDeXuat": ""
  },
  {
    "tt": "45",
    "mang": "TCM",
    "phuTrach": "Tiếng Anh",
    "quyTrinh": "Quy trình ghi nhận, phản hồi vi phạm của giáo viên trong giờ học (từ GTHD)",
    "trangThai": "Chưa xác định",
    "sanPham": "",
    "boPhan": "",
    "noiDung": "",
    "taiLieu": [],
    "tomTat": "Quy trình ghi nhận, phản hồi vi phạm của giáo viên trong giờ học (từ GTHD)",
    "loaiDeXuat": "",
    "linhVucDeXuat": ""
  },
  {
    "tt": "46",
    "mang": "TCM",
    "phuTrach": "PDP",
    "quyTrinh": "Quy trình mượn, trả đồ dùng dụng cụ",
    "trangThai": "Chưa xác định",
    "sanPham": "",
    "boPhan": "PDP",
    "noiDung": "Quy trình mượn, trả đồ dùng, dụng cụ",
    "taiLieu": [
      {
        "ten": "Quy trình mượn, trả đồ dùng dụng cụ",
        "link": "https://docs.google.com/document/d/1lo4JgeNw-iF-vhQqf-Niud2s_Kzw1bgb/edit?usp=sharing&ouid=100463583246226251081&rtpof=true&sd=true",
        "embedLink": "https://docs.google.com/document/d/1lo4JgeNw-iF-vhQqf-Niud2s_Kzw1bgb/preview"
      }
    ],
    "tomTat": "Quy trình mượn, trả đồ dùng dụng cụ",
    "loaiDeXuat": "",
    "linhVucDeXuat": ""
  },
  {
    "tt": "47",
    "mang": "Khối chủ nhiệm",
    "phuTrach": "HieuNH39",
    "quyTrinh": "BM-XLKL-01 Biên bản ghi nhận sự việc, vi phạm nội quy",
    "trangThai": "Chưa xác định",
    "sanPham": "Cụm quy trình Xử lý kỷ luật",
    "boPhan": "",
    "noiDung": "",
    "taiLieu": [
      {
        "ten": "Cụm quy trình Xử lý kỷ luật",
        "link": "https://docs.google.com/document/d/1NQQxVod_qZkXmT95xaBowb-pYvT2UPLa/edit?usp=sharing&ouid=115389301456460534953&rtpof=true&sd=true",
        "embedLink": "https://docs.google.com/document/d/1NQQxVod_qZkXmT95xaBowb-pYvT2UPLa/preview"
      }
    ],
    "tomTat": "BM-XLKL-01 Biên bản ghi nhận sự việc, vi phạm nội quy",
    "loaiDeXuat": "",
    "linhVucDeXuat": ""
  },
  {
    "tt": "48",
    "mang": "Khối chủ nhiệm",
    "phuTrach": "HieuNH40",
    "quyTrinh": "BM-XLKL-02 Bản tường trình của học sinh",
    "trangThai": "Chưa xác định",
    "sanPham": "Cụm quy trình Xử lý kỷ luật",
    "boPhan": "",
    "noiDung": "",
    "taiLieu": [
      {
        "ten": "Cụm quy trình Xử lý kỷ luật",
        "link": "https://docs.google.com/document/d/1LODyCCkKLFAZjnJVOttnDsCikT5HwE4M/edit?usp=sharing&ouid=115389301456460534953&rtpof=true&sd=true",
        "embedLink": "https://docs.google.com/document/d/1LODyCCkKLFAZjnJVOttnDsCikT5HwE4M/preview"
      }
    ],
    "tomTat": "BM-XLKL-02 Bản tường trình của học sinh",
    "loaiDeXuat": "",
    "linhVucDeXuat": ""
  },
  {
    "tt": "49",
    "mang": "Khối chủ nhiệm",
    "phuTrach": "HieuNH41",
    "quyTrinh": "BM-XLKL-03 Bản tự kiểm điểm của học sinh (Có xác nhận & cam kết của CMHS)",
    "trangThai": "Chưa xác định",
    "sanPham": "Cụm quy trình Xử lý kỷ luật",
    "boPhan": "",
    "noiDung": "",
    "taiLieu": [
      {
        "ten": "Cụm quy trình Xử lý kỷ luật",
        "link": "https://docs.google.com/document/d/1wlE2vZh2ZxkeTf2FIZni7MgYqbD_T1Pb/edit?usp=sharing&ouid=115389301456460534953&rtpof=true&sd=true",
        "embedLink": "https://docs.google.com/document/d/1wlE2vZh2ZxkeTf2FIZni7MgYqbD_T1Pb/preview"
      }
    ],
    "tomTat": "BM-XLKL-03 Bản tự kiểm điểm của học sinh (Có xác nhận & cam kết của CMHS)",
    "loaiDeXuat": "",
    "linhVucDeXuat": ""
  },
  {
    "tt": "50",
    "mang": "Khối chủ nhiệm",
    "phuTrach": "HieuNH42",
    "quyTrinh": "BM-XLKL-04 Biên bản làm việc giữa Nhà trường và Cha mẹ học sinh",
    "trangThai": "Chưa xác định",
    "sanPham": "Cụm quy trình Xử lý kỷ luật",
    "boPhan": "",
    "noiDung": "",
    "taiLieu": [
      {
        "ten": "Cụm quy trình Xử lý kỷ luật",
        "link": "https://docs.google.com/document/d/1D6_AL5RFbwMoeVxHkuaFh5shLtTvfODG/edit?usp=sharing&ouid=115389301456460534953&rtpof=true&sd=true",
        "embedLink": "https://docs.google.com/document/d/1D6_AL5RFbwMoeVxHkuaFh5shLtTvfODG/preview"
      }
    ],
    "tomTat": "BM-XLKL-04 Biên bản làm việc giữa Nhà trường và Cha mẹ học sinh",
    "loaiDeXuat": "",
    "linhVucDeXuat": ""
  },
  {
    "tt": "51",
    "mang": "Khối chủ nhiệm",
    "phuTrach": "HieuNH43",
    "quyTrinh": "BM-XLKL-05 Quyết định thi hành kỷ luật học sinh",
    "trangThai": "Chưa xác định",
    "sanPham": "Cụm quy trình Xử lý kỷ luật",
    "boPhan": "",
    "noiDung": "",
    "taiLieu": [
      {
        "ten": "Cụm quy trình Xử lý kỷ luật",
        "link": "https://docs.google.com/document/d/1VF1AVvjlLloiJugQy7huZ81Pio26Me3G/edit?usp=sharing&ouid=115389301456460534953&rtpof=true&sd=true",
        "embedLink": "https://docs.google.com/document/d/1VF1AVvjlLloiJugQy7huZ81Pio26Me3G/preview"
      }
    ],
    "tomTat": "BM-XLKL-05 Quyết định thi hành kỷ luật học sinh",
    "loaiDeXuat": "",
    "linhVucDeXuat": ""
  },
  {
    "tt": "52",
    "mang": "Khối chủ nhiệm",
    "phuTrach": "HieuNH44",
    "quyTrinh": "BM-XLKL-06 Biên bản tạm giữ và bàn giao tài sản học sinh",
    "trangThai": "Chưa xác định",
    "sanPham": "Cụm quy trình Xử lý kỷ luật",
    "boPhan": "",
    "noiDung": "",
    "taiLieu": [
      {
        "ten": "Cụm quy trình Xử lý kỷ luật",
        "link": "https://docs.google.com/document/d/15NFYuNJV6nDAnBWdOZFHGY93oce4Klbv/edit?usp=sharing&ouid=115389301456460534953&rtpof=true&sd=true",
        "embedLink": "https://docs.google.com/document/d/15NFYuNJV6nDAnBWdOZFHGY93oce4Klbv/preview"
      }
    ],
    "tomTat": "BM-XLKL-06 Biên bản tạm giữ và bàn giao tài sản học sinh",
    "loaiDeXuat": "",
    "linhVucDeXuat": ""
  },
  {
    "tt": "53",
    "mang": "Khối chủ nhiệm",
    "phuTrach": "HieuNH45",
    "quyTrinh": "03. Quy trình tổ chức họp PHHS",
    "trangThai": "Chưa xác định",
    "sanPham": "",
    "boPhan": "",
    "noiDung": "",
    "taiLieu": [
      {
        "ten": "03. Quy trình tổ chức họp PHHS",
        "link": "https://docs.google.com/document/d/1YQa1azt2B5Jz0pxiArPT0gBh9p-XcCLo/edit?usp=sharing&ouid=115389301456460534953&rtpof=true&sd=true",
        "embedLink": "https://docs.google.com/document/d/1YQa1azt2B5Jz0pxiArPT0gBh9p-XcCLo/preview"
      }
    ],
    "tomTat": "03. Quy trình tổ chức họp PHHS",
    "loaiDeXuat": "",
    "linhVucDeXuat": ""
  },
  {
    "tt": "54",
    "mang": "Khối chủ nhiệm",
    "phuTrach": "HieuNH46",
    "quyTrinh": "BM-01 BIÊN BẢN HỌP PHỤ HUYNH HỌC SINH",
    "trangThai": "Chưa xác định",
    "sanPham": "",
    "boPhan": "",
    "noiDung": "",
    "taiLieu": [
      {
        "ten": "BM-01 BIÊN BẢN HỌP PHỤ HUYNH HỌC SINH",
        "link": "https://docs.google.com/document/d/1I3yXpfbTXSemaEn7BazsD6RjyY4kQdIn/edit?usp=sharing&ouid=115389301456460534953&rtpof=true&sd=true",
        "embedLink": "https://docs.google.com/document/d/1I3yXpfbTXSemaEn7BazsD6RjyY4kQdIn/preview"
      }
    ],
    "tomTat": "BM-01 BIÊN BẢN HỌP PHỤ HUYNH HỌC SINH",
    "loaiDeXuat": "",
    "linhVucDeXuat": ""
  }
];
