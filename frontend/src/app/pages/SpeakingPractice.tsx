import { useState } from "react";
import { Navigation } from "../components/Navigation";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Mic, MicOff, Volume2, Award, Bot, CheckCircle2, AlertCircle } from "lucide-react";

const scenarios = [
  {
    id: 1,
    title: "Giới thiệu bản thân",
    level: "Sơ cấp",
    description: "Học cách tự giới thiệu bản thân",
    color: "from-green-400 to-emerald-500",
    phrases: [
      { korean: "안녕하세요. 저는 [이름]입니다.", vietnamese: "Xin chào. Tôi là [tên]." },
      { korean: "저는 베트남 사람입니다.", vietnamese: "Tôi là người Việt Nam." },
      { korean: "저는 학생입니다.", vietnamese: "Tôi là học sinh." },
    ]
  },
  {
    id: 2,
    title: "Đặt món ăn",
    level: "Sơ cấp",
    description: "Gọi món tại nhà hàng Hàn Quốc",
    color: "from-blue-400 to-indigo-500",
    phrases: [
      { korean: "주문하겠습니다.", vietnamese: "Tôi muốn gọi món." },
      { korean: "비빔밥 하나 주세요.", vietnamese: "Cho tôi một suất bibimbap." },
      { korean: "얼마예요?", vietnamese: "Bao nhiêu tiền?" },
    ]
  },
  {
    id: 3,
    title: "Hỏi đường",
    level: "Trung cấp",
    description: "Hỏi và chỉ đường bằng tiếng Hàn",
    color: "from-purple-400 to-pink-500",
    phrases: [
      { korean: "실례합니다. 지하철역이 어디예요?", vietnamese: "Xin lỗi. Ga tàu điện ngầm ở đâu?" },
      { korean: "여기서 얼마나 걸려요?", vietnamese: "Từ đây đi bao lâu?" },
      { korean: "이 길로 가면 돼요?", vietnamese: "Đi đường này được không?" },
    ]
  },
  {
    id: 4,
    title: "Phỏng vấn xin việc",
    level: "Cao cấp",
    description: "Thực hành phỏng vấn công việc",
    color: "from-orange-400 to-red-500",
    phrases: [
      { korean: "저는 이 분야에서 5년 경력이 있습니다.", vietnamese: "Tôi có 5 năm kinh nghiệm trong lĩnh vực này." },
      { korean: "저의 강점은 빠른 학습 능력입니다.", vietnamese: "Điểm mạnh của tôi là khả năng học hỏi nhanh." },
      { korean: "이 회사에서 일하고 싶습니다.", vietnamese: "Tôi muốn làm việc tại công ty này." },
    ]
  },
];

const pronunciationScores = {
  excellent: { min: 90, label: "Xuất sắc", color: "text-green-600", emoji: "🎉" },
  good: { min: 70, label: "Tốt", color: "text-blue-600", emoji: "👍" },
  fair: { min: 50, label: "Khá", color: "text-orange-600", emoji: "💪" },
  needsWork: { min: 0, label: "Cần cải thiện", color: "text-red-600", emoji: "📚" },
};

export default function SpeakingPractice() {
  const [selectedScenario, setSelectedScenario] = useState(scenarios[0]);
  const [isRecording, setIsRecording] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const phrase = selectedScenario.phrases[currentPhrase];

  const handleRecord = () => {
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      // Simulate recording and AI analysis
      setTimeout(() => {
        setIsRecording(false);
        simulateAIScoring();
      }, 3000);
    }
  };

  const simulateAIScoring = () => {
    // Simulate AI pronunciation scoring
    const score = Math.floor(Math.random() * 30) + 70; // Random score 70-100
    setScores([...scores, score]);
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentPhrase < selectedScenario.phrases.length - 1) {
      setCurrentPhrase(currentPhrase + 1);
      setShowResult(false);
    }
  };

  const handleReset = () => {
    setCurrentPhrase(0);
    setScores([]);
    setShowResult(false);
  };

  const speakKorean = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const getScoreLevel = (score: number) => {
    if (score >= pronunciationScores.excellent.min) return pronunciationScores.excellent;
    if (score >= pronunciationScores.good.min) return pronunciationScores.good;
    if (score >= pronunciationScores.fair.min) return pronunciationScores.fair;
    return pronunciationScores.needsWork;
  };

  const averageScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
  const progress = ((currentPhrase + 1) / selectedScenario.phrases.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-green-50">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Bot className="w-12 h-12 text-teal-600" />
            <h1 className="text-4xl font-bold">Luyện nói với AI</h1>
          </div>
          <p className="text-xl text-gray-600">Thực hành phát âm và hội thoại với trợ lý AI thông minh</p>
        </div>

        {/* AI Notice */}
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Bot className="w-8 h-8 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-2">🤖 Công nghệ AI chấm điểm phát âm</h3>
                <p className="text-gray-700">
                  Hệ thống AI sẽ phân tích giọng nói của bạn, đánh giá phát âm, ngữ điệu và độ chính xác. 
                  Bạn sẽ nhận được phản hồi chi tiết để cải thiện kỹ năng nói.
                </p>
                <p className="text-sm text-orange-600 mt-2">
                  ⚠️ Demo: Tính năng AI đang trong giai đoạn phát triển. Điểm số hiện tại là mô phỏng.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Scenario Selection */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold mb-4">Tình huống</h2>
            <div className="space-y-3">
              {scenarios.map((scenario) => (
                <Card
                  key={scenario.id}
                  className={`cursor-pointer transition-all ${
                    selectedScenario.id === scenario.id
                      ? 'ring-2 ring-teal-500 shadow-lg'
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => {
                    setSelectedScenario(scenario);
                    handleReset();
                  }}
                >
                  <CardHeader className="p-4">
                    <div className={`h-1 w-full bg-gradient-to-r ${scenario.color} rounded-full mb-3`}></div>
                    <CardTitle className="text-lg">{scenario.title}</CardTitle>
                    <CardDescription className="text-sm">
                      <Badge variant="secondary" className="mb-2">{scenario.level}</Badge>
                      <p>{scenario.description}</p>
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          {/* Practice Area */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <CardTitle className="text-2xl">{selectedScenario.title}</CardTitle>
                  <Badge>{selectedScenario.level}</Badge>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Câu {currentPhrase + 1} / {selectedScenario.phrases.length}</span>
                    {averageScore > 0 && <span>Điểm TB: {averageScore}</span>}
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Phrase to Practice */}
                <div className="bg-gradient-to-r from-teal-50 to-green-50 p-8 rounded-lg">
                  <div className="text-center mb-4">
                    <p className="text-sm text-gray-600 mb-2">Hãy nói câu này:</p>
                    <p className="text-3xl font-bold text-teal-600 mb-3">{phrase.korean}</p>
                    <p className="text-lg text-gray-700 mb-4">{phrase.vietnamese}</p>
                    <Button onClick={() => speakKorean(phrase.korean)} variant="outline" className="gap-2">
                      <Volume2 className="w-5 h-5" />
                      Nghe mẫu
                    </Button>
                  </div>
                </div>

                {/* Recording Controls */}
                <div className="text-center space-y-4">
                  <Button
                    onClick={handleRecord}
                    disabled={showResult}
                    size="lg"
                    className={`w-full max-w-md gap-3 ${
                      isRecording 
                        ? 'bg-red-600 hover:bg-red-700' 
                        : 'bg-teal-600 hover:bg-teal-700'
                    }`}
                  >
                    {isRecording ? (
                      <>
                        <MicOff className="w-6 h-6 animate-pulse" />
                        Đang ghi âm...
                      </>
                    ) : (
                      <>
                        <Mic className="w-6 h-6" />
                        {showResult ? 'Đã ghi âm' : 'Bắt đầu ghi âm'}
                      </>
                    )}
                  </Button>

                  {isRecording && (
                    <div className="flex items-center justify-center gap-2 text-red-600">
                      <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">AI đang lắng nghe...</span>
                    </div>
                  )}
                </div>

                {/* AI Result */}
                {showResult && scores.length > 0 && (
                  <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <Bot className="w-8 h-8 text-teal-600 flex-shrink-0" />
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-3">Kết quả đánh giá AI</h3>
                          
                          <div className="space-y-4">
                            {/* Overall Score */}
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium">Điểm tổng thể:</span>
                                <span className={`text-3xl font-bold ${getScoreLevel(scores[scores.length - 1]).color}`}>
                                  {scores[scores.length - 1]}/100
                                </span>
                              </div>
                              <Progress value={scores[scores.length - 1]} className="h-3" />
                              <div className="mt-2 flex items-center gap-2">
                                <span className="text-2xl">{getScoreLevel(scores[scores.length - 1]).emoji}</span>
                                <span className={`font-bold ${getScoreLevel(scores[scores.length - 1]).color}`}>
                                  {getScoreLevel(scores[scores.length - 1]).label}
                                </span>
                              </div>
                            </div>

                            {/* Detailed Feedback */}
                            <div className="border-t pt-4 space-y-3">
                              <div className="flex items-start gap-2">
                                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                <div>
                                  <p className="font-medium">Điểm mạnh:</p>
                                  <p className="text-sm text-gray-700">Phát âm các phụ âm rõ ràng, tốc độ phù hợp</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2">
                                <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                                <div>
                                  <p className="font-medium">Cần cải thiện:</p>
                                  <p className="text-sm text-gray-700">Chú ý ngữ điệu ở cuối câu, luyện tập thêm các nguyên âm đôi</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3 mt-4">
                        <Button onClick={() => setShowResult(false)} variant="outline" className="flex-1">
                          Thử lại
                        </Button>
                        {currentPhrase < selectedScenario.phrases.length - 1 && (
                          <Button onClick={handleNext} className="flex-1">
                            Câu tiếp theo
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Completion */}
                {currentPhrase === selectedScenario.phrases.length - 1 && scores.length === selectedScenario.phrases.length && (
                  <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
                    <CardContent className="p-6 text-center">
                      <Award className="w-16 h-16 mx-auto mb-4 text-yellow-600" />
                      <h3 className="text-2xl font-bold mb-2">🎉 Hoàn thành tình huống!</h3>
                      <p className="text-lg mb-4">Điểm trung bình: <span className="font-bold text-teal-600">{averageScore}/100</span></p>
                      <Button onClick={handleReset} size="lg">
                        Luyện tập lại
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="mt-6 bg-teal-50 border-teal-200">
              <CardContent className="p-6">
                <h3 className="font-bold mb-3">💡 Mẹo luyện nói hiệu quả:</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Nghe mẫu nhiều lần trước khi ghi âm</li>
                  <li>• Nói chậm rãi, rõ ràng, chú ý phát âm từng âm tiết</li>
                  <li>• Thực hành trong môi trường yên tĩnh để AI nhận diện tốt hơn</li>
                  <li>• Lặp lại những câu có điểm thấp để cải thiện</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
