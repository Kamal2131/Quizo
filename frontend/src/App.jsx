import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer"
import HomePage from "./pages/HomePage"
import QuizzesPage from "./pages/QuizzesPage"
import QuizPage from "./pages/QuizPage"
import CreateQuizPage from "./pages/CreateQuizPage"
import LeaderboardPage from "./pages/LeaderboardPage"
import "./App.css"

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/quizzes" element={<QuizzesPage />} />
            <Route path="/quiz/:id" element={<QuizPage />} />
            <Route path="/create" element={<CreateQuizPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App


// export default function App() {
//   return (
//     <>
//     <h1 className="py-4 text-2xl font-bold justify-center bg-amber-700">Hello World!</h1>
//     </>
//   )
// }
