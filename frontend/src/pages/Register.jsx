import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../api'

const REGIONS = ["Nairobi","Coastal","Western","North Eastern","Nyanza","Eastern","Rift Valley"]

export default function Register(){
  const [form, setForm] = useState({
    first_name: "", last_name: "", email: "", phone: "",
    region: "", age: "", gender: "", interests: "", password: ""
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const update = (k, v) => setForm(s => ({...s, [k]: v}))

  async function onSubmit(e){
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      const payload = {...form, age: form.age ? Number(form.age) : null}
      await auth.register(payload)
      // auto-login
      await auth.login({ email: form.email, password: form.password })
      navigate('/')
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card p-6">
        <h1 className="text-3xl font-bold mb-6">Join the movement 🚀</h1>
        <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className="label">First name</label>
            <input className="input" value={form.first_name} onChange={e=>update('first_name',e.target.value)} required />
          </div>
          <div><label className="label">Last name</label>
            <input className="input" value={form.last_name} onChange={e=>update('last_name',e.target.value)} required />
          </div>
          <div className="md:col-span-2"><label className="label">Email address</label>
            <input className="input" type="email" value={form.email} onChange={e=>update('email',e.target.value)} required />
          </div>
          <div><label className="label">Phone number</label>
            <input className="input" value={form.phone} onChange={e=>update('phone',e.target.value)} placeholder="+254..." />
          </div>
          <div><label className="label">Region</label>
            <select className="select" value={form.region} onChange={e=>update('region',e.target.value)} required>
              <option value="" disabled>Select region</option>
              {REGIONS.map(r=> <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div><label className="label">Age</label>
            <input className="input" type="number" min="10" max="120" value={form.age} onChange={e=>update('age',e.target.value)} />
          </div>
          <div><label className="label">Gender</label>
            <select className="select" value={form.gender} onChange={e=>update('gender',e.target.value)}>
              <option value="">Prefer not to say</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="md:col-span-2"><label className="label">Interests</label>
            <input className="input" value={form.interests} onChange={e=>update('interests',e.target.value)} placeholder="e.g., coding, sports, arts" />
            <p className="text-xs text-neutral-400 mt-1">Tip: separate multiple interests with commas.</p>
          </div>
          <div className="md:col-span-2"><label className="label">Create password</label>
            <input className="input" type="password" value={form.password} onChange={e=>update('password',e.target.value)} required />
          </div>
          {error && <p className="text-primary-red text-sm md:col-span-2">{error}</p>}
          <div className="md:col-span-2">
            <button className="btn btn-primary w-full" disabled={loading}>{loading ? 'Creating your account…' : 'Create account'}</button>
          </div>
        </form>
        <p className="mt-4 text-sm text-neutral-400">Already have an account? <Link className="text-primary-indigo hover:underline" to="/login">Log in</Link></p>
      </div>
    </div>
  )
}
