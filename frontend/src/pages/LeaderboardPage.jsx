import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Trophy, Medal, Award } from "lucide-react"

const mockLeaderboard = [
  { rank: 1, name: "Alex Johnson", score: 2450, quizzes: 45, avatar: "/placeholder.svg?height=40&width=40" },
  { rank: 2, name: "Sarah Chen", score: 2380, quizzes: 42, avatar: "/placeholder.svg?height=40&width=40" },
  { rank: 3, name: "Mike Rodriguez", score: 2290, quizzes: 38, avatar: "/placeholder.svg?height=40&width=40" },
  { rank: 4, name: "Emma Wilson", score: 2150, quizzes: 35, avatar: "/placeholder.svg?height=40&width=40" },
  { rank: 5, name: "David Kim", score: 2080, quizzes: 33, avatar: "/placeholder.svg?height=40&width=40" },
  { rank: 6, name: "Lisa Thompson", score: 1950, quizzes: 31, avatar: "/placeholder.svg?height=40&width=40" },
  { rank: 7, name: "James Brown", score: 1890, quizzes: 29, avatar: "/placeholder.svg?height=40&width=40" },
  { rank: 8, name: "Anna Davis", score: 1820, quizzes: 27, avatar: "/placeholder.svg?height=40&width=40" },
]

export default function LeaderboardPage() {
  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>
    }
  }

  const getRankBadge = (rank) => {
    switch (rank) {
      case 1:
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">1st Place</Badge>
      case 2:
        return <Badge className="bg-gray-400 hover:bg-gray-500">2nd Place</Badge>
      case 3:
        return <Badge className="bg-amber-600 hover:bg-amber-700">3rd Place</Badge>
      default:
        return <Badge variant="outline">#{rank}</Badge>
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Leaderboard</h1>
        <p className="text-lg text-gray-600">Top performers in our quiz community</p>
      </div>

      {/* Top 3 Podium */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {mockLeaderboard.slice(0, 3).map((user) => (
          <Card key={user.rank} className={`text-center ${user.rank === 1 ? "ring-2 ring-yellow-500" : ""}`}>
            <CardHeader>
              <div className="flex justify-center mb-4">{getRankIcon(user.rank)}</div>
              <Avatar className="h-20 w-20 mx-auto mb-4">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback>
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl">{user.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {getRankBadge(user.rank)}
                <div className="text-2xl font-bold text-purple-600">{user.score.toLocaleString()}</div>
                <div className="text-sm text-gray-600">{user.quizzes} quizzes completed</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Full Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Full Rankings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockLeaderboard.map((user) => (
              <div
                key={user.rank}
                className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 flex justify-center">{getRankIcon(user.rank)}</div>
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-lg">{user.name}</div>
                    <div className="text-sm text-gray-600">{user.quizzes} quizzes completed</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-600">{user.score.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">points</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
