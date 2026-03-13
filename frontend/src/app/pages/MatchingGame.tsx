import { useState, useEffect } from "react";
import { Navigation } from "../components/Navigation";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { RotateCcw, Trophy, Timer } from "lucide-react";

interface CardItem {
  id: number;
  content: string;
  type: 'korean' | 'vietnamese';
  pairId: number;
  isMatched: boolean;
  isFlipped: boolean;
}

const wordPairs = [
  { korean: "안녕하세요", vietnamese: "Xin chào" },
  { korean: "감사합니다", vietnamese: "Cảm ơn" },
  { korean: "사랑", vietnamese: "Tình yêu" },
  { korean: "친구", vietnamese: "Bạn bè" },
  { korean: "가족", vietnamese: "Gia đình" },
  { korean: "학교", vietnamese: "Trường học" },
  { korean: "책", vietnamese: "Sách" },
  { korean: "물", vietnamese: "Nước" },
];

export default function MatchingGame() {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [selectedCards, setSelectedCards] = useState<CardItem[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [time, setTime] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  // Initialize game
  useEffect(() => {
    initializeGame();
  }, []);

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGameActive && !gameCompleted) {
      interval = setInterval(() => {
        setTime(t => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isGameActive, gameCompleted]);

  const initializeGame = () => {
    const newCards: CardItem[] = [];
    wordPairs.forEach((pair, index) => {
      newCards.push({
        id: index * 2,
        content: pair.korean,
        type: 'korean',
        pairId: index,
        isMatched: false,
        isFlipped: false,
      });
      newCards.push({
        id: index * 2 + 1,
        content: pair.vietnamese,
        type: 'vietnamese',
        pairId: index,
        isMatched: false,
        isFlipped: false,
      });
    });
    
    // Shuffle cards
    const shuffled = newCards.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setSelectedCards([]);
    setMoves(0);
    setMatchedPairs(0);
    setTime(0);
    setGameCompleted(false);
    setIsGameActive(false);
  };

  const handleCardClick = (card: CardItem) => {
    if (!isGameActive) {
      setIsGameActive(true);
    }

    if (
      card.isMatched ||
      card.isFlipped ||
      selectedCards.length >= 2 ||
      selectedCards.find(c => c.id === card.id)
    ) {
      return;
    }

    const newCards = cards.map(c =>
      c.id === card.id ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);

    const newSelected = [...selectedCards, card];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      setMoves(moves + 1);
      
      if (newSelected[0].pairId === newSelected[1].pairId) {
        // Match found
        setTimeout(() => {
          setCards(cards =>
            cards.map(c =>
              c.pairId === newSelected[0].pairId
                ? { ...c, isMatched: true, isFlipped: true }
                : c
            )
          );
          setMatchedPairs(matchedPairs + 1);
          setSelectedCards([]);

          // Check if game is completed
          if (matchedPairs + 1 === wordPairs.length) {
            setGameCompleted(true);
            setIsGameActive(false);
          }
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setCards(cards =>
            cards.map(c =>
              newSelected.find(s => s.id === c.id) && !c.isMatched
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setSelectedCards([]);
        }, 1000);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Trò chơi ghép nối</h1>
          <p className="text-xl text-gray-600">Ghép từ tiếng Hàn với nghĩa tiếng Việt</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-4 text-center">
              <Timer className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <p className="text-2xl font-bold">{formatTime(time)}</p>
              <p className="text-sm text-gray-600">Thời gian</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Trophy className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <p className="text-2xl font-bold">{matchedPairs}/{wordPairs.length}</p>
              <p className="text-sm text-gray-600">Cặp đúng</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <RotateCcw className="w-6 h-6 mx-auto mb-2 text-purple-600" />
              <p className="text-2xl font-bold">{moves}</p>
              <p className="text-sm text-gray-600">Lượt chơi</p>
            </CardContent>
          </Card>
        </div>

        {/* Game Completed */}
        {gameCompleted && (
          <Card className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-8 text-center">
              <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
              <h2 className="text-3xl font-bold mb-4">🎉 Chúc mừng!</h2>
              <p className="text-xl text-gray-700 mb-4">
                Bạn đã hoàn thành trò chơi trong {moves} lượt và {formatTime(time)}!
              </p>
              <Button onClick={initializeGame} size="lg" className="gap-2">
                <RotateCcw className="w-5 h-5" />
                Chơi lại
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Game Board */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card)}
              className={`aspect-square cursor-pointer transition-all duration-300 transform ${
                card.isFlipped || card.isMatched ? 'scale-105' : 'hover:scale-105'
              }`}
            >
              <Card className={`h-full ${
                card.isMatched
                  ? 'bg-gradient-to-br from-green-100 to-emerald-100 border-green-300'
                  : card.isFlipped
                  ? 'bg-gradient-to-br from-blue-100 to-purple-100 border-blue-300'
                  : 'bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300'
              }`}>
                <CardContent className="h-full flex items-center justify-center p-4">
                  {card.isFlipped || card.isMatched ? (
                    <div className="text-center">
                      <p className={`font-bold ${
                        card.type === 'korean' ? 'text-2xl' : 'text-lg'
                      }`}>
                        {card.content}
                      </p>
                      <Badge
                        variant="secondary"
                        className="mt-2 text-xs"
                      >
                        {card.type === 'korean' ? '한국어' : 'Tiếng Việt'}
                      </Badge>
                    </div>
                  ) : (
                    <div className="text-4xl">❓</div>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Reset Button */}
        <div className="flex justify-center">
          <Button onClick={initializeGame} variant="outline" size="lg" className="gap-2">
            <RotateCcw className="w-5 h-5" />
            Chơi lại
          </Button>
        </div>

        {/* Instructions */}
        <Card className="mt-8 max-w-2xl mx-auto bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <h3 className="font-bold mb-3">📝 Hướng dẫn:</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Nhấp vào các thẻ để lật mở</li>
              <li>• Tìm cặp từ tiếng Hàn và nghĩa tiếng Việt tương ứng</li>
              <li>• Ghép đúng tất cả các cặp để hoàn thành trò chơi</li>
              <li>• Thử thách bản thân với số lượt chơi ít nhất!</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
