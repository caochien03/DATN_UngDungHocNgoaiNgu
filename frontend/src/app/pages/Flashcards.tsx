import { useMemo, useState } from "react";
import { useParams, Link } from "react-router";
import { Navigation } from "../components/Navigation";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { ChevronLeft, ChevronRight, RotateCcw, Volume2, Check, X } from "lucide-react";
import { getDeck } from "../lib/decks";

const flashcardSets = [
  {
    id: 1,
    title: "Từ vựng TOPIK I - Cơ bản",
    level: "Sơ cấp",
    cards: [
      { korean: "안녕하세요", vietnamese: "Xin chào", pronunciation: "annyeonghaseyo" },
      { korean: "감사합니다", vietnamese: "Cảm ơn", pronunciation: "gamsahamnida" },
      { korean: "미안합니다", vietnamese: "Xin lỗi", pronunciation: "mianhamnida" },
      { korean: "사랑", vietnamese: "Tình yêu", pronunciation: "sarang" },
      { korean: "친구", vietnamese: "Bạn bè", pronunciation: "chingu" },
      { korean: "가족", vietnamese: "Gia đình", pronunciation: "gajok" },
      { korean: "학교", vietnamese: "Trường học", pronunciation: "hakgyo" },
      { korean: "책", vietnamese: "Sách", pronunciation: "chaek" },
      { korean: "물", vietnamese: "Nước", pronunciation: "mul" },
      { korean: "밥", vietnamese: "Cơm", pronunciation: "bap" },
    ]
  }
];

export default function Flashcards() {
  const params = useParams();
  const deckId = params.deckId as string | undefined;

  const deck = useMemo(() => (deckId ? getDeck(deckId) : null), [deckId]);

  const currentSet = useMemo(() => {
    if (!deck) return flashcardSets[0];
    return {
      id: deck.id,
      title: deck.title,
      level: `${deck.sourceLanguageCode.toUpperCase()} → ${deck.targetLanguageCode.toUpperCase()}`,
      cards: deck.cards.map((c) => ({
        front: c.front,
        back: c.back,
      })),
      ttsLang: deck.targetLanguageCode,
    };
  }, [deck]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState<number[]>([]);
  const [unknownCards, setUnknownCards] = useState<number[]>([]);

  const currentCard = currentSet.cards[currentIndex];
  const progress = ((currentIndex + 1) / currentSet.cards.length) * 100;

  const handleNext = () => {
    if (currentIndex < currentSet.cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleKnown = () => {
    if (!knownCards.includes(currentIndex)) {
      setKnownCards([...knownCards, currentIndex]);
    }
    handleNext();
  };

  const handleUnknown = () => {
    if (!unknownCards.includes(currentIndex)) {
      setUnknownCards([...unknownCards, currentIndex]);
    }
    handleNext();
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setKnownCards([]);
    setUnknownCards([]);
  };

  const speakKorean = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        "back" in currentCard ? (currentCard as any).back : (currentCard as any).korean
      );
      const lang =
        "ttsLang" in currentSet && typeof (currentSet as any).ttsLang === "string"
          ? (currentSet as any).ttsLang
          : "ko";
      utterance.lang = lang.includes("-") ? lang : `${lang}-${lang.toUpperCase()}`;
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Flashcards</h1>
          <p className="text-xl text-gray-600 mb-4">{currentSet.title}</p>
          <Badge variant="secondary">{currentSet.level}</Badge>
          {deckId && !deck && (
            <div className="mt-4 text-sm text-orange-700">
              Không tìm thấy bộ từ. Bạn có thể{" "}
              <Link className="underline" to="/decks">
                chọn lại bộ từ
              </Link>
              .
            </div>
          )}
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Thẻ {currentIndex + 1} / {currentSet.cards.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Đã biết</p>
                <p className="text-2xl font-bold text-green-600">{knownCards.length}</p>
              </div>
              <Check className="w-8 h-8 text-green-600" />
            </CardContent>
          </Card>
          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Cần ôn</p>
                <p className="text-2xl font-bold text-orange-600">{unknownCards.length}</p>
              </div>
              <X className="w-8 h-8 text-orange-600" />
            </CardContent>
          </Card>
        </div>

        {/* Flashcard */}
        <div className="mb-8 perspective-1000">
          <div
            className={`relative w-full h-[400px] cursor-pointer transition-transform duration-500 transform-style-3d ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            {/* Front */}
            <Card className={`absolute inset-0 backface-hidden ${isFlipped ? 'invisible' : ''}`}>
              <CardContent className="h-full flex flex-col items-center justify-center p-8">
                <div className="text-center">
                  <p className="text-6xl font-bold mb-4">
                    {"front" in currentCard ? (currentCard as any).front : (currentCard as any).korean}
                  </p>
                  {"pronunciation" in (currentCard as any) && (
                    <p className="text-xl text-gray-500 mb-8">{(currentCard as any).pronunciation}</p>
                  )}
                  <Button onClick={(e) => { e.stopPropagation(); speakKorean(); }} variant="outline" className="gap-2">
                    <Volume2 className="w-5 h-5" />
                    Nghe phát âm
                  </Button>
                </div>
                <p className="text-sm text-gray-400 mt-8">Nhấp để xem nghĩa</p>
              </CardContent>
            </Card>

            {/* Back */}
            <Card className={`absolute inset-0 backface-hidden rotate-y-180 ${!isFlipped ? 'invisible' : ''}`}>
              <CardContent className="h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-purple-50">
                <div className="text-center">
                  <p className="text-5xl font-bold text-blue-600 mb-4">
                    {"back" in currentCard ? (currentCard as any).back : (currentCard as any).vietnamese}
                  </p>
                  <div className="mt-8 p-4 bg-white rounded-lg">
                    <p className="text-2xl text-gray-700">
                      {"front" in currentCard ? (currentCard as any).front : (currentCard as any).korean}
                    </p>
                    {"pronunciation" in (currentCard as any) && (
                      <p className="text-gray-500">{(currentCard as any).pronunciation}</p>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-400 mt-8">Nhấp để quay lại</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-4">
          {/* Navigation */}
          <div className="flex justify-center gap-4">
            <Button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              variant="outline"
              size="lg"
              className="gap-2"
            >
              <ChevronLeft className="w-5 h-5" />
              Trước
            </Button>
            <Button
              onClick={handleNext}
              disabled={currentIndex === currentSet.cards.length - 1}
              size="lg"
              className="gap-2"
            >
              Sau
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Know/Don't Know */}
          <div className="flex justify-center gap-4">
            <Button
              onClick={handleUnknown}
              variant="outline"
              size="lg"
              className="gap-2 border-orange-300 text-orange-600 hover:bg-orange-50"
            >
              <X className="w-5 h-5" />
              Chưa thuộc
            </Button>
            <Button
              onClick={handleKnown}
              size="lg"
              className="gap-2 bg-green-600 hover:bg-green-700"
            >
              <Check className="w-5 h-5" />
              Đã thuộc
            </Button>
          </div>

          {/* Reset */}
          <div className="flex justify-center">
            <Button onClick={handleReset} variant="ghost" className="gap-2">
              <RotateCcw className="w-5 h-5" />
              Bắt đầu lại
            </Button>
          </div>
        </div>

        {/* Completion */}
        {currentIndex === currentSet.cards.length - 1 && (
          <Card className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardContent className="p-6 text-center">
              <h3 className="text-2xl font-bold mb-2">🎉 Hoàn thành!</h3>
              <p className="text-gray-600">
                Bạn đã xem hết {currentSet.cards.length} thẻ. 
                {knownCards.length > 0 && ` Bạn đã biết ${knownCards.length} từ!`}
              </p>
              <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
                {deckId && deck && (
                  <>
                    <Link to={`/decks/${deckId}`}>
                      <Button variant="outline">Về bộ từ</Button>
                    </Link>
                    <Link to="/practice">
                      <Button variant="outline">Chọn bộ khác</Button>
                    </Link>
                    <Link to={`/quiz/${deckId}`}>
                      <Button variant="outline">Làm trắc nghiệm</Button>
                    </Link>
                    <Link to={`/matching/${deckId}`}>
                      <Button variant="outline">Chơi ghép nối</Button>
                    </Link>
                    <Link to={`/writing/${deckId}`}>
                      <Button variant="outline">Luyện viết</Button>
                    </Link>
                  </>
                )}
                {!deckId && (
                  <>
                    <Link to="/practice">
                      <Button variant="outline">Chọn bộ từ</Button>
                    </Link>
                    <Link to="/decks">
                      <Button variant="outline">Tạo bộ từ</Button>
                    </Link>
                  </>
                )}
                <Button onClick={handleReset} className="gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Học lại Flashcards
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
}
