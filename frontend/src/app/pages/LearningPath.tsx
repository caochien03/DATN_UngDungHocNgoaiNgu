import { useState } from "react";
import { Navigation } from "../components/Navigation";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { CheckCircle2, Lock, PlayCircle, BookOpen, FileText, Mic, PenTool } from "lucide-react";

const learningPaths = [
  {
    id: 1,
    level: "TOPIK I - Sơ cấp",
    description: "Cấp độ 1-2 (A1-A2)",
    color: "from-green-400 to-emerald-500",
    progress: 45,
    modules: [
      {
        id: 1,
        title: "Bảng chữ cái Hangul",
        description: "Học 24 phụ âm và nguyên âm cơ bản",
        lessons: 10,
        completed: 10,
        unlocked: true,
        type: "Nền tảng"
      },
      {
        id: 2,
        title: "Từ vựng cơ bản",
        description: "500 từ vựng thông dụng nhất",
        lessons: 20,
        completed: 15,
        unlocked: true,
        type: "Từ vựng"
      },
      {
        id: 3,
        title: "Ngữ pháp sơ cấp",
        description: "Các mẫu câu cơ bản, thì hiện tại",
        lessons: 15,
        completed: 8,
        unlocked: true,
        type: "Ngữ pháp"
      },
      {
        id: 4,
        title: "Giao tiếp hàng ngày",
        description: "Chào hỏi, giới thiệu, mua sắm",
        lessons: 12,
        completed: 0,
        unlocked: true,
        type: "Hội thoại"
      },
      {
        id: 5,
        title: "Luyện thi TOPIK I",
        description: "Đề thi mẫu và bài tập",
        lessons: 10,
        completed: 0,
        unlocked: false,
        type: "Thi thử"
      }
    ]
  },
  {
    id: 2,
    level: "TOPIK II - Trung cấp",
    description: "Cấp độ 3-4 (B1-B2)",
    color: "from-blue-400 to-indigo-500",
    progress: 20,
    modules: [
      {
        id: 6,
        title: "Từ vựng nâng cao",
        description: "1500 từ vựng chuyên sâu",
        lessons: 30,
        completed: 6,
        unlocked: true,
        type: "Từ vựng"
      },
      {
        id: 7,
        title: "Ngữ pháp trung cấp",
        description: "Thì quá khứ, tương lai, câu điều kiện",
        lessons: 25,
        completed: 0,
        unlocked: true,
        type: "Ngữ pháp"
      },
      {
        id: 8,
        title: "Đọc hiểu",
        description: "Đọc văn bản, bài báo tiếng Hàn",
        lessons: 20,
        completed: 0,
        unlocked: false,
        type: "Đọc"
      },
      {
        id: 9,
        title: "Viết luận",
        description: "Viết đoạn văn, luận ngắn",
        lessons: 15,
        completed: 0,
        unlocked: false,
        type: "Viết"
      },
      {
        id: 10,
        title: "Luyện thi TOPIK II (3-4)",
        description: "Đề thi mẫu cấp độ 3-4",
        lessons: 15,
        completed: 0,
        unlocked: false,
        type: "Thi thử"
      }
    ]
  },
  {
    id: 3,
    level: "TOPIK II - Cao cấp",
    description: "Cấp độ 5-6 (C1-C2)",
    color: "from-purple-400 to-pink-500",
    progress: 0,
    modules: [
      {
        id: 11,
        title: "Từ vựng chuyên ngành",
        description: "Từ vựng học thuật, công việc",
        lessons: 40,
        completed: 0,
        unlocked: false,
        type: "Từ vựng"
      },
      {
        id: 12,
        title: "Ngữ pháp nâng cao",
        description: "Cấu trúc phức tạp, văn phong trang trọng",
        lessons: 30,
        completed: 0,
        unlocked: false,
        type: "Ngữ pháp"
      },
      {
        id: 13,
        title: "Đọc hiểu chuyên sâu",
        description: "Văn học, báo chí, học thuật",
        lessons: 25,
        completed: 0,
        unlocked: false,
        type: "Đọc"
      },
      {
        id: 14,
        title: "Viết chuyên nghiệp",
        description: "Luận văn, báo cáo, thư trang trọng",
        lessons: 20,
        completed: 0,
        unlocked: false,
        type: "Viết"
      },
      {
        id: 15,
        title: "Luyện thi TOPIK II (5-6)",
        description: "Đề thi mẫu cấp độ 5-6",
        lessons: 20,
        completed: 0,
        unlocked: false,
        type: "Thi thử"
      }
    ]
  }
];

const moduleTypeIcons: Record<string, any> = {
  "Nền tảng": BookOpen,
  "Từ vựng": BookOpen,
  "Ngữ pháp": FileText,
  "Hội thoại": Mic,
  "Đọc": BookOpen,
  "Viết": PenTool,
  "Thi thử": FileText
};

export default function LearningPath() {
  const [selectedPath, setSelectedPath] = useState(learningPaths[0]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Lộ trình học tiếng Hàn</h1>
          <p className="text-xl text-gray-600">Học có hệ thống, luyện thi TOPIK hiệu quả</p>
        </div>

        {/* Path Selection */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {learningPaths.map((path) => (
            <Card
              key={path.id}
              className={`cursor-pointer transition-all ${
                selectedPath.id === path.id
                  ? 'ring-2 ring-blue-500 shadow-lg'
                  : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedPath(path)}
            >
              <CardHeader>
                <div className={`w-full h-2 rounded-full bg-gradient-to-r ${path.color} mb-4`}></div>
                <CardTitle>{path.level}</CardTitle>
                <CardDescription>{path.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tiến độ</span>
                    <span className="font-bold">{path.progress}%</span>
                  </div>
                  <Progress value={path.progress} className="h-2" />
                  <p className="text-sm text-gray-600 mt-2">
                    {path.modules.length} modules học tập
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Selected Path Details */}
        <div>
          <div className={`h-1 w-full bg-gradient-to-r ${selectedPath.color} rounded-full mb-8`}></div>
          
          <h2 className="text-3xl font-bold mb-6">{selectedPath.level}</h2>

          <div className="space-y-4">
            {selectedPath.modules.map((module, index) => {
              const Icon = moduleTypeIcons[module.type] || BookOpen;
              const moduleProgress = module.lessons > 0 ? (module.completed / module.lessons) * 100 : 0;

              return (
                <Card
                  key={module.id}
                  className={`${
                    module.unlocked
                      ? 'hover:shadow-lg transition-shadow'
                      : 'opacity-60 bg-gray-50'
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-6">
                      {/* Module Number */}
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${selectedPath.color} flex items-center justify-center flex-shrink-0`}>
                        <span className="text-white font-bold text-xl">{index + 1}</span>
                      </div>

                      {/* Module Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-bold">{module.title}</h3>
                              <Badge variant="secondary" className="gap-1">
                                <Icon className="w-3 h-3" />
                                {module.type}
                              </Badge>
                              {module.completed === module.lessons && (
                                <Badge className="bg-green-500 gap-1">
                                  <CheckCircle2 className="w-3 h-3" />
                                  Hoàn thành
                                </Badge>
                              )}
                              {!module.unlocked && (
                                <Badge variant="secondary" className="gap-1">
                                  <Lock className="w-3 h-3" />
                                  Đang khóa
                                </Badge>
                              )}
                            </div>
                            <p className="text-gray-600">{module.description}</p>
                          </div>
                        </div>

                        {/* Progress */}
                        <div className="mt-4">
                          <div className="flex justify-between text-sm text-gray-600 mb-2">
                            <span>{module.completed}/{module.lessons} bài học</span>
                            <span>{Math.round(moduleProgress)}%</span>
                          </div>
                          <Progress value={moduleProgress} className="h-2 mb-4" />
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                          {module.unlocked && module.completed < module.lessons && (
                            <Button className="gap-2">
                              <PlayCircle className="w-4 h-4" />
                              {module.completed > 0 ? 'Tiếp tục học' : 'Bắt đầu'}
                            </Button>
                          )}
                          {module.unlocked && module.completed === module.lessons && (
                            <Button variant="outline" className="gap-2">
                              <CheckCircle2 className="w-4 h-4" />
                              Ôn tập
                            </Button>
                          )}
                          {!module.unlocked && (
                            <Button variant="ghost" disabled className="gap-2">
                              <Lock className="w-4 h-4" />
                              Hoàn thành module trước để mở khóa
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Learning Tips */}
        <Card className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4">📚 Hướng dẫn học tập</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold mb-2">Cấu trúc lộ trình:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>TOPIK I (Sơ cấp):</strong> Nền tảng cơ bản cho người mới bắt đầu</li>
                  <li>• <strong>TOPIK II (Trung cấp):</strong> Giao tiếp tốt trong đời sống</li>
                  <li>• <strong>TOPIK II (Cao cấp):</strong> Thành thạo, làm việc chuyên nghiệp</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-2">Mẹo học hiệu quả:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Học theo thứ tự từ cơ bản đến nâng cao</li>
                  <li>• Dành 30-60 phút mỗi ngày để học đều đặn</li>
                  <li>• Kết hợp nhiều kỹ năng: nghe, nói, đọc, viết</li>
                  <li>• Làm bài tập thực hành sau mỗi bài học</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
