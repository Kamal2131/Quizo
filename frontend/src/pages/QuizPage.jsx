"use client"

import { useState } from "react"
import { useParams } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Progress } from "../components/ui/progress"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { Label } from "../components/ui/label"
import { Clock, CheckCircle } from "lucide-react"

const mockQuiz = {
  id: 1,
  title: "World Geography",
  questions: [
    {
      id: 1,
      question: "What is the capital of Australia?",
      options: ["Sydney", "Melbourne", "Canberra", "Perth"],
      correct: 2,
    },
    {
      id: 2,
      question: "Which river is the longest in the world?",
      options: ["Amazon", "Nile", "Mississippi", "Yangtze"],
      correct: 1,
    },
    {
      id: 3,
      question: "Mount Everest is located in which mountain range?",
      options: ["Andes", "Rocky Mountains", "Alps", "Himalayas"],
      correct: 3,
    },
  ],
}

export default function QuizPage() {
  const { id } = useParams()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [answers, setAnswers] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [timeLeft, setTimeLeft] = useState(900) // 15 minutes in seconds

  const handleAnswerSelect = (value) => {
    setSelectedAnswer(value)
  }

  const handleNextQuestion = () => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = Number.parseInt(selectedAnswer)
    setAnswers(newAnswers)
    setSelectedAnswer("")

    if (currentQuestion < mockQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const calculateScore = () => {
    return answers.reduce((score, answer, index) => {
      return score + (answer === mockQuiz.questions[index].correct ? 1 : 0)
    }, 0)
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  if (showResults) {
    const score = calculateScore()
    const percentage = Math.round((score / mockQuiz.questions.length) * 100)

    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader className="text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <CardTitle className="text-3xl">Quiz Complete!</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="mb-6">
              <div className="text-4xl font-bold text-green-600 mb-2">{percentage}%</div>
              <p className="text-lg text-gray-600">
                You scored {score} out of {mockQuiz.questions.length} questions correctly
              </p>
            </div>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => window.location.reload()}>Retake Quiz</Button>
              <Button variant="outline" onClick={() => window.history.back()}>
                Back to Quizzes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const progress = ((currentQuestion + 1) / mockQuiz.questions.length) * 100
  const question = mockQuiz.questions[currentQuestion]

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">{mockQuiz.title}</h1>
          <div className="flex items-center gap-2 text-lg font-semibold">
            <Clock className="h-5 w-5" />
            {formatTime(timeLeft)}
          </div>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>
            Question {currentQuestion + 1} of {mockQuiz.questions.length}
          </span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{question.question}</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect}>
            {question.options.map((option, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200"
              >
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="mt-6 flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            <Button onClick={handleNextQuestion} disabled={!selectedAnswer}>
              {currentQuestion === mockQuiz.questions.length - 1 ? "Finish Quiz" : "Next Question"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
