import { Link } from "react-router";
import { Navigation } from "../components/Navigation";
import { Button } from "../components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300">404</h1>
          <h2 className="text-4xl font-bold text-gray-700 mb-4">Không tìm thấy trang</h2>
          <p className="text-xl text-gray-600">
            Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <Link to="/">
            <Button size="lg" className="gap-2">
              <Home className="w-5 h-5" />
              Về trang chủ
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            onClick={() => window.history.back()}
            className="gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Quay lại
          </Button>
        </div>

        <div className="mt-12 text-gray-500">
          <p className="mb-2">Có thể bạn đang tìm:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/flashcards">
              <Button variant="link">Flashcards</Button>
            </Link>
            <Link to="/quiz">
              <Button variant="link">Trắc nghiệm</Button>
            </Link>
            <Link to="/learning-path">
              <Button variant="link">Lộ trình học</Button>
            </Link>
            <Link to="/vocabulary">
              <Button variant="link">Từ vựng</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
