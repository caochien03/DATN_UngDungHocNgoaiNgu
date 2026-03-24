import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { Navigation } from "../components/Navigation";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import { createDeck } from "../lib/decks";

export default function DeckCreate() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sourceLanguageCode, setSourceLanguageCode] = useState("vi");
  const [targetLanguageCode, setTargetLanguageCode] = useState("ko");
  const [isPublic, setIsPublic] = useState(false);

  const canSubmit = useMemo(() => title.trim().length > 0, [title]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navigation />

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Tạo bộ từ vựng</h1>
          <p className="text-gray-600">
            Chọn cặp ngôn ngữ (mặt trước/mặt sau) và bắt đầu thêm thẻ.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Thông tin bộ từ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Tên bộ</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="VD: 500 từ vựng TOPIK I"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="desc">Mô tả (tuỳ chọn)</Label>
              <Textarea
                id="desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="VD: Từ vựng theo chủ đề, ôn thi..."
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="src">Ngôn ngữ mặt trước</Label>
                <Input
                  id="src"
                  value={sourceLanguageCode}
                  onChange={(e) => setSourceLanguageCode(e.target.value)}
                  placeholder="VD: vi"
                />
                <p className="text-xs text-gray-500">Nhập mã ISO ngắn, ví dụ: vi, en, ko, ja…</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tgt">Ngôn ngữ mặt sau</Label>
                <Input
                  id="tgt"
                  value={targetLanguageCode}
                  onChange={(e) => setTargetLanguageCode(e.target.value)}
                  placeholder="VD: ko"
                />
                <p className="text-xs text-gray-500">Dùng để gợi ý TTS / luyện viết sau này.</p>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="font-medium">Công khai bộ từ</p>
                <p className="text-sm text-gray-600">
                  Cho phép người khác xem và học bộ từ của bạn (sẽ hoàn thiện ở bước sau).
                </p>
              </div>
              <Switch checked={isPublic} onCheckedChange={setIsPublic} />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <Button variant="outline" onClick={() => navigate("/decks")}>
                Hủy
              </Button>
              <Button
                disabled={!canSubmit}
                onClick={() => {
                  const deck = createDeck({
                    title,
                    description,
                    sourceLanguageCode,
                    targetLanguageCode,
                    isPublic,
                  });
                  navigate(`/decks/${deck.id}`);
                }}
              >
                Tạo và thêm thẻ
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

