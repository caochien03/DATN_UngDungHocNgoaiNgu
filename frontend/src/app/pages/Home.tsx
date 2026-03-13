import { Link } from "react-router";
import { Navigation } from "../components/Navigation";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { 
  BookOpen, 
  FileText, 
  Gamepad2, 
  PenTool, 
  Map, 
  Library, 
  GraduationCap, 
  Users, 
  Mic, 
  Video,
  Star,
  Trophy,
  Target,
  ArrowRight
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const basicFeatures = [
  {
    icon: BookOpen,
    title: "Flashcards",
    description: "Học từ vựng hiệu quả với hệ thống thẻ ghi nhớ thông minh",
    path: "/flashcards",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: FileText,
    title: "Trắc nghiệm",
    description: "Kiểm tra kiến thức với các bài tập trắc nghiệm đa dạng",
    path: "/quiz",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Gamepad2,
    title: "Trò chơi ghép nối",
    description: "Học qua chơi với trò chơi ghép từ vựng vui nhộn",
    path: "/matching",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: PenTool,
    title: "Luyện viết",
    description: "Nhìn tiếng Việt, viết tiếng Hàn với hỗ trợ bàn phím và viết tay",
    path: "/writing",
    color: "from-orange-500 to-red-500"
  },
];

const advancedFeatures = [
  {
    icon: Map,
    title: "Lộ trình học tập",
    description: "Lộ trình học tiếng Hàn cho từng cấp độ, tập trung luyện thi TOPIK",
    path: "/learning-path",
    color: "from-indigo-500 to-purple-500"
  },
  {
    icon: Library,
    title: "Từ vựng theo chủ đề",
    description: "Kho từ vựng phong phú được phân loại theo chủ đề và cấp độ",
    path: "/vocabulary",
    color: "from-pink-500 to-rose-500"
  },
  {
    icon: GraduationCap,
    title: "Ngữ pháp chi tiết",
    description: "Ngữ pháp từng cấp độ dựa theo giáo trình tiếng Hàn tổng hợp",
    path: "/grammar",
    color: "from-cyan-500 to-blue-500"
  },
  {
    icon: Users,
    title: "Học nhóm",
    description: "Học cùng bạn bè hoặc cặp đôi để tăng hiệu quả",
    path: "/group",
    color: "from-amber-500 to-orange-500"
  },
  {
    icon: Mic,
    title: "Luyện nói AI",
    description: "Thực hành phát âm và hội thoại với trợ lý AI thông minh",
    path: "/speaking",
    color: "from-teal-500 to-green-500"
  },
  {
    icon: Video,
    title: "Video người bản xứ",
    description: "Học qua video thực tế từ người Hàn Quốc bản địa",
    path: "/videos",
    color: "from-violet-500 to-purple-500"
  },
];

const stats = [
  { icon: Star, value: "10,000+", label: "Từ vựng" },
  { icon: Trophy, value: "500+", label: "Bài học" },
  { icon: Target, value: "100%", label: "Miễn phí" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                Học tiếng Hàn hiệu quả
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Chinh phục tiếng Hàn cùng Korean Master
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Học từ vựng, ngữ pháp, luyện thi TOPIK với hệ thống bài học toàn diện. 
                Từ cơ bản đến nâng cao, tất cả trong một nền tảng.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/learning-path">
                  <Button size="lg" className="gap-2">
                    Bắt đầu học ngay
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/flashcards">
                  <Button size="lg" variant="outline" className="gap-2">
                    <BookOpen className="w-5 h-5" />
                    Thử flashcards
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1544776193-352d25ca82cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBsYW5ndWFnZSUyMHN0dWR5JTIwY2xhc3Nyb29tfGVufDF8fHx8MTc3MzM4NTQyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Korean language learning"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <Icon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Basic Features */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Chức năng cơ bản</h2>
            <p className="text-xl text-gray-600">
              Các công cụ thiết yếu để bạn học tiếng Hàn hiệu quả
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {basicFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link key={index} to={feature.path}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle>{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Chức năng nâng cao</h2>
            <p className="text-xl text-gray-600">
              Công nghệ AI và phương pháp học hiện đại
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advancedFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link key={index} to={feature.path}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle>{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Sẵn sàng bắt đầu hành trình học tiếng Hàn?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Tham gia cùng hàng ngàn học viên đang chinh phục tiếng Hàn mỗi ngày
          </p>
          <Link to="/learning-path">
            <Button size="lg" variant="secondary" className="gap-2">
              Xem lộ trình học
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © 2026 Korean Master. Nền tảng học tiếng Hàn toàn diện.
          </p>
        </div>
      </footer>
    </div>
  );
}
