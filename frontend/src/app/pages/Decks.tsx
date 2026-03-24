import { Link } from "react-router";
import { useEffect, useMemo, useState } from "react";
import { Navigation } from "../components/Navigation";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { BookOpen, Plus, Search } from "lucide-react";
import { listDecks, type Deck } from "../lib/decks";

export default function Decks() {
  const [query, setQuery] = useState("");
  const [decks, setDecks] = useState<Deck[]>([]);

  useEffect(() => {
    setDecks(listDecks());
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return decks;
    return decks.filter((d) => {
      const hay = `${d.title} ${d.description ?? ""}`.toLowerCase();
      return hay.includes(q);
    });
  }, [decks, query]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Bộ từ vựng</h1>
            <p className="text-gray-600">
              Tạo bộ từ vựng của riêng bạn và luyện tập như Quizlet.
            </p>
          </div>
          <Link to="/decks/new">
            <Button size="lg" className="gap-2">
              <Plus className="w-5 h-5" />
              Tạo bộ mới
            </Button>
          </Link>
        </div>

        <Card className="mb-8">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm theo tên hoặc mô tả..."
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {filtered.length === 0 ? (
          <Card className="bg-white/70">
            <CardContent className="p-10 text-center">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h2 className="text-2xl font-bold mb-2">Chưa có bộ từ vựng</h2>
              <p className="text-gray-600 mb-6">
                Hãy tạo bộ đầu tiên để bắt đầu học bằng flashcards, trắc nghiệm và nhiều chế độ khác.
              </p>
              <Link to="/decks/new">
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Tạo bộ mới
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((deck) => (
              <Link key={deck.id} to={`/decks/${deck.id}`}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <CardTitle className="truncate">{deck.title}</CardTitle>
                        <CardDescription className="line-clamp-2">
                          {deck.description || "Không có mô tả"}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary" className="shrink-0">
                        {deck.cards.length} thẻ
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                      <span className="px-2 py-1 rounded bg-slate-100">
                        {deck.sourceLanguageCode.toUpperCase()}
                      </span>
                      <span className="px-2 py-1 rounded bg-slate-100">
                        {deck.targetLanguageCode.toUpperCase()}
                      </span>
                      {deck.isPublic && (
                        <span className="px-2 py-1 rounded bg-blue-50 text-blue-700">
                          Public
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

