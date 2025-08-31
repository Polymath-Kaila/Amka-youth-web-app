import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { auth } from '../api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function onSubmit(e){
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      await auth.login({ email, password })
      navigate('/')
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="card p-6">
        <h1 className="text-2xl font-bold mb-6">Welcome back</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="label">Email</label>
            <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="label">Password</label>
            <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
          </div>
          {error && <p className="text-primary-red text-sm">{error}</p>}
          <button className="btn btn-primary w-full" disabled={loading}>{loading ? 'Signing in…' : 'Sign in'}</button>
        </form>
        <p className="mt-4 text-sm text-neutral-400">No account? <Link className="text-primary-green hover:underline" to="/register">Create one</Link></p>
      </div>
    </div>
  )
}
