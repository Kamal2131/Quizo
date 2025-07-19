import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signup } from '../services/api'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('student')
  const navigate = useNavigate()

  const handleSignup = async () => {
    await signup(email, password, role)
    navigate('/')
  }

  return (
    <div>
      <h2>Signup</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <select onChange={(e) => setRole(e.target.value)}>
        <option value="student">Student</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleSignup}>Signup</button>
    </div>
  )
}
