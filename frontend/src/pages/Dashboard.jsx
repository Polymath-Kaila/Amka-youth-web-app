import React, { useEffect, useState } from 'react'
import { auth } from '../api'

export default function Dashboard(){
  const [me, setMe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    (async () => {
      try { setMe(await auth.me()) }
      catch (e) { setError(e.message) }
      finally { setLoading(false) }
    })()
  }, [])

  if (loading) return <p>Loading your dashboard…</p>
  if (error) return <p className="text-primary-red">{error}</p>

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h1 className="text-3xl font-bold">Hey {me.first_name || me.username} 👋</h1>
        <p className="text-neutral-300">Welcome to your Amka dashboard.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-2">Your profile</h2>
          <ul className="text-neutral-300 space-y-1">
            <li><span className="text-neutral-400">Name:</span> {me.first_name} {me.last_name}</li>
            <li><span className="text-neutral-400">Email:</span> {me.email}</li>
            <li><span className="text-neutral-400">Phone:</span> {me.phone || '—'}</li>
            <li><span className="text-neutral-400">Region:</span> {me.region || '—'}</li>
            <li><span className="text-neutral-400">Age:</span> {me.age || '—'}</li>
            <li><span className="text-neutral-400">Gender:</span> {me.gender || '—'}</li>
            <li><span className="text-neutral-400">Interests:</span> {me.interests?.length ? me.interests.join(', ') : '—'}</li>
          </ul>
        </div>
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-2">Next steps</h2>
          <ol className="list-decimal list-inside text-neutral-300 space-y-1">
            <li>Build programs & events.</li>
            <li>Add announcements and newsletters.</li>
            <li>Invite mentors & youth. 💚</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
