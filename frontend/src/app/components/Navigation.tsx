import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router";
import {
  Home,
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
} from "lucide-react";
import { Button } from "./ui/button";

type NavChild = { path: string; icon: React.ComponentType<{ className?: string }>; label: string };
type NavItem =
  | { path: string; icon: React.ComponentType<{ className?: string }>; label: string }
  | { path: string; icon: React.ComponentType<{ className?: string }>; label: string; children: NavChild[] };

const navItems: NavItem[] = [
  { path: "/", icon: Home, label: "Trang chủ" },
  { path: "/decks", icon: Library, label: "Bộ từ vựng" },
  {
    path: "/practice",
    icon: BookOpen,
    label: "Luyện tập",
    children: [
      { path: "/flashcards", icon: BookOpen, label: "Flashcards" },
      { path: "/quiz", icon: FileText, label: "Trắc nghiệm" },
      { path: "/matching", icon: Gamepad2, label: "Ghép nối" },
      { path: "/writing", icon: PenTool, label: "Luyện viết" },
    ],
  },
  { path: "/learning-path", icon: Map, label: "Lộ trình" },
  { path: "/vocabulary", icon: Library, label: "Từ vựng" },
  { path: "/grammar", icon: GraduationCap, label: "Ngữ pháp" },
  { path: "/group", icon: Users, label: "Học nhóm" },
  { path: "/speaking", icon: Mic, label: "Luyện nói" },
  { path: "/videos", icon: Video, label: "Video" },
];

function isItemWithChildren(item: NavItem): item is NavItem & { children: NavChild[] } {
  return "children" in item && Array.isArray(item.children);
}

function useNavActive(pathname: string) {
  return (item: NavItem) => {
    if (isItemWithChildren(item)) {
      const isChildActive = item.children.some((child) =>
        pathname === child.path || pathname.startsWith(child.path + "/")
      );
      return { isActive: false, isChildActive };
    }
    const isActive = pathname === item.path || pathname.startsWith(item.path + "/");
    return { isActive, isChildActive: false };
  };
}

export function Navigation() {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);
  const getActive = useNavActive(location.pathname);

  const closeDropdown = () => setOpenDropdown(null);

  // Đóng dropdown khi click ra ngoài; dùng 2 ref (desktop + mobile) để click vào link vẫn điều hướng được
  useEffect(() => {
    if (openDropdown === null) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const insideDesktop = desktopDropdownRef.current?.contains(target);
      const insideMobile = mobileDropdownRef.current?.contains(target);
      if (!insideDesktop && !insideMobile) setOpenDropdown(null);
    };
    const id = setTimeout(() => document.addEventListener("mousedown", handleClickOutside), 0);
    return () => {
      clearTimeout(id);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);

  const renderDropdownPanel = (item: NavItem & { children: NavChild[] }) => (
    <div className="absolute left-0 top-full mt-1 min-w-[200px] rounded-md border border-gray-200 bg-white py-1 shadow-lg z-[100]" >
      {item.children.map((child) => {
        const ChildIcon = child.icon;
        const childActive =
          location.pathname === child.path ||
          location.pathname.startsWith(child.path + "/");
        return (
          <Link
            key={child.path}
            to={child.path}
            onClick={closeDropdown}
            className={`flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 ${childActive ? "font-medium bg-gray-50" : ""}`}
          >
            <ChildIcon className="h-4 w-4 shrink-0" />
            {child.label}
          </Link>
        );
      })}
    </div>
  );

  return (
    <nav className="bg-white border-b sticky top-0 z-[100] shadow-sm" >
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

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-1 ">
            {navItems.map((item) => {
              const Icon = item.icon;
              const hasChildren = isItemWithChildren(item);
              const { isActive, isChildActive } = getActive(item);

              if (!hasChildren) {
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
              }

              return (
                <div
                  key={item.path}
                  ref={openDropdown === item.path ? desktopDropdownRef : null}
                  className="relative"
                >
                  <Button
                    type="button"
                    variant={isChildActive ? "default" : "ghost"}
                    size="sm"
                    className="gap-2"
                    onClick={() => setOpenDropdown((prev) => (prev === item.path ? null : item.path))}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden xl:inline">{item.label}</span>
                  </Button>
                  {openDropdown === item.path && renderDropdownPanel(item)}
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Đăng nhập
            </Button>
          </div>
        </div>

        {/* Mobile */}
        <div className="lg:hidden pb-3 ">
          <div className="flex flex-wrap gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const hasChildren = isItemWithChildren(item);
              const { isActive, isChildActive } = getActive(item);

              if (!hasChildren) {
                return (
                  <Link key={item.path} to={item.path}>
                    <Button
                      type="button"
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      className="gap-2 whitespace-nowrap"
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Button>
                  </Link>
                );
              }

              return (
                <div
                  key={item.path}
                  ref={openDropdown === item.path ? mobileDropdownRef : null}
                  className="relative"
                >
                  <Button
                    type="button"
                    variant={isChildActive ? "default" : "ghost"}
                    size="sm"
                    className="gap-2 whitespace-nowrap"
                    onClick={() => setOpenDropdown((prev) => (prev === item.path ? null : item.path))}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Button>
                  {openDropdown === item.path && renderDropdownPanel(item)}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
