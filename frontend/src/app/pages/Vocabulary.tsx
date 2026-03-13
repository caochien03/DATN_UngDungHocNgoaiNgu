import { useState } from "react";
import { Navigation } from "../components/Navigation";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Search, BookOpen, Volume2, Star } from "lucide-react";

const vocabularyByTopic = [
  {
    id: 1,
    topic: "Gia đình",
    level: "Sơ cấp",
    icon: "👨‍👩‍👧‍👦",
    words: [
      { korean: "가족", vietnamese: "Gia đình", pronunciation: "gajok" },
      { korean: "아버지", vietnamese: "Bố", pronunciation: "abeoji" },
      { korean: "어머니", vietnamese: "Mẹ", pronunciation: "eomeoni" },
      { korean: "형", vietnamese: "Anh trai (nam nói)", pronunciation: "hyeong" },
      { korean: "누나", vietnamese: "Chị gái (nam nói)", pronunciation: "nuna" },
    ]
  },
  {
    id: 2,
    topic: "Đồ ăn & Thức uống",
    level: "Sơ cấp",
    icon: "🍜",
    words: [
      { korean: "밥", vietnamese: "Cơm", pronunciation: "bap" },
      { korean: "물", vietnamese: "Nước", pronunciation: "mul" },
      { korean: "김치", vietnamese: "Kim chi", pronunciation: "gimchi" },
      { korean: "비빔밥", vietnamese: "Bibimbap", pronunciation: "bibimbap" },
      { korean: "커피", vietnamese: "Cà phê", pronunciation: "keopi" },
    ]
  },
  {
    id: 3,
    topic: "Trường học",
    level: "Sơ cấp",
    icon: "🏫",
    words: [
      { korean: "학교", vietnamese: "Trường học", pronunciation: "hakgyo" },
      { korean: "선생님", vietnamese: "Giáo viên", pronunciation: "seonsaengnim" },
      { korean: "학생", vietnamese: "Học sinh", pronunciation: "haksaeng" },
      { korean: "책", vietnamese: "Sách", pronunciation: "chaek" },
      { korean: "공부", vietnamese: "Học tập", pronunciation: "gongbu" },
    ]
  },
  {
    id: 4,
    topic: "Màu sắc",
    level: "Sơ cấp",
    icon: "🎨",
    words: [
      { korean: "빨강", vietnamese: "Đỏ", pronunciation: "ppalgang" },
      { korean: "파랑", vietnamese: "Xanh dương", pronunciation: "parang" },
      { korean: "노랑", vietnamese: "Vàng", pronunciation: "norang" },
      { korean: "초록", vietnamese: "Xanh lá", pronunciation: "chorok" },
      { korean: "검정", vietnamese: "Đen", pronunciation: "geomjeong" },
    ]
  },
  {
    id: 5,
    topic: "Số đếm",
    level: "Sơ cấp",
    icon: "🔢",
    words: [
      { korean: "하나", vietnamese: "Một (Hàn)", pronunciation: "hana" },
      { korean: "둘", vietnamese: "Hai (Hàn)", pronunciation: "dul" },
      { korean: "셋", vietnamese: "Ba (Hàn)", pronunciation: "set" },
      { korean: "일", vietnamese: "Một (Hán)", pronunciation: "il" },
      { korean: "이", vietnamese: "Hai (Hán)", pronunciation: "i" },
    ]
  },
  {
    id: 6,
    topic: "Thời gian",
    level: "Trung cấp",
    icon: "⏰",
    words: [
      { korean: "오늘", vietnamese: "Hôm nay", pronunciation: "oneul" },
      { korean: "어제", vietnamese: "Hôm qua", pronunciation: "eoje" },
      { korean: "내일", vietnamese: "Ngày mai", pronunciation: "naeil" },
      { korean: "아침", vietnamese: "Buổi sáng", pronunciation: "achim" },
      { korean: "저녁", vietnamese: "Buổi tối", pronunciation: "jeonyeok" },
    ]
  },
  {
    id: 7,
    topic: "Cảm xúc",
    level: "Trung cấp",
    icon: "😊",
    words: [
      { korean: "행복", vietnamese: "Hạnh phúc", pronunciation: "haengbok" },
      { korean: "슬픔", vietnamese: "Buồn", pronunciation: "seulpeum" },
      { korean: "화", vietnamese: "T화ức giận", pronunciation: "hwa" },
      { korean: "사랑", vietnamese: "Yêu", pronunciation: "sarang" },
      { korean: "기쁨", vietnamese: "Vui", pronunciation: "gippeum" },
    ]
  },
  {
    id: 8,
    topic: "Công việc",
    level: "Trung cấp",
    icon: "💼",
    words: [
      { korean: "회사", vietnamese: "Công ty", pronunciation: "hoesa" },
      { korean: "직원", vietnamese: "Nhân viên", pronunciation: "jigwon" },
      { korean: "사장", vietnamese: "Giám đốc", pronunciation: "sajang" },
      { korean: "회의", vietnamese: "Họp", pronunciation: "hoeui" },
      { korean: "일", vietnamese: "Công việc", pronunciation: "il" },
    ]
  },
];

const vocabularyByLevel = {
  "Sơ cấp": vocabularyByTopic.filter(t => t.level === "Sơ cấp"),
  "Trung cấp": vocabularyByTopic.filter(t => t.level === "Trung cấp"),
  "Nâng cao": []
};

export default function Vocabulary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopic, setSelectedTopic] = useState(vocabularyByTopic[0]);

  const filteredWords = selectedTopic.words.filter(word =>
    word.korean.includes(searchTerm) ||
    word.vietnamese.toLowerCase().includes(searchTerm.toLowerCase()) ||
    word.pronunciation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const speakKorean = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Từ vựng tiếng Hàn</h1>
          <p className="text-xl text-gray-600">Học từ vựng theo chủ đề và cấp độ</p>
        </div>

        {/* Tabs for Topic/Level */}
        <Tabs defaultValue="topic" className="mb-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="topic">Theo chủ đề</TabsTrigger>
            <TabsTrigger value="level">Theo cấp độ</TabsTrigger>
          </TabsList>

          {/* By Topic */}
          <TabsContent value="topic" className="space-y-8">
            {/* Topic Grid */}
            <div className="grid md:grid-cols-4 gap-4">
              {vocabularyByTopic.map((topic) => (
                <Card
                  key={topic.id}
                  className={`cursor-pointer transition-all ${
                    selectedTopic.id === topic.id
                      ? 'ring-2 ring-pink-500 shadow-lg'
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedTopic(topic)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{topic.icon}</div>
                    <h3 className="font-bold mb-1">{topic.topic}</h3>
                    <Badge variant="secondary" className="text-xs">{topic.level}</Badge>
                    <p className="text-sm text-gray-600 mt-2">{topic.words.length} từ</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* By Level */}
          <TabsContent value="level" className="space-y-8">
            {Object.entries(vocabularyByLevel).map(([level, topics]) => (
              <div key={level}>
                <h2 className="text-2xl font-bold mb-4">{level}</h2>
                <div className="grid md:grid-cols-4 gap-4">
                  {topics.map((topic) => (
                    <Card
                      key={topic.id}
                      className="cursor-pointer hover:shadow-md transition-all"
                      onClick={() => setSelectedTopic(topic)}
                    >
                      <CardContent className="p-6 text-center">
                        <div className="text-4xl mb-3">{topic.icon}</div>
                        <h3 className="font-bold mb-1">{topic.topic}</h3>
                        <p className="text-sm text-gray-600">{topic.words.length} từ</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>

        {/* Selected Topic Details */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-5xl">{selectedTopic.icon}</div>
                  <div>
                    <CardTitle className="text-2xl">{selectedTopic.topic}</CardTitle>
                    <CardDescription>
                      <Badge className="mt-2">{selectedTopic.level}</Badge>
                    </CardDescription>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="gap-2">
                    <BookOpen className="w-4 h-4" />
                    Học flashcards
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Star className="w-4 h-4" />
                    Lưu chủ đề
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Tìm kiếm từ vựng..."
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Word List */}
              <div className="space-y-3">
                {filteredWords.map((word, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-baseline gap-4 mb-2">
                            <h3 className="text-3xl font-bold text-blue-600">{word.korean}</h3>
                            <p className="text-lg text-gray-600">{word.vietnamese}</p>
                          </div>
                          <p className="text-sm text-gray-500">Phát âm: {word.pronunciation}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => speakKorean(word.korean)}
                            variant="outline"
                            size="sm"
                            className="gap-2"
                          >
                            <Volume2 className="w-4 h-4" />
                            Nghe
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Star className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {filteredWords.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    Không tìm thấy từ vựng phù hợp
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Learning Tips */}
        <Card className="mt-8 bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200">
          <CardContent className="p-6">
            <h3 className="font-bold mb-3">💡 Mẹo học từ vựng hiệu quả:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-gray-700">
                <li>• Học 10-15 từ mới mỗi ngày</li>
                <li>• Ôn tập các từ đã học định kỳ</li>
                <li>• Sử dụng flashcards để ghi nhớ lâu hơn</li>
              </ul>
              <ul className="space-y-2 text-gray-700">
                <li>• Tạo câu ví dụ với từ vựng mới</li>
                <li>• Luyện phát âm bằng cách nghe và nhắc lại</li>
                <li>• Nhóm từ theo chủ đề để dễ nhớ</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
