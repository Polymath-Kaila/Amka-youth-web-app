import React from 'react'
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'

const Nav = () => {
  const navigate = useNavigate()
  const isAuthed = Boolean(localStorage.getItem('access'))
  const logout = () => {
    localStorage.removeItem('access'); localStorage.removeItem('refresh')
    navigate('/login')
  }
  return (
    <nav className="sticky top-0 z-10 backdrop-blur bg-black/60 border-b border-neutral-800">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-xl font-bold">
          <span className="text-primary-green">Am</span><span className="text-primary-indigo">ka</span> Youth
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/register" className="btn btn-primary">Sign Up</Link>
          {isAuthed
            ? <button onClick={logout} className="btn btn-danger">Log out</button>
            : <Link to="/login" className="btn border border-neutral-700">Log in</Link>}
        </div>
      </div>
    </nav>
  )
}

const Guard = ({children}) => {
  const authed = Boolean(localStorage.getItem('access'))
  return authed ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none"></div>
      <Nav />
      <main className="max-w-5xl mx-auto px-4 py-10">
        <Routes>
          <Route path="/" element={<Guard><Dashboard/></Guard>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </main>
      <footer className="text-center text-neutral-500 py-8">
        Built by Kaila ❤️ Kenya — <span className="text-primary-red">Youth</span> • <span className="text-primary-green">Growth</span> • <span className="text-primary-indigo">Impact</span>
      </footer>
    </div>
  )
}
