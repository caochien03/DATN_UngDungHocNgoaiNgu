import { useState, useRef, useEffect } from "react";
import { Navigation } from "../components/Navigation";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { CheckCircle2, XCircle, Volume2, RotateCcw, Sparkles } from "lucide-react";

const writingExercises = [
  { id: 1, vietnamese: "Xin chào", korean: "안녕하세요", level: "Cơ bản" },
  { id: 2, vietnamese: "Cảm ơn", korean: "감사합니다", level: "Cơ bản" },
  { id: 3, vietnamese: "Xin lỗi", korean: "미안합니다", level: "Cơ bản" },
  { id: 4, vietnamese: "Tình yêu", korean: "사랑", level: "Cơ bản" },
  { id: 5, vietnamese: "Bạn bè", korean: "친구", level: "Cơ bản" },
  { id: 6, vietnamese: "Gia đình", korean: "가족", level: "Cơ bản" },
  { id: 7, vietnamese: "Trường học", korean: "학교", level: "Trung cấp" },
  { id: 8, vietnamese: "Tôi yêu bạn", korean: "사랑해요", level: "Trung cấp" },
  { id: 9, vietnamese: "Chúc mừng năm mới", korean: "새해 복 많이 받으세요", level: "Nâng cao" },
  { id: 10, vietnamese: "Rất vui được gặp bạn", korean: "만나서 반갑습니다", level: "Trung cấp" },
];

export default function WritingPractice() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [keyboardInput, setKeyboardInput] = useState("");
  const [handwritingInput, setHandwritingInput] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const currentExercise = writingExercises[currentIndex];

  // Canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000';
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHandwritingInput("");
  };

  const checkAnswer = (inputType: 'keyboard' | 'handwriting') => {
    const userAnswer = inputType === 'keyboard' ? keyboardInput.trim() : handwritingInput;
    const correctAnswer = currentExercise.korean;
    
    const correct = userAnswer === correctAnswer;
    setIsCorrect(correct);
    setIsChecked(true);
    setAttempts(attempts + 1);
    
    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < writingExercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setKeyboardInput("");
      setHandwritingInput("");
      setIsChecked(false);
      setIsCorrect(null);
      clearCanvas();
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setKeyboardInput("");
    setHandwritingInput("");
    setIsChecked(false);
    setIsCorrect(null);
    setScore(0);
    setAttempts(0);
    clearCanvas();
  };

  const speakKorean = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentExercise.korean);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Simulate AI handwriting recognition (mock)
  const recognizeHandwriting = () => {
    setHandwritingInput(currentExercise.korean);
    setTimeout(() => {
      alert("Tính năng nhận dạng chữ viết tay sẽ được tích hợp AI trong phiên bản tiếp theo!");
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Navigation />
      
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Luyện viết tiếng Hàn</h1>
          <p className="text-xl text-gray-600">Nhìn tiếng Việt, viết tiếng Hàn</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{currentIndex + 1}/{writingExercises.length}</p>
              <p className="text-sm text-gray-600">Câu hiện tại</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{score}</p>
              <p className="text-sm text-gray-600">Đúng</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-orange-600">{attempts}</p>
              <p className="text-sm text-gray-600">Lượt làm</p>
            </CardContent>
          </Card>
        </div>

        {/* Exercise */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Bài tập {currentIndex + 1}</CardTitle>
              <Badge>{currentExercise.level}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            {/* Question */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-lg mb-6 text-center">
              <p className="text-sm text-gray-600 mb-2">Viết từ này bằng tiếng Hàn:</p>
              <p className="text-4xl font-bold text-blue-600 mb-4">{currentExercise.vietnamese}</p>
              <Button onClick={speakKorean} variant="outline" size="sm" className="gap-2">
                <Volume2 className="w-4 h-4" />
                Nghe đáp án
              </Button>
            </div>

            {/* Tabs for input methods */}
            <Tabs defaultValue="keyboard" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="keyboard">⌨️ Bàn phím</TabsTrigger>
                <TabsTrigger value="handwriting">✍️ Viết tay</TabsTrigger>
              </TabsList>

              {/* Keyboard Input */}
              <TabsContent value="keyboard" className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nhập từ tiếng Hàn:</label>
                  <Input
                    value={keyboardInput}
                    onChange={(e) => setKeyboardInput(e.target.value)}
                    placeholder="Nhập câu trả lời..."
                    className="text-2xl h-16"
                    disabled={isChecked}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !isChecked) {
                        checkAnswer('keyboard');
                      }
                    }}
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    💡 Bạn cần cài đặt bàn phím tiếng Hàn trên thiết bị của mình
                  </p>
                </div>

                {!isChecked && keyboardInput && (
                  <Button onClick={() => checkAnswer('keyboard')} className="w-full" size="lg">
                    Kiểm tra
                  </Button>
                )}
              </TabsContent>

              {/* Handwriting Input */}
              <TabsContent value="handwriting" className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Viết tay (dùng chuột hoặc iPad):</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg overflow-hidden bg-white">
                    <canvas
                      ref={canvasRef}
                      width={800}
                      height={300}
                      className="w-full cursor-crosshair touch-none"
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={stopDrawing}
                    />
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button onClick={clearCanvas} variant="outline" size="sm" className="gap-2">
                      <RotateCcw className="w-4 h-4" />
                      Xóa
                    </Button>
                    <Button onClick={recognizeHandwriting} variant="outline" size="sm" className="gap-2">
                      <Sparkles className="w-4 h-4" />
                      Nhận dạng AI (Demo)
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    ✨ Tính năng nhận dạng chữ viết tay bằng AI đang phát triển
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            {/* Result */}
            {isChecked && isCorrect !== null && (
              <div className={`mt-6 p-6 rounded-lg ${
                isCorrect 
                  ? 'bg-green-50 border-2 border-green-200' 
                  : 'bg-orange-50 border-2 border-orange-200'
              }`}>
                <div className="flex items-start gap-4">
                  {isCorrect ? (
                    <CheckCircle2 className="w-8 h-8 text-green-600 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-8 h-8 text-orange-600 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-2">
                      {isCorrect ? '✅ Chính xác!' : '❌ Chưa đúng!'}
                    </h4>
                    {!isCorrect && (
                      <div className="space-y-2">
                        <p>Đáp án đúng: <span className="font-bold text-2xl">{currentExercise.korean}</span></p>
                        <p className="text-sm text-gray-600">Hãy thử lại hoặc chuyển sang câu tiếp theo!</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4 mt-6">
              {isChecked && (
                <>
                  <Button onClick={() => {
                    setIsChecked(false);
                    setIsCorrect(null);
                    setKeyboardInput("");
                    setHandwritingInput("");
                    clearCanvas();
                  }} variant="outline" className="flex-1">
                    Làm lại
                  </Button>
                  <Button onClick={handleNext} className="flex-1" disabled={currentIndex === writingExercises.length - 1}>
                    C��u tiếp theo
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Complete */}
        {currentIndex === writingExercises.length - 1 && isChecked && (
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardContent className="p-8 text-center">
              <h3 className="text-3xl font-bold mb-4">🎉 Hoàn thành!</h3>
              <p className="text-xl mb-4">Bạn đã làm đúng {score}/{attempts} lượt</p>
              <Button onClick={handleReset} size="lg" className="gap-2">
                <RotateCcw className="w-5 h-5" />
                Bắt đầu lại
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Tips */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <h3 className="font-bold mb-3">💡 Mẹo luyện viết:</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Cài đặt bàn phím tiếng Hàn trên thiết bị để thực hành</li>
              <li>• Nếu dùng iPad, có thể viết tay trực tiếp lên màn hình</li>
              <li>• Luyện viết đều đặn mỗi ngày để nhớ lâu hơn</li>
              <li>• Kết hợp với flashcards để học từ vựng hiệu quả hơn</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
