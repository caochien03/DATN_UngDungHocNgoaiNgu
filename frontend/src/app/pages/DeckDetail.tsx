import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useMemo, useState } from "react";
import { Navigation } from "../components/Navigation";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import { Trash2, Plus, Save, ArrowLeft } from "lucide-react";
import {
  addCard,
  deleteCard,
  deleteDeck,
  getDeck,
  listDecks,
  updateDeck,
  updateCard,
  type Deck,
} from "../lib/decks";

export default function DeckDetail() {
  const navigate = useNavigate();
  const params = useParams();
  const deckId = params.deckId as string | undefined;

  const [deck, setDeck] = useState<Deck | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sourceLanguageCode, setSourceLanguageCode] = useState("vi");
  const [targetLanguageCode, setTargetLanguageCode] = useState("ko");

  const [newFront, setNewFront] = useState("");
  const [newBack, setNewBack] = useState("");

  useEffect(() => {
    if (!deckId) return;
    const d = getDeck(deckId);
    setDeck(d);
    if (d) {
      setTitle(d.title);
      setDescription(d.description ?? "");
      setSourceLanguageCode(d.sourceLanguageCode);
      setTargetLanguageCode(d.targetLanguageCode);
    }
  }, [deckId]);

  const canAdd = useMemo(() => newFront.trim().length > 0 && newBack.trim().length > 0, [newFront, newBack]);

  if (!deckId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <Navigation />
        <div className="max-w-3xl mx-auto px-4 py-12">
          <Card>
            <CardContent className="p-8">
              <p className="text-gray-700">Không tìm thấy bộ từ vựng.</p>
              <div className="mt-4">
                <Link to="/decks">
                  <Button variant="outline">Quay lại</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!deck) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <Navigation />
        <div className="max-w-3xl mx-auto px-4 py-12">
          <Card>
            <CardContent className="p-8">
              <p className="text-gray-700">Bộ từ không tồn tại hoặc đã bị xóa.</p>
              <div className="mt-4">
                <Link to="/decks">
                  <Button variant="outline">Quay lại danh sách</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navigation />

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => navigate("/decks")} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Danh sách
            </Button>
            <div>
              <h1 className="text-3xl font-bold">{deck.title}</h1>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="secondary">{deck.cards.length} thẻ</Badge>
                <Badge variant="outline">{deck.sourceLanguageCode.toUpperCase()}</Badge>
                <Badge variant="outline">{deck.targetLanguageCode.toUpperCase()}</Badge>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 justify-end">
            <Link to={`/flashcards/${deckId}`}>
              <Button variant="outline">Học flashcards</Button>
            </Link>
            <Link to={`/quiz/${deckId}`}>
              <Button variant="outline">Làm trắc nghiệm</Button>
            </Link>
            <Button
              variant="destructive"
              className="gap-2"
              onClick={() => {
                deleteDeck(deckId);
                navigate("/decks");
              }}
            >
              <Trash2 className="w-4 h-4" />
              Xóa bộ
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Chỉnh sửa bộ từ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="t">Tên bộ</Label>
                <Input id="t" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="d">Mô tả</Label>
                <Textarea id="d" value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="src">Ngôn ngữ mặt trước</Label>
                  <Input id="src" value={sourceLanguageCode} onChange={(e) => setSourceLanguageCode(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tgt">Ngôn ngữ mặt sau</Label>
                  <Input id="tgt" value={targetLanguageCode} onChange={(e) => setTargetLanguageCode(e.target.value)} />
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  className="gap-2"
                  onClick={() => {
                    updateDeck(deckId, { title, description, sourceLanguageCode, targetLanguageCode });
                    const d = getDeck(deckId);
                    setDeck(d);
                  }}
                >
                  <Save className="w-4 h-4" />
                  Lưu
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Thêm thẻ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Mặt trước ({deck.sourceLanguageCode.toUpperCase()})</Label>
                  <Input value={newFront} onChange={(e) => setNewFront(e.target.value)} placeholder="VD: Xin chào" />
                </div>
                <div className="space-y-2">
                  <Label>Mặt sau ({deck.targetLanguageCode.toUpperCase()})</Label>
                  <Input value={newBack} onChange={(e) => setNewBack(e.target.value)} placeholder="VD: 안녕하세요" />
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  disabled={!canAdd}
                  className="gap-2"
                  onClick={() => {
                    addCard(deckId, { front: newFront, back: newBack });
                    setNewFront("");
                    setNewBack("");
                    setDeck(getDeck(deckId));
                  }}
                >
                  <Plus className="w-4 h-4" />
                  Thêm
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-8" />

        <div className="flex items-end justify-between gap-4 mb-4">
          <div>
            <h2 className="text-2xl font-bold">Danh sách thẻ</h2>
            <p className="text-gray-600">Bấm vào ô để sửa nhanh.</p>
          </div>
          <Button
            variant="outline"
            onClick={() => setDeck(listDecks().find((d) => d.id === deckId) ?? null)}
          >
            Tải lại
          </Button>
        </div>

        <div className="space-y-3">
          {deck.cards.length === 0 ? (
            <Card className="bg-white/70">
              <CardContent className="p-8 text-center text-gray-600">
                Chưa có thẻ nào. Hãy thêm thẻ ở phía trên.
              </CardContent>
            </Card>
          ) : (
            deck.cards.map((c) => (
              <Card key={c.id} className="bg-white/70">
                <CardContent className="p-4">
                  <div className="grid md:grid-cols-12 gap-3 items-start">
                    <div className="md:col-span-5 space-y-1">
                      <Label className="text-xs text-gray-500">Mặt trước</Label>
                      <Input
                        value={c.front}
                        onChange={(e) => {
                          updateCard(deckId, c.id, { front: e.target.value });
                          setDeck(getDeck(deckId));
                        }}
                      />
                    </div>
                    <div className="md:col-span-5 space-y-1">
                      <Label className="text-xs text-gray-500">Mặt sau</Label>
                      <Input
                        value={c.back}
                        onChange={(e) => {
                          updateCard(deckId, c.id, { back: e.target.value });
                          setDeck(getDeck(deckId));
                        }}
                      />
                    </div>
                    <div className="md:col-span-2 flex justify-end">
                      <Button
                        variant="destructive"
                        size="sm"
                        className="gap-2"
                        onClick={() => {
                          deleteCard(deckId, c.id);
                          setDeck(getDeck(deckId));
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                        Xóa
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

