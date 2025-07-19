"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Badge } from "../components/ui/badge"
import { Plus, Trash2 } from "lucide-react"

export default function CreateQuizPage() {
  const [quizTitle, setQuizTitle] = useState("")
  const [quizDescription, setQuizDescription] = useState("")
  const [category, setCategory] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [questions, setQuestions] = useState([{ id: 1, question: "", options: ["", "", "", ""], correct: 0 }])

  const addQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      question: "",
      options: ["", "", "", ""],
      correct: 0,
    }
    setQuestions([...questions, newQuestion])
  }

  const removeQuestion = (id) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((q) => q.id !== id))
    }
  }

  const updateQuestion = (id, field, value) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, [field]: value } : q)))
  }

  const updateOption = (questionId, optionIndex, value) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId ? { ...q, options: q.options.map((opt, idx) => (idx === optionIndex ? value : opt)) } : q,
      ),
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log({
      title: quizTitle,
      description: quizDescription,
      category,
      difficulty,
      questions,
    })
    alert("Quiz created successfully!")
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Create New Quiz</h1>
        <p className="text-lg text-gray-600">Design your own quiz and share it with the community</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Quiz Details */}
        <Card>
          <CardHeader>
            <CardTitle>Quiz Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Quiz Title</Label>
              <Input
                id="title"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                placeholder="Enter quiz title"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={quizDescription}
                onChange={(e) => setQuizDescription(e.target.value)}
                placeholder="Describe what your quiz is about"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                    <SelectItem value="geography">Geography</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select value={difficulty} onValueChange={setDifficulty} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Questions */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Questions</h2>
            <Button type="button" onClick={addQuestion} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Question
            </Button>
          </div>

          {questions.map((question, index) => (
            <Card key={question.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Question {index + 1}</CardTitle>
                {questions.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeQuestion(question.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor={`question-${question.id}`}>Question</Label>
                  <Textarea
                    id={`question-${question.id}`}
                    value={question.question}
                    onChange={(e) => updateQuestion(question.id, "question", e.target.value)}
                    placeholder="Enter your question"
                    required
                  />
                </div>

                <div>
                  <Label>Answer Options</Label>
                  <div className="space-y-2">
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center gap-2">
                        <Badge
                          variant={question.correct === optionIndex ? "default" : "outline"}
                          className="cursor-pointer min-w-[60px] justify-center"
                          onClick={() => updateQuestion(question.id, "correct", optionIndex)}
                        >
                          {question.correct === optionIndex ? "Correct" : `Option ${optionIndex + 1}`}
                        </Badge>
                        <Input
                          value={option}
                          onChange={(e) => updateOption(question.id, optionIndex, e.target.value)}
                          placeholder={`Option ${optionIndex + 1}`}
                          required
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Click on the badge to mark the correct answer</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline">
            Save as Draft
          </Button>
          <Button type="submit">Publish Quiz</Button>
        </div>
      </form>
    </div>
  )
}
