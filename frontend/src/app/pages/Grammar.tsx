import { useState } from "react";
import { Navigation } from "../components/Navigation";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { BookOpen, FileText, CheckCircle } from "lucide-react";

const grammarLessons = [
  {
    id: 1,
    level: "Sơ cấp 1",
    description: "Dựa theo giáo trình tiếng Hàn tổng hợp 1",
    color: "from-green-400 to-emerald-500",
    lessons: [
      {
        id: 1,
        title: "Câu cơ bản với 이다/입니다",
        description: "Cách nói 'là' trong tiếng Hàn",
        examples: [
          { korean: "저는 학생입니다.", vietnamese: "Tôi là học sinh.", note: "Trang trọng" },
          { korean: "이것은 책이에요.", vietnamese: "Đây là quyển sách.", note: "Lịch sự" },
        ],
        grammar: "Danh từ + 이다/입니다 (là)",
        usage: "Dùng để xác định hoặc giới thiệu người, vật. -입니다 là dạng trang trọng."
      },
      {
        id: 2,
        title: "Trợ từ chủ ngữ 은/는, 이/가",
        description: "Đánh dấu chủ ngữ trong câu",
        examples: [
          { korean: "저는 한국 사람입니다.", vietnamese: "Tôi là người Hàn Quốc.", note: "은/는: chủ đề" },
          { korean: "이것이 제 가방입니다.", vietnamese: "Cái này là túi của tôi.", note: "이/가: chủ ngữ" },
        ],
        grammar: "은/는 (chủ đề), 이/가 (chủ ngữ)",
        usage: "은/는 dùng cho chủ đề đã biết, 이/가 dùng cho thông tin mới hoặc nhấn mạnh."
      },
      {
        id: 3,
        title: "Câu hỏi với 뭐/무엇",
        description: "Hỏi 'cái gì'",
        examples: [
          { korean: "이것이 뭐예요?", vietnamese: "Đây là cái gì?", note: "Hỏi về vật" },
          { korean: "무엇을 공부해요?", vietnamese: "Bạn học gì?", note: "Hỏi về hành động" },
        ],
        grammar: "뭐/무엇 (cái gì)",
        usage: "뭐 là dạng rút gọn thông dụng, 무엇 là dạng chính thức."
      },
    ]
  },
  {
    id: 2,
    level: "Sơ cấp 2",
    description: "Dựa theo giáo trình tiếng Hàn tổng hợp 2",
    color: "from-blue-400 to-indigo-500",
    lessons: [
      {
        id: 4,
        title: "Động từ thể lịch sự -(스)ㅂ니다/아/어요",
        description: "Chia động từ ở thì hiện tại",
        examples: [
          { korean: "저는 한국어를 공부합니다.", vietnamese: "Tôi học tiếng Hàn.", note: "Trang trọng" },
          { korean: "밥을 먹어요.", vietnamese: "Ăn cơm.", note: "Lịch sự" },
        ],
        grammar: "Động từ + (스)ㅂ니다 / 아/어요",
        usage: "-(스)ㅂ니다 dùng trong văn nói/viết trang trọng, -아/어요 dùng trong giao tiếp hàng ngày."
      },
      {
        id: 5,
        title: "Thì quá khứ -았/었어요",
        description: "Diễn tả hành động đã xảy ra",
        examples: [
          { korean: "어제 영화를 봤어요.", vietnamese: "Hôm qua tôi đã xem phim.", note: "Quá khứ" },
          { korean: "친구를 만났어요.", vietnamese: "Tôi đã gặp bạn.", note: "Quá khứ" },
        ],
        grammar: "Động từ + 았/었어요",
        usage: "Dùng để nói về hành động, sự việc đã hoàn thành trong quá khứ."
      },
      {
        id: 6,
        title: "Câu phủ định 안, 못",
        description: "Cách phủ định trong tiếng Hàn",
        examples: [
          { korean: "저는 안 가요.", vietnamese: "Tôi không đi.", note: "Không muốn" },
          { korean: "한국어를 못 해요.", vietnamese: "Tôi không biết nói tiếng Hàn.", note: "Không thể" },
        ],
        grammar: "안 + động từ (không), 못 + động từ (không thể)",
        usage: "안 dùng khi không muốn làm, 못 dùng khi không có khả năng làm."
      },
    ]
  },
  {
    id: 3,
    level: "Trung cấp 1",
    description: "Dựa theo giáo trình tiếng Hàn tổng hợp 3",
    color: "from-purple-400 to-pink-500",
    lessons: [
      {
        id: 7,
        title: "Thì tương lai -(으)ㄹ 거예요",
        description: "Diễn tả kế hoạch tương lai",
        examples: [
          { korean: "내일 학교에 갈 거예요.", vietnamese: "Ngày mai tôi sẽ đi học.", note: "Kế hoạch" },
          { korean: "주말에 영화를 볼 거예요.", vietnamese: "Cuối tuần tôi sẽ xem phim.", note: "Dự định" },
        ],
        grammar: "Động từ + (으)ㄹ 거예요",
        usage: "Dùng để diễn tả ý định, kế hoạch hoặc dự đoán trong tương lai."
      },
      {
        id: 8,
        title: "Câu điều kiện -(으)면",
        description: "Nếu... thì...",
        examples: [
          { korean: "시간이 있으면 영화를 봐요.", vietnamese: "Nếu có thời gian thì xem phim.", note: "Điều kiện" },
          { korean: "비가 오면 집에 있을 거예요.", vietnamese: "Nếu trời mưa thì tôi sẽ ở nhà.", note: "Giả định" },
        ],
        grammar: "Động từ/Tính từ + (으)면",
        usage: "Dùng để diễn tả điều kiện hoặc giả định."
      },
      {
        id: 9,
        title: "Liên kết câu -고, -(으)니까",
        description: "Nối hai câu với nhau",
        examples: [
          { korean: "밥을 먹고 학교에 가요.", vietnamese: "Ăn cơm rồi đi học.", note: "-고: và, rồi" },
          { korean: "배가 고프니까 밥을 먹어요.", vietnamese: "Vì đói nên ăn cơm.", note: "-(으)니까: vì, nên" },
        ],
        grammar: "-고 (và), -(으)니까 (vì)",
        usage: "-고 nối các hành động tuần tự, -(으)니까 diễn tả nguyên nhân."
      },
    ]
  },
  {
    id: 4,
    level: "Trung cấp 2",
    description: "Dựa theo giáo trình tiếng Hàn tổng hợp 4",
    color: "from-orange-400 to-red-500",
    lessons: [
      {
        id: 10,
        title: "Thể tôn trọng -(으)시-",
        description: "Dùng khi nói về người lớn tuổi",
        examples: [
          { korean: "선생님께서 오세요.", vietnamese: "Thầy/Cô đến.", note: "Tôn trọng" },
          { korean: "할머니께서 주무세요.", vietnamese: "Bà ngủ.", note: "Kính trọng" },
        ],
        grammar: "Động từ + (으)시",
        usage: "Dùng khi nói về hành động của người cao tuổi hơn hoặc địa vị cao hơn."
      },
      {
        id: 11,
        title: "Thể bị động",
        description: "Câu bị động trong tiếng Hàn",
        examples: [
          { korean: "문이 열렸어요.", vietnamese: "Cửa được mở.", note: "Bị động" },
          { korean: "책이 팔렸어요.", vietnamese: "Sách được bán.", note: "Bị động" },
        ],
        grammar: "Động từ + -이/히/리/기",
        usage: "Chuyển câu chủ động sang câu bị động."
      },
      {
        id: 12,
        title: "Thể sai khiến",
        description: "Nhờ ai đó làm gì",
        examples: [
          { korean: "아이에게 우유를 먹였어요.", vietnamese: "Cho trẻ uống sữa.", note: "Sai khiến" },
          { korean: "선생님이 학생을 앉혔어요.", vietnamese: "Giáo viên cho học sinh ngồi.", note: "Sai khiến" },
        ],
        grammar: "Động từ + -이/히/리/기/우/구/추",
        usage: "Diễn tả việc ai đó nhờ/bắt người khác làm gì."
      },
    ]
  },
];

export default function Grammar() {
  const [selectedLevel, setSelectedLevel] = useState(grammarLessons[0]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Ngữ pháp tiếng Hàn</h1>
          <p className="text-xl text-gray-600">Học ngữ pháp theo từng cấp độ - Giáo trình tổng hợp</p>
        </div>

        {/* Level Selection */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          {grammarLessons.map((level) => (
            <Card
              key={level.id}
              className={`cursor-pointer transition-all ${
                selectedLevel.id === level.id
                  ? 'ring-2 ring-blue-500 shadow-lg'
                  : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedLevel(level)}
            >
              <CardHeader>
                <div className={`w-full h-2 rounded-full bg-gradient-to-r ${level.color} mb-3`}></div>
                <CardTitle className="text-lg">{level.level}</CardTitle>
                <CardDescription className="text-sm">{level.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FileText className="w-4 h-4" />
                  <span>{level.lessons.length} bài học</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Selected Level Details */}
        <div>
          <div className={`h-1 w-full bg-gradient-to-r ${selectedLevel.color} rounded-full mb-8`}></div>
          
          <div className="mb-6">
            <h2 className="text-3xl font-bold mb-2">{selectedLevel.level}</h2>
            <p className="text-gray-600">{selectedLevel.description}</p>
          </div>

          {/* Grammar Lessons */}
          <Accordion type="single" collapsible className="space-y-4">
            {selectedLevel.lessons.map((lesson, index) => (
              <AccordionItem key={lesson.id} value={`lesson-${lesson.id}`} className="border-0">
                <Card>
                  <AccordionTrigger className="hover:no-underline px-6 py-4">
                    <div className="flex items-center gap-4 text-left">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${selectedLevel.color} flex items-center justify-center flex-shrink-0`}>
                        <span className="text-white font-bold">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1">{lesson.title}</h3>
                        <p className="text-sm text-gray-600">{lesson.description}</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    {/* Grammar Pattern */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg mb-6">
                      <h4 className="font-bold mb-2 flex items-center gap-2">
                        <BookOpen className="w-5 h-5" />
                        Cấu trúc:
                      </h4>
                      <p className="text-2xl font-bold text-blue-600 mb-3">{lesson.grammar}</p>
                      <p className="text-gray-700">{lesson.usage}</p>
                    </div>

                    {/* Examples */}
                    <div className="space-y-3">
                      <h4 className="font-bold flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        Ví dụ:
                      </h4>
                      {lesson.examples.map((example, idx) => (
                        <Card key={idx} className="bg-white">
                          <CardContent className="p-4">
                            <div className="space-y-2">
                              <p className="text-xl font-bold text-gray-900">{example.korean}</p>
                              <p className="text-lg text-blue-600">{example.vietnamese}</p>
                              <Badge variant="secondary" className="text-xs">{example.note}</Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* Practice Button */}
                    <div className="mt-6 flex gap-3">
                      <Button className="gap-2">
                        <FileText className="w-4 h-4" />
                        Làm bài tập
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <BookOpen className="w-4 h-4" />
                        Xem thêm ví dụ
                      </Button>
                    </div>
                  </AccordionContent>
                </Card>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Learning Tips */}
        <Card className="mt-12 bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4">📖 Hướng dẫn học ngữ pháp</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold mb-2">Phương pháp học hiệu quả:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Học theo thứ tự từ sơ cấp đến nâng cao</li>
                  <li>• Ghi chép các mẫu câu quan trọng</li>
                  <li>• Tạo câu ví dụ của riêng bạn</li>
                  <li>• Luyện tập với bài tập thực hành</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-2">Mẹo ghi nhớ:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• So sánh với ngữ pháp tiếng Việt</li>
                  <li>• Học trong ngữ cảnh, không học thuộc lòng</li>
                  <li>• Ôn tập thường xuyên các cấu trúc đã học</li>
                  <li>• Kết hợp với nghe, nói, đọc, viết</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
