import { Link } from "react-router";
import { useEffect, useMemo, useState } from "react";
import { Navigation } from "../components/Navigation";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { BookOpen, FileText, Gamepad2, PenTool, Plus } from "lucide-react";
import { listDecks, type Deck } from "../lib/decks";

const modes = [
  { key: "flashcards", label: "Flashcards", icon: BookOpen, pathPrefix: "/flashcards" },
  { key: "quiz", label: "Trắc nghiệm", icon: FileText, pathPrefix: "/quiz" },
  { key: "matching", label: "Ghép nối", icon: Gamepad2, pathPrefix: "/matching" },
  { key: "writing", label: "Luyện viết", icon: PenTool, pathPrefix: "/writing" },
] as const;

export default function Practice() {
  const [decks, setDecks] = useState<Deck[]>([]);

  useEffect(() => {
    setDecks(listDecks());
  }, []);

  const topDecks = useMemo(() => decks.slice(0, 12), [decks]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Luyện tập</h1>
            <p className="text-gray-600">
              Chọn một bộ từ vựng để bắt đầu học bằng các chế độ luyện tập.
            </p>
          </div>
          <Link to="/decks/new">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Tạo bộ từ
            </Button>
          </Link>
        </div>

        {decks.length === 0 ? (
          <Card className="bg-white/70">
            <CardContent className="p-10 text-center">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h2 className="text-2xl font-bold mb-2">Bạn chưa có bộ từ nào</h2>
              <p className="text-gray-600 mb-6">
                Tạo một bộ từ vựng trước, sau đó bạn có thể luyện flashcards, trắc nghiệm, ghép nối và luyện viết.
              </p>
              <Link to="/decks/new">
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Tạo bộ đầu tiên
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="bg-white/70">
              <CardHeader>
                <CardTitle>Chọn bộ từ</CardTitle>
                <CardDescription>Chọn một bộ để mở các chế độ luyện tập.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {topDecks.map((d) => (
                  <div key={d.id} className="flex items-center justify-between gap-4 rounded-lg border bg-white p-3">
                    <div className="min-w-0">
                      <div className="font-medium truncate">{d.title}</div>
                      <div className="text-sm text-gray-600 flex flex-wrap gap-2 mt-1">
                        <Badge variant="secondary">{d.cards.length} thẻ</Badge>
                        <Badge variant="outline">{d.sourceLanguageCode.toUpperCase()}</Badge>
                        <Badge variant="outline">{d.targetLanguageCode.toUpperCase()}</Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {modes.map((m) => {
                        const Icon = m.icon;
                        return (
                          <Link key={m.key} to={`${m.pathPrefix}/${d.id}`}>
                            <Button variant="outline" size="sm" className="gap-2">
                              <Icon className="w-4 h-4" />
                              <span className="hidden sm:inline">{m.label}</span>
                            </Button>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {decks.length > topDecks.length && (
                  <div className="text-sm text-gray-600">
                    Đang hiển thị {topDecks.length}/{decks.length} bộ. Vào{" "}
                    <Link className="underline" to="/decks">
                      Bộ từ vựng
                    </Link>{" "}
                    để xem đầy đủ.
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-white/70">
              <CardHeader>
                <CardTitle>Các chế độ</CardTitle>
                <CardDescription>Mỗi chế độ sẽ lấy dữ liệu từ bộ từ bạn chọn.</CardDescription>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-4">
                {modes.map((m) => {
                  const Icon = m.icon;
                  return (
                    <Card key={m.key} className="bg-white">
                      <CardContent className="p-5">
                        <div className="flex items-center gap-3 mb-2">
                          <Icon className="w-5 h-5 text-blue-600" />
                          <div className="font-semibold">{m.label}</div>
                        </div>
                        <div className="text-sm text-gray-600">
                          Chọn bộ từ ở bên trái để bắt đầu.
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

