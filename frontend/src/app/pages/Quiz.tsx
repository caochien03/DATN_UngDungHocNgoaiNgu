import { useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { Navigation } from "../components/Navigation";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Label } from "../components/ui/label";
import { CheckCircle2, XCircle, Trophy } from "lucide-react";
import { getDeck } from "../lib/decks";

const quizData = [
  {
    question: "안녕하세요 có nghĩa là gì?",
    options: ["Xin chào", "Tạm biệt", "Cảm ơn", "Xin lỗi"],
    correct: 0,
    explanation: "안녕하세요 (annyeonghaseyo) là lời chào phổ biến nhất trong tiếng Hàn."
  },
  {
    question: "Từ nào có nghĩa là 'Cảm ơn'?",
    options: ["미안합니다", "감사합니다", "안녕히 가세요", "죄송합니다"],
    correct: 1,
    explanation: "감사합니다 (gamsahamnida) là cách nói 'cảm ơn' lịch sự trong tiếng Hàn."
  },
  {
    question: "Chọn nghĩa đúng của '학교':",
    options: ["Nhà", "Trường học", "Công viên", "Cửa hàng"],
    correct: 1,
    explanation: "학교 (hakgyo) có nghĩa là trường học."
  },
  {
    question: "'물' có nghĩa là gì?",
    options: ["Lửa", "Đất", "Nước", "Gió"],
    correct: 2,
    explanation: "물 (mul) có nghĩa là nước."
  },
  {
    question: "Từ nào nghĩa là 'Bạn bè'?",
    options: ["친구", "가족", "선생님", "학생"],
    correct: 0,
    explanation: "친구 (chingu) có nghĩa là bạn bè."
  },
  {
    question: "'사랑' có nghĩa là gì?",
    options: ["Ghét", "Tình yêu", "Hạnh phúc", "Buồn"],
    correct: 1,
    explanation: "사랑 (sarang) có nghĩa là tình yêu."
  },
  {
    question: "Nghĩa của '책' là gì?",
    options: ["Bút", "Sách", "Bàn", "Ghế"],
    correct: 1,
    explanation: "책 (chaek) có nghĩa là sách."
  },
  {
    question: "'밥' có nghĩa là gì?",
    options: ["Mì", "Bánh mì", "Cơm", "Phở"],
    correct: 2,
    explanation: "밥 (bap) có nghĩa là cơm."
  },
];

type QuizQuestion = {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
};

function shuffle<T>(arr: T[]) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function buildQuizFromDeck(deck: NonNullable<ReturnType<typeof getDeck>>): QuizQuestion[] {
  const cards = deck.cards.filter((c) => c.front.trim() && c.back.trim());
  if (cards.length < 2) return [];

  const pool = shuffle(cards).slice(0, Math.min(12, cards.length));
  return pool.map((c) => {
    const distractors = shuffle(cards.filter((x) => x.id !== c.id))
      .slice(0, 3)
      .map((x) => x.front);
    const options = shuffle([c.front, ...distractors]);
    const correct = options.findIndex((o) => o === c.front);
    return {
      question: `"${c.back}" có nghĩa là gì?`,
      options,
      correct: Math.max(0, correct),
      explanation: `Đáp án đúng: ${c.front}.`,
    };
  });
}

export default function Quiz() {
  const params = useParams();
  const deckId = params.deckId as string | undefined;

  const deck = useMemo(() => (deckId ? getDeck(deckId) : null), [deckId]);
  const deckQuiz = useMemo(() => (deck ? buildQuizFromDeck(deck) : []), [deck]);
  const data = deckQuiz.length > 0 ? deckQuiz : quizData;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const question = data[currentQuestion];
  const progress = ((currentQuestion + 1) / data.length) * 100;

  const handleAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === question.correct;
    setAnswers([...answers, isCorrect]);
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentQuestion < data.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    const percentage = (score / data.length) * 100;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <Navigation />
        
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
            <CardContent className="p-12 text-center">
              <Trophy className="w-24 h-24 mx-auto mb-6 text-yellow-500" />
              <h2 className="text-4xl font-bold mb-4">Hoàn thành bài kiểm tra!</h2>
              
              <div className="my-8">
                <div className="text-6xl font-bold text-blue-600 mb-2">
                  {score}/{data.length}
                </div>
                <p className="text-2xl text-gray-600">
                  Điểm của bạn: {percentage.toFixed(0)}%
                </p>
              </div>

              <div className="mb-8">
                {percentage >= 80 && (
                  <Badge className="text-lg px-4 py-2 bg-green-500">Xuất sắc! 🎉</Badge>
                )}
                {percentage >= 60 && percentage < 80 && (
                  <Badge className="text-lg px-4 py-2 bg-blue-500">Tốt lắm! 👏</Badge>
                )}
                {percentage >= 40 && percentage < 60 && (
                  <Badge className="text-lg px-4 py-2 bg-orange-500">Cần cố gắng thêm 💪</Badge>
                )}
                {percentage < 40 && (
                  <Badge className="text-lg px-4 py-2 bg-red-500">Hãy ôn tập thêm nhé 📚</Badge>
                )}
              </div>

              {/* Review Answers */}
              <div className="grid gap-3 mb-8 text-left">
                {data.map((q, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg">
                    {answers[index] ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium">Câu {index + 1}: {q.question}</p>
                      <p className="text-sm text-gray-600">Đáp án: {q.options[q.correct]}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {deckId && deck && (
                  <>
                    <Link to={`/decks/${deckId}`}>
                      <Button variant="outline" size="lg">
                        Về bộ từ
                      </Button>
                    </Link>
                    <Link to="/practice">
                      <Button variant="outline" size="lg">
                        Chọn bộ khác
                      </Button>
                    </Link>
                    <Link to={`/flashcards/${deckId}`}>
                      <Button variant="outline" size="lg">
                        Làm Flashcards
                      </Button>
                    </Link>
                    <Link to={`/matching/${deckId}`}>
                      <Button variant="outline" size="lg">
                        Chơi ghép nối
                      </Button>
                    </Link>
                    <Link to={`/writing/${deckId}`}>
                      <Button variant="outline" size="lg">
                        Luyện viết
                      </Button>
                    </Link>
                  </>
                )}
                {!deckId && (
                  <>
                    <Link to="/practice">
                      <Button variant="outline" size="lg">
                        Chọn bộ từ
                      </Button>
                    </Link>
                    <Link to="/decks">
                      <Button variant="outline" size="lg">
                        Tạo bộ từ
                      </Button>
                    </Link>
                  </>
                )}
                <Button onClick={handleRestart} size="lg">
                  Làm lại trắc nghiệm
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Bài tập trắc nghiệm</h1>
            <p className="text-xl text-gray-600">
              {deck ? `Bộ: ${deck.title}` : "Kiểm tra kiến thức (demo)"}
            </p>
            {deckId && !deck && (
              <div className="mt-3 text-sm text-orange-700">
                Không tìm thấy bộ từ. Bạn có thể{" "}
                <Link className="underline" to="/decks">
                  chọn lại bộ từ
                </Link>
                .
              </div>
            )}
            {deck && deckQuiz.length === 0 && (
              <div className="mt-3 text-sm text-orange-700">
                Bộ từ cần tối thiểu 2 thẻ để tạo trắc nghiệm. Đang hiển thị demo.
              </div>
            )}
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Câu hỏi {currentQuestion + 1} / {data.length}</span>
            <span>Điểm: {score}/{currentQuestion + (showResult ? 1 : 0)}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-start mb-4">
              <Badge variant="secondary">Câu {currentQuestion + 1}</Badge>
              <Badge className="bg-blue-600">Từ vựng</Badge>
            </div>
            <CardTitle className="text-2xl">{question.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedAnswer?.toString()}
              onValueChange={(value) => setSelectedAnswer(parseInt(value))}
              disabled={showResult}
            >
              <div className="space-y-3">
                {question.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrect = question.correct === index;
                  const showCorrect = showResult && isCorrect;
                  const showWrong = showResult && isSelected && !isCorrect;

                  return (
                    <div
                      key={index}
                      className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${
                        showCorrect
                          ? 'border-green-500 bg-green-50'
                          : showWrong
                          ? 'border-red-500 bg-red-50'
                          : isSelected
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <Label
                        htmlFor={`option-${index}`}
                        className="flex-1 cursor-pointer text-lg"
                      >
                        {option}
                      </Label>
                      {showCorrect && <CheckCircle2 className="w-6 h-6 text-green-600" />}
                      {showWrong && <XCircle className="w-6 h-6 text-red-600" />}
                    </div>
                  );
                })}
              </div>
            </RadioGroup>

            {/* Explanation */}
            {showResult && (
              <div className={`mt-6 p-4 rounded-lg ${
                selectedAnswer === question.correct
                  ? 'bg-green-50 border-2 border-green-200'
                  : 'bg-orange-50 border-2 border-orange-200'
              }`}>
                <h4 className="font-bold mb-2 flex items-center gap-2">
                  {selectedAnswer === question.correct ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span className="text-green-700">Chính xác!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-orange-600" />
                      <span className="text-orange-700">Chưa đúng!</span>
                    </>
                  )}
                </h4>
                <p className="text-gray-700">{question.explanation}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-center gap-4">
          {!showResult ? (
            <Button
              onClick={handleAnswer}
              disabled={selectedAnswer === null}
              size="lg"
              className="px-12"
            >
              Trả lời
            </Button>
          ) : (
            <Button onClick={handleNext} size="lg" className="px-12">
              {currentQuestion < data.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
