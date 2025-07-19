import { useEffect, useState } from 'react'
import { getMe, generateQuiz } from '../services/api'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [quiz, setQuiz] = useState('')
  const token = localStorage.getItem('token')

  useEffect(() => {
    getMe(token)
      .then((res) => setUser(res.data))
      .catch(() => alert('Login expired'))
  }, [])

  const fetchQuiz = async () => {
    const res = await generateQuiz(token)
    setQuiz(res.data.quiz || res.data.error)
  }

  if (!user) return <div>Loading...</div>

  return (
    <div>
      <h2>Welcome {user.email}</h2>
      <p>Role: {user.role}</p>
      {user.role === 'admin' && <button onClick={fetchQuiz}>Generate Quiz</button>}
      {quiz && <pre>{quiz}</pre>}
    </div>
  )
}
