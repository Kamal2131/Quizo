import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { BookOpen, Users, Trophy, Clock } from "lucide-react"
import { Link } from "react-router-dom"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Welcome to QuizMaster</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Test your knowledge, challenge your friends, and learn something new with our interactive quiz platform.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
              <Link to="/quizzes">Browse Quizzes</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-600 bg-transparent"
            >
              <Link to="/create">Create Quiz</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose QuizMaster?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <BookOpen className="h-12 w-12 mx-auto text-purple-600 mb-4" />
                <CardTitle>Diverse Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Explore quizzes on science, history, sports, entertainment, and more.</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                <CardTitle>Multiplayer</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Challenge friends or compete with players from around the world.</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Trophy className="h-12 w-12 mx-auto text-yellow-600 mb-4" />
                <CardTitle>Leaderboards</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Track your progress and see how you rank against other players.</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Clock className="h-12 w-12 mx-auto text-green-600 mb-4" />
                <CardTitle>Real-time</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Experience fast-paced, real-time quiz competitions and instant results.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of quiz enthusiasts and start your learning journey today.
          </p>
          <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
            <Link to="/register">Sign Up Now</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
