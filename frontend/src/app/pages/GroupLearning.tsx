import { useState } from "react";
import { Navigation } from "../components/Navigation";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Input } from "../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Users, UserPlus, Trophy, Clock, MessageCircle, Target } from "lucide-react";

const studyGroups = [
  {
    id: 1,
    name: "Luyện TOPIK I cùng nhau",
    level: "Sơ cấp",
    members: 8,
    maxMembers: 10,
    meetingTime: "Thứ 2, 4, 6 - 20:00",
    description: "Nhóm học TOPIK I, tập trung vào từ vựng và ngữ pháp cơ bản",
    activity: "Hoạt động 2 giờ trước",
    color: "from-green-400 to-emerald-500"
  },
  {
    id: 2,
    name: "Giao tiếp tiếng Hàn hàng ngày",
    level: "Trung cấp",
    members: 12,
    maxMembers: 15,
    meetingTime: "Thứ 3, 5, 7 - 19:00",
    description: "Luyện hội thoại, tình huống thực tế trong cuộc sống",
    activity: "Hoạt động 5 giờ trước",
    color: "from-blue-400 to-indigo-500"
  },
  {
    id: 3,
    name: "Đọc truyện tiếng Hàn",
    level: "Trung cấp",
    members: 6,
    maxMembers: 8,
    meetingTime: "Chủ nhật - 15:00",
    description: "Đọc và thảo luận truyện ngắn, webtoon tiếng Hàn",
    activity: "Hoạt động 1 ngày trước",
    color: "from-purple-400 to-pink-500"
  },
  {
    id: 4,
    name: "TOPIK II - Cấp độ 5-6",
    level: "Cao cấp",
    members: 5,
    maxMembers: 8,
    meetingTime: "Thứ 7 - 14:00",
    description: "Luyện thi TOPIK II cấp cao, viết luận và đọc hiểu",
    activity: "Hoạt động 3 giờ trước",
    color: "from-orange-400 to-red-500"
  },
];

const pairLearning = [
  {
    id: 1,
    name: "Minh Anh",
    level: "Trung cấp",
    goals: ["Luyện nói", "Từ vựng"],
    available: "Tối 20:00 - 22:00",
    studyTime: "45 giờ",
    matchScore: 95
  },
  {
    id: 2,
    name: "Hải Yến",
    level: "Sơ cấp",
    goals: ["Ngữ pháp", "Viết"],
    available: "Chiều 17:00 - 19:00",
    studyTime: "32 giờ",
    matchScore: 88
  },
  {
    id: 3,
    name: "Đức Anh",
    level: "Trung cấp",
    goals: ["Luyện thi TOPIK", "Đọc"],
    available: "Sáng 06:00 - 08:00",
    studyTime: "67 giờ",
    matchScore: 92
  },
];

const achievements = [
  { icon: "🔥", label: "Streak 7 ngày", value: "7" },
  { icon: "⭐", label: "Điểm tích lũy", value: "1,250" },
  { icon: "🏆", label: "Hạng", value: "#15" },
];

export default function GroupLearning() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGroups = studyGroups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.level.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Học nhóm & Cặp đôi</h1>
          <p className="text-xl text-gray-600">Học cùng nhau, tiến bộ nhanh hơn</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
          {achievements.map((achievement, index) => (
            <Card key={index}>
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-2">{achievement.icon}</div>
                <p className="text-3xl font-bold text-blue-600">{achievement.value}</p>
                <p className="text-sm text-gray-600">{achievement.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="groups" className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="groups" className="gap-2">
              <Users className="w-4 h-4" />
              Nhóm học
            </TabsTrigger>
            <TabsTrigger value="pairs" className="gap-2">
              <UserPlus className="w-4 h-4" />
              Học cặp đôi
            </TabsTrigger>
          </TabsList>

          {/* Study Groups */}
          <TabsContent value="groups" className="space-y-6">
            {/* Search */}
            <div className="max-w-md mx-auto">
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm nhóm học..."
                className="w-full"
              />
            </div>

            {/* Create Group */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Tạo nhóm học mới</h3>
                      <p className="text-sm text-gray-600">Mời bạn bè và học cùng nhau</p>
                    </div>
                  </div>
                  <Button>Tạo nhóm</Button>
                </div>
              </CardContent>
            </Card>

            {/* Group List */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredGroups.map((group) => (
                <Card key={group.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className={`h-2 w-full bg-gradient-to-r ${group.color} rounded-full mb-4`}></div>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{group.name}</CardTitle>
                        <div className="flex gap-2 mb-3">
                          <Badge>{group.level}</Badge>
                          <Badge variant="secondary">{group.members}/{group.maxMembers} thành viên</Badge>
                        </div>
                      </div>
                    </div>
                    <CardDescription>{group.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{group.meetingTime}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MessageCircle className="w-4 h-4" />
                        <span>{group.activity}</span>
                      </div>
                      
                      {/* Members Preview */}
                      <div className="flex items-center gap-2 pt-3 border-t">
                        <div className="flex -space-x-2">
                          {[1, 2, 3, 4].map((i) => (
                            <Avatar key={i} className="w-8 h-8 border-2 border-white">
                              <AvatarFallback className="text-xs bg-gradient-to-br from-blue-400 to-purple-400 text-white">
                                M{i}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">+{group.members - 4} thành viên khác</span>
                      </div>

                      <Button className="w-full mt-4">Tham gia nhóm</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Pair Learning */}
          <TabsContent value="pairs" className="space-y-6">
            {/* Info Card */}
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Target className="w-8 h-8 text-green-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">Học cặp đôi là gì?</h3>
                    <p className="text-gray-700">
                      Ghép đôi với học viên có cùng mục tiêu và trình độ. Cùng nhau luyện tập, 
                      động viên và giúp đỡ lẫn nhau để tiến bộ nhanh hơn.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Find Partner */}
            <div className="text-center mb-8">
              <Button size="lg" className="gap-2">
                <UserPlus className="w-5 h-5" />
                Tìm người học cùng
              </Button>
              <p className="text-sm text-gray-600 mt-2">
                Hệ thống sẽ tự động ghép đôi dựa trên trình độ và mục tiêu của bạn
              </p>
            </div>

            {/* Suggested Partners */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Đề xuất người học phù hợp</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {pairLearning.map((partner) => (
                  <Card key={partner.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="text-center mb-4">
                        <Avatar className="w-20 h-20 mx-auto mb-3 border-4 border-blue-100">
                          <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-400 to-purple-400 text-white">
                            {partner.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="font-bold text-xl mb-1">{partner.name}</h3>
                        <Badge>{partner.level}</Badge>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">Mục tiêu:</p>
                          <div className="flex flex-wrap gap-1">
                            {partner.goals.map((goal, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {goal}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">{partner.available}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <Trophy className="w-4 h-4 text-yellow-500" />
                          <span className="text-gray-600">Đã học {partner.studyTime}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Độ phù hợp</span>
                          <span className="font-bold text-green-600">{partner.matchScore}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full"
                            style={{ width: `${partner.matchScore}%` }}
                          ></div>
                        </div>
                      </div>

                      <Button className="w-full">Kết nối</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Benefits */}
        <Card className="mt-12 bg-gradient-to-r from-amber-50 to-orange-50 border-orange-200">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">🌟 Lợi ích của học nhóm</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <Users className="w-12 h-12 mx-auto mb-3 text-blue-600" />
                <h4 className="font-bold mb-2">Động lực học tập</h4>
                <p className="text-sm text-gray-700">
                  Học cùng bạn bè giúp bạn có động lực và kiên trì hơn
                </p>
              </div>
              <div className="text-center">
                <MessageCircle className="w-12 h-12 mx-auto mb-3 text-green-600" />
                <h4 className="font-bold mb-2">Luyện giao tiếp</h4>
                <p className="text-sm text-gray-700">
                  Thực hành hội thoại trực tiếp với người học khác
                </p>
              </div>
              <div className="text-center">
                <Trophy className="w-12 h-12 mx-auto mb-3 text-yellow-600" />
                <h4 className="font-bold mb-2">Tiến bộ nhanh hơn</h4>
                <p className="text-sm text-gray-700">
                  Học từ kinh nghiệm và góp ý của các thành viên
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
