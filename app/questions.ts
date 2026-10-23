export type Q={id:string;label:string;options?:string[];type?:'text'|'multi';help?:string;optional?:boolean;when?:[string,string]};
const undecided='Chưa quyết định — cần tư vấn';
const choice=(id:string,label:string,options:string[],extra:Partial<Q>={}):Q=>({id,label,options:[...options,undecided,'Khác'],...extra});
const txt=(id:string,label:string,help:string,optional=false):Q=>({id,label,type:'text',help,optional});
export const sections:{title:string;subtitle:string;questions:Q[]}[]=[
{title:'Cách anh/chị đang làm',subtitle:'Bắt đầu từ công việc thực tế, để ứng dụng giải quyết đúng việc.',questions:[
txt('name','Chúng em nên gọi anh/chị là gì?','Tên gọi hoặc biệt danh là đủ.'),
txt('current','Anh/chị mô tả một kỳ khui gần nhất diễn ra như thế nào?','Từ nhắc lịch, nhận mức bỏ đến báo người hốt. Dùng ví dụ giả, không ghi thông tin thật của hụi viên.'),
choice('pain','Việc nào đang khiến anh/chị mất công hoặc dễ nhầm nhất?',['Nhắc lịch','Ghi nhận mức bỏ','Tìm người hốt','Bảo mật thông tin','Quản lý khách và dây hụi','Theo dõi đóng tiền'],{type:'multi'}),
choice('scale','Hiện anh/chị quản lý khoảng bao nhiêu hụi viên?',['Dưới 20','20–50','51–200','Trên 200']),
txt('groups','Có bao nhiêu dây hụi và thường bao nhiêu người cùng vào một giờ khui?','Ví dụ: 5 dây, mỗi dây 20 chân, tối đa 40 người vào cùng lúc; có thể ghi chưa rõ.'),
choice('staff','Ai sẽ quản lý trên hệ thống?',['Chỉ mình tôi','Tôi và người hỗ trợ','Nhiều chủ hụi, mỗi người có dữ liệu riêng']),
txt('roles','Người hỗ trợ được xem và làm những việc nào?','Ví dụ: chỉ nhắc lịch, không xem hồ sơ hoặc mức bỏ.',false),
]},
{title:'Khách hàng & dây hụi',subtitle:'Xác định đúng người, đúng dây và quyền tham gia.',questions:[
choice('profile','Hồ sơ khách cần có những trường nào?',['Họ tên','Số điện thoại','Tài khoản Zalo','Địa chỉ','Ghi chú riêng','Thông tin ngân hàng','Giấy tờ xác minh'],{type:'multi',help:'Chỉ chọn loại thông tin cần lưu, không nhập dữ liệu cá nhân thật vào khảo sát.'}),
choice('join','Khách được thêm vào dây hụi bằng cách nào?',['Chủ hụi thêm và mời','Khách đăng ký, chủ hụi duyệt','Khách có mã mời được tham gia ngay']),
choice('identity','Anh/chị muốn xác nhận tài khoản đúng là khách bằng cách nào?',['Đối chiếu tài khoản Zalo rồi duyệt','Đối chiếu số điện thoại rồi duyệt','Mã mời riêng cho từng khách']),
choice('legs','Một khách có thể tham gia bao nhiêu chân trong một dây?',['Chỉ một chân','Có thể nhiều chân']),
choice('eligibility','Chân hụi đã hốt có được bỏ hụi ở kỳ sau không?',['Không, chỉ chân chưa hốt được bỏ','Có, theo quy tắc riêng']),
txt('structure','Một dây hụi được quy định như thế nào?','Cho ví dụ giả: mệnh giá, số chân, số kỳ, kỳ đầu/kỳ cuối, chu kỳ ngày/tuần/tháng và trường hợp đặc biệt.'),
choice('import','Danh sách khách và dây hiện đang lưu ở đâu?',['Sổ giấy','Excel / Google Sheets','Tin nhắn Zalo','Ứng dụng khác','Chưa có danh sách'],{type:'multi'}),
]},
{title:'Lịch khui & nhắc lịch',subtitle:'Làm rõ giờ bắt đầu, giờ kết thúc và cách thông báo.',questions:[
choice('schedule','Lịch khui thường được đặt như thế nào?',['Lặp lại cố định theo dây','Chủ hụi đặt riêng mỗi kỳ','Có cả hai cách']),
txt('window','Khung giờ và cách lặp cụ thể anh/chị muốn là gì?','Ví dụ: ngày 15 hằng tháng, 11:00–11:10, giờ Việt Nam. Nếu rơi vào ngày nghỉ thì xử lý thế nào?'),
choice('reminder','Cần nhắc khách vào những thời điểm nào?',['Trước 1 ngày','Trước 30 phút','Trước 5 phút','Khi mở phiên','Trước khi đóng 1 phút','Không cần nhắc'],{type:'multi'}),
choice('notify','Anh/chị muốn khách nhận thông báo ở đâu?',['Trong Mini App','Tin nhắn Zalo riêng','Nhóm Zalo','SMS'],{type:'multi',help:'Đây là nhu cầu cần xác nhận; khả năng tích hợp từng kênh sẽ được kiểm tra trước khi cam kết.'}),
choice('reschedule','Nếu cần đổi lịch hoặc hủy phiên thì xử lý thế nào?',['Chỉ đổi trước khi phiên mở và báo mọi người','Cho đổi khi đang mở, hủy các mức bỏ và tổ chức lại','Không đổi lịch sau khi đã thông báo']),
]},
{title:'Cách gửi mức bỏ',subtitle:'Một vài quy tắc rõ ràng sẽ giúp tránh tranh cãi về sau.',questions:[
choice('channel','Khách gửi mức bỏ bằng cách nào?',['Nhập số tiền trên Mini App','Nhắn riêng qua Zalo','Nhắn trong nhóm Zalo','Chủ hụi nhập giúp khách']),
txt('message','Nếu nhận qua tin nhắn, khách sẽ nhắn vào đâu và theo mẫu nào?','Ví dụ: nhắn riêng tài khoản nào, mã dây + mã chân + số tiền.',false),
txt('limits','Mức bỏ có giới hạn hoặc bước tăng không?','Ví dụ: tối thiểu 10.000đ, tối đa 500.000đ, bội số 10.000đ; hoặc không giới hạn theo quy tắc hiện tại.'),
choice('edit','Sau khi gửi, khách được thay đổi mức bỏ thế nào?',['Chỉ gửi một lần, không sửa','Được sửa cả tăng và giảm; lấy lần cuối','Chỉ được tăng; lấy lần cuối']),
choice('withdraw','Khách có được rút mức bỏ trước giờ đóng không?',['Được rút','Không được rút']),
choice('cutoff','Nếu khách bấm gửi trước 11:10 nhưng hệ thống nhận lúc 11:10:01 thì sao?',['Từ chối: căn cứ giờ hệ thống nhận','Chuyển chủ hụi xem xét ngoại lệ'],{help:'Cần một mốc giờ chung. Chọn cách xử lý tình huống gửi sát giờ đóng.'}),
choice('proxy','Chủ hụi có được nhập hộ khách không?',['Không','Có, trước giờ đóng và ghi rõ nhập hộ','Có cả sau giờ đóng theo ngoại lệ']),
]},
{title:'Kết quả & ngoại lệ',subtitle:'Chốt cách chọn người hốt khi mọi việc bình thường và khi có sự cố.',questions:[
choice('winner','Người hốt được chọn theo quy tắc nào?',['Mức bỏ hợp lệ cao nhất','Theo thứ tự định trước','Tùy từng dây']),
choice('tie','Hai người cùng bỏ cao nhất 500.000đ thì ai hốt?',['Người gửi mức đó trước','Bốc thăm có ghi nhận','Mở lượt bỏ lại cho những người bằng nhau','Chủ hụi quyết định theo thỏa thuận']),
choice('empty','Hết giờ mà không ai gửi mức bỏ thì làm gì?',['Mở lại vào giờ mới và thông báo','Chọn theo thứ tự đã thống nhất','Chủ hụi xử lý thủ công']),
choice('finalize','Khi có kết quả hợp lệ, hệ thống công bố thế nào?',['Tự động công bố ngay','Chủ hụi kiểm tra rồi bấm công bố']),
choice('outage','Nếu hệ thống lỗi trong thời gian khui thì xử lý thế nào?',['Hủy phiên và tổ chức lại','Tạm dừng, chủ hụi thống nhất lịch tiếp tục','Chủ hụi chuyển sang cách khui thủ công']),
choice('dispute','Nếu có phản ánh sai kết quả đã công bố thì xử lý thế nào?',['Giữ lịch sử, chủ hụi giải quyết và lập bản điều chỉnh','Hủy kết quả, lưu lý do và tổ chức lại']),
txt('example','Anh/chị cho một ví dụ để kiểm tra kết quả đúng?','Ví dụ giả: 20 chân, A bỏ 200.000đ, B bỏ 300.000đ, C chưa gửi → ai hốt? Kỳ đầu/cuối có gì khác?'),
]},
{title:'Bảo mật & công khai',subtitle:'Chỉ hiển thị đúng thông tin cho đúng người.',questions:[
choice('hidden','Trong lúc khui, khách được thấy gì về người khác?',['Không thấy danh tính, mức bỏ hay số người đã gửi','Chỉ thấy số người đã gửi','Thấy mã ẩn danh, không thấy mức bỏ']),
choice('ownerView','Chủ hụi được xem mức bỏ vào lúc nào?',['Ngay khi khách gửi','Chỉ sau khi phiên đóng']),
choice('publishInfo','Sau khi chốt, công bố thông tin gì về người hốt?',['Chỉ mã khách / mã chân','Tên người hốt','Mức bỏ thắng','Số tiền được nhận'],{type:'multi',help:'Không mặc định công bố số điện thoại, giấy tờ hoặc địa chỉ.'}),
choice('audience','Ai được xem kết quả của một dây?',['Chủ hụi và thành viên đúng dây','Chỉ chủ hụi và người hốt','Tất cả khách hàng của chủ hụi']),
choice('retention','Lịch sử phiên và mức bỏ cần lưu bao lâu?',['Đến khi kết thúc dây','1 năm','3 năm','Cần tư vấn thời hạn phù hợp']),
txt('privacy','Có yêu cầu bảo mật hoặc quyền truy cập nào khác không?','Ví dụ: xác minh thêm khi chủ hụi đăng nhập; khóa khách; chỉ người được phân quyền mới xuất dữ liệu.',true),
]},
{title:'Phạm vi & giao diện',subtitle:'Chọn việc cần có trước để bản đầu vừa đủ và dễ dùng.',questions:[
choice('money','Bản đầu cần quản lý tiền đến mức nào?',['Chỉ chọn người hốt và báo kết quả','Tính tiền phải góp / tiền nhận','Thêm theo dõi thu chi, thiếu tiền','Thêm thanh toán / chuyển khoản tự động']),
txt('formula','Cách tính tiền nhận, tiền góp và hoa hồng cụ thể là gì?','Cho một ví dụ số giả đầy đủ; nêu cách làm tròn và khoản khấu trừ. Nếu chưa chốt, ghi rõ cần trao đổi.'),
choice('reports','Cần những báo cáo nào?',['Kết quả từng phiên','Lịch sử từng khách / chân','Danh sách đã hốt, chưa hốt','Tiền đã đóng, còn thiếu','Xuất Excel','Bản kết quả để gửi Zalo'],{type:'multi'}),
choice('device','Khách thường dùng thiết bị nào?',['Điện thoại Android','iPhone','Máy tính'],{type:'multi'}),
choice('ux','Điều gì quan trọng nhất với giao diện?',['Chữ lớn, ít thao tác','Quen như Zalo','Dễ theo dõi nhiều dây','Hiện đại, có màu thương hiệu']),
txt('must','Ba việc bắt buộc bản đầu phải làm tốt là gì?','Xếp theo mức ưu tiên 1, 2, 3.'),
txt('acceptance','Anh/chị sẽ kiểm tra thế nào để đồng ý đưa vào sử dụng?','Ví dụ: chạy thử một dây, nhận đủ mức bỏ, không lộ danh tính, chọn đúng người hốt.'),
]},
{title:'Triển khai & trao đổi',subtitle:'Những thông tin cuối để thống nhất kế hoạch dùng thử và bàn giao.',questions:[
choice('deadline','Anh/chị muốn bắt đầu dùng thử khi nào?',['Trong 2 tuần','Trong 1 tháng','Trong 2–3 tháng','Chưa có mốc cụ thể']),
txt('handover','Ai phụ trách dùng thử, duyệt sản phẩm và tiếp nhận bàn giao?','Có cần hướng dẫn sử dụng, hỗ trợ sau bàn giao, tài khoản và dữ liệu đứng tên anh/chị không?'),
txt('contact','Cách liên hệ thuận tiện để trao đổi thêm?','Số điện thoại/Zalo hoặc cách liên hệ đã có. Không bắt buộc.',true),
txt('extra','Có điều gì chúng em chưa hỏi hoặc hiểu chưa đúng?','Anh/chị có thể mô tả thêm quy tắc đặc biệt hoặc mong muốn.',true),
]}];
sections[0].questions.find(q=>q.id==='roles')!.when=['staff','Tôi và người hỗ trợ'];
sections[3].questions.find(q=>q.id==='message')!.when=['channel','Nhắn'];
sections[6].questions.find(q=>q.id==='formula')!.when=['money','!Chỉ chọn người hốt và báo kết quả'];
export type Answers=Record<string,string|string[]>;
export function visible(q:Q,a:Answers){if(!q.when)return true;const [k,v]=q.when;const x=String(a[k]||'');return v.startsWith('!')?!!x&&x!==v.slice(1):x.includes(v);}
export const allQuestions=sections.flatMap(s=>s.questions);
export function issues(a:Answers){return allQuestions.filter(q=>visible(q,a)&&!q.optional&&(!a[q.id]||a[q.id].length===0||typeof a[q.id]==='string'&&!String(a[q.id]).trim()||(Array.isArray(a[q.id])?a[q.id].includes('Khác'):a[q.id]==='Khác')&&!String(a[q.id+'_other']||'').trim())).map(q=>q.id);}
