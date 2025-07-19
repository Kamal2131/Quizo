import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Clock, Users, Star } from "lucide-react"
import { Link } from "react-router-dom"

const mockQuizzes = [
  {
    id: 1,
    title: "World Geography",
    description: "Test your knowledge of countries, capitals, and landmarks around the world.",
    difficulty: "Medium",
    questions: 20,
    duration: 15,
    participants: 1234,
    rating: 4.5,
    category: "Geography",
  },
  {
    id: 2,
    title: "Science Fundamentals",
    description: "Basic concepts in physics, chemistry, and biology.",
    difficulty: "Easy",
    questions: 15,
    duration: 10,
    participants: 856,
    rating: 4.2,
    category: "Science",
  },
  {
    id: 3,
    title: "Movie Trivia",
    description: "From classics to modern blockbusters, test your movie knowledge.",
    difficulty: "Hard",
    questions: 25,
    duration: 20,
    participants: 2341,
    rating: 4.7,
    category: "Entertainment",
  },
  {
    id: 4,
    title: "History Quiz",
    description: "Journey through time with questions about world history.",
    difficulty: "Medium",
    questions: 18,
    duration: 12,
    participants: 967,
    rating: 4.3,
    category: "History",
  },
]

export default function QuizzesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Available Quizzes</h1>
        <p className="text-lg text-gray-600">Choose from our collection of engaging quizzes</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockQuizzes.map((quiz) => (
          <Card key={quiz.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge variant="secondary">{quiz.category}</Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{quiz.rating}</span>
                </div>
              </div>
              <CardTitle className="text-xl">{quiz.title}</CardTitle>
              <CardDescription>{quiz.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{quiz.duration} min</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{quiz.participants.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex justify-between items-center mb-4">
                <Badge
                  variant={
                    quiz.difficulty === "Easy" ? "default" : quiz.difficulty === "Medium" ? "secondary" : "destructive"
                  }
                >
                  {quiz.difficulty}
                </Badge>
                <span className="text-sm text-gray-600">{quiz.questions} questions</span>
              </div>
              <Button asChild className="w-full">
                <Link to={`/quiz/${quiz.id}`}>Start Quiz</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
