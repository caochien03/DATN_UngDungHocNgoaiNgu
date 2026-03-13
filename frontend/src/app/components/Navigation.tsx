import { Link, useLocation } from "react-router";
import { Home, BookOpen, FileText, Gamepad2, PenTool, Map, Library, GraduationCap, Users, Mic, Video } from "lucide-react";
import { Button } from "./ui/button";

const navItems = [
  { path: "/", icon: Home, label: "Trang chủ" },
  { path: "/flashcards", icon: BookOpen, label: "Flashcards" },
  { path: "/quiz", icon: FileText, label: "Trắc nghiệm" },
  { path: "/matching", icon: Gamepad2, label: "Ghép nối" },
  { path: "/writing", icon: PenTool, label: "Luyện viết" },
  { path: "/learning-path", icon: Map, label: "Lộ trình" },
  { path: "/vocabulary", icon: Library, label: "Từ vựng" },
  { path: "/grammar", icon: GraduationCap, label: "Ngữ pháp" },
  { path: "/group", icon: Users, label: "Học nhóm" },
  { path: "/speaking", icon: Mic, label: "Luyện nói" },
  { path: "/videos", icon: Video, label: "Video" },
];

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">한</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Korean Master
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1 overflow-x-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className="gap-2"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden xl:inline">{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Đăng nhập
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden pb-3 overflow-x-auto">
          <div className="flex gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className="gap-2 whitespace-nowrap"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
