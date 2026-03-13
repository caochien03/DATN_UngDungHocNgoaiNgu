import { useState } from "react";
import { Navigation } from "../components/Navigation";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Play, Clock, Eye, BookmarkPlus, Star } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const videoCategories = [
  {
    id: 1,
    category: "Văn hóa Hàn Quốc",
    videos: [
      {
        id: 1,
        title: "Giới thiệu văn hóa truyền thống Hàn Quốc",
        instructor: "Kim Min-ji",
        level: "Sơ cấp",
        duration: "15:30",
        views: "12.5K",
        thumbnail: "https://images.unsplash.com/photo-1756058492058-baff1f8f40e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGN1bHR1cmV8ZW58MXx8fHwxNzczMzQ3NjE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Tìm hiểu về Hanbok, lễ hội và phong tục Hàn Quốc"
      },
      {
        id: 2,
        title: "Ẩm thực Hàn Quốc và cách gọi món",
        instructor: "Park Seo-jun",
        level: "Sơ cấp",
        duration: "12:45",
        views: "18.2K",
        thumbnail: "https://images.unsplash.com/photo-1534817557314-c781397d0b87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBmb29kJTIwY29va2luZ3xlbnwxfHx8fDE3NzMzODU5NDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Học từ vựng và câu giao tiếp khi đi ăn nhà hàng"
      },
    ]
  },
  {
    id: 2,
    category: "Giao tiếp hàng ngày",
    videos: [
      {
        id: 3,
        title: "Chào hỏi và giới thiệu bản thân",
        instructor: "Lee Hye-jin",
        level: "Sơ cấp",
        duration: "10:20",
        views: "25.8K",
        thumbnail: "https://images.unsplash.com/photo-1559722530-0562aef6306a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBsYW5ndWFnZSUyMHRlYWNoZXJ8ZW58MXx8fHwxNzczMzg1OTQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Các mẫu câu chào hỏi cơ bản trong tiếng Hàn"
      },
      {
        id: 4,
        title: "Mua sắm tại cửa hàng",
        instructor: "Choi Ji-woo",
        level: "Trung cấp",
        duration: "14:15",
        views: "15.3K",
        thumbnail: "https://images.unsplash.com/photo-1771408427146-09be9a1d4535?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwbGVhcm5pbmclMjBvbmxpbmV8ZW58MXx8fHwxNzczMjc4ODI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Hỏi giá, thử đồ và thanh toán"
      },
    ]
  },
  {
    id: 3,
    category: "Phát âm chuẩn",
    videos: [
      {
        id: 5,
        title: "Phát âm phụ âm tiếng Hàn",
        instructor: "Jung Hae-in",
        level: "Sơ cấp",
        duration: "18:40",
        views: "32.1K",
        thumbnail: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBsYW5ndWFnZSUyMHN0dWR5JTIwY2xhc3Nyb29tfGVufDF8fHx8MTc3MzM4NTQyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Hướng dẫn chi tiết cách phát âm 19 phụ âm"
      },
      {
        id: 6,
        title: "Ngữ điệu và nhịp điệu tiếng Hàn",
        instructor: "Kang So-ra",
        level: "Trung cấp",
        duration: "16:25",
        views: "21.7K",
        thumbnail: "https://images.unsplash.com/photo-1744621284101-17cb90494231?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBjdWx0dXJlJTIwc2VvdWx8ZW58MXx8fHwxNzczMzg1NDI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Luyện tập ngữ điệu tự nhiên như người bản xứ"
      },
    ]
  },
  {
    id: 4,
    category: "TOPIK Luyện thi",
    videos: [
      {
        id: 7,
        title: "Chiến lược làm bài TOPIK I",
        instructor: "Yoon Ji-ho",
        level: "Sơ cấp",
        duration: "22:30",
        views: "28.4K",
        thumbnail: "https://images.unsplash.com/photo-1756058492058-baff1f8f40e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGN1bHR1cmV8ZW58MXx8fHwxNzczMzQ3NjE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Phân tích cấu trúc đề thi và mẹo làm bài"
      },
      {
        id: 8,
        title: "Luyện đọc hiểu TOPIK II",
        instructor: "Han Ye-seul",
        level: "Cao cấp",
        duration: "25:15",
        views: "19.6K",
        thumbnail: "https://images.unsplash.com/photo-1534817557314-c781397d0b87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBmb29kJTIwY29va2luZ3xlbnwxfHx8fDE3NzMzODU5NDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Kỹ thuật đọc nhanh và hiểu bài chính xác"
      },
    ]
  },
];

const featuredVideo = {
  id: 99,
  title: "Hành trình học tiếng Hàn của tôi",
  instructor: "Nguyễn Minh Anh",
  level: "Tất cả cấp độ",
  duration: "28:45",
  views: "45.2K",
  thumbnail: "https://images.unsplash.com/photo-1771408427146-09be9a1d4535?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwbGVhcm5pbmclMjBvbmxpbmV8ZW58MXx8fHwxNzczMjc4ODI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  description: "Chia sẻ kinh nghiệm từ zero đến đạt TOPIK 6 trong 2 năm"
};

export default function VideoLessons() {
  const [selectedCategory, setSelectedCategory] = useState(videoCategories[0]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Video người bản xứ</h1>
          <p className="text-xl text-gray-600">Học từ giáo viên và người Hàn Quốc bản địa</p>
        </div>

        {/* Featured Video */}
        <Card className="mb-12 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative h-64 md:h-auto">
              <ImageWithFallback
                src={featuredVideo.thumbnail}
                alt={featuredVideo.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Button size="lg" className="rounded-full w-16 h-16 p-0">
                  <Play className="w-8 h-8" />
                </Button>
              </div>
              <Badge className="absolute top-4 right-4 bg-red-600">Featured</Badge>
            </div>
            <CardContent className="p-8 flex flex-col justify-center">
              <Badge className="mb-3 w-fit">{featuredVideo.level}</Badge>
              <h2 className="text-3xl font-bold mb-4">{featuredVideo.title}</h2>
              <p className="text-gray-600 mb-6">{featuredVideo.description}</p>
              <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{featuredVideo.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span>{featuredVideo.views} lượt xem</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span>4.9/5</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Giảng viên: <span className="font-medium">{featuredVideo.instructor}</span>
              </p>
              <div className="flex gap-3">
                <Button size="lg" className="gap-2">
                  <Play className="w-5 h-5" />
                  Xem ngay
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <BookmarkPlus className="w-5 h-5" />
                  Lưu lại
                </Button>
              </div>
            </CardContent>
          </div>
        </Card>

        {/* Categories */}
        <Tabs defaultValue={videoCategories[0].category} className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            {videoCategories.map((cat) => (
              <TabsTrigger
                key={cat.id}
                value={cat.category}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat.category}
              </TabsTrigger>
            ))}
          </TabsList>

          {videoCategories.map((category) => (
            <TabsContent key={category.id} value={category.category} className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{category.category}</h2>
                <Button variant="outline">Xem tất cả</Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {category.videos.map((video) => (
                  <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                    <div className="relative h-48">
                      <ImageWithFallback
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button size="lg" className="rounded-full w-14 h-14 p-0">
                          <Play className="w-6 h-6" />
                        </Button>
                      </div>
                      <div className="absolute bottom-3 right-3 bg-black/80 text-white px-2 py-1 rounded text-sm">
                        {video.duration}
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <CardTitle className="text-lg line-clamp-2">{video.title}</CardTitle>
                        <Badge variant="secondary" className="flex-shrink-0">{video.level}</Badge>
                      </div>
                      <CardDescription className="line-clamp-2">{video.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          <span>{video.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span>4.8</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        Giảng viên: <span className="font-medium">{video.instructor}</span>
                      </p>
                      <div className="flex gap-2">
                        <Button className="flex-1 gap-2">
                          <Play className="w-4 h-4" />
                          Xem
                        </Button>
                        <Button variant="outline" size="icon">
                          <BookmarkPlus className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Benefits */}
        <Card className="mt-12 bg-gradient-to-r from-violet-50 to-purple-50 border-violet-200">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">🎥 Lợi ích học qua video</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Play className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-bold mb-2">Người bản xứ</h4>
                <p className="text-sm text-gray-700">
                  Học phát âm chuẩn từ giáo viên Hàn Quốc
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Eye className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-bold mb-2">Trực quan</h4>
                <p className="text-sm text-gray-700">
                  Xem và nghe để hiểu sâu hơn về văn hóa
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-bold mb-2">Linh hoạt</h4>
                <p className="text-sm text-gray-700">
                  Học mọi lúc, mọi nơi theo tốc độ của bạn
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
