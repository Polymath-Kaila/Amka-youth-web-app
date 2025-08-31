// frontend/src/api.js
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

async function request(path, method = 'GET', body) {
  const headers = { 'Content-Type': 'application/json' }
  const token = localStorage.getItem('access')
  if (token) headers['Authorization'] = 'Bearer ' + token

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!res.ok) {
    const text = await res.text()
    let data
    try {
      data = JSON.parse(text)
    } catch {
      data = { detail: text || res.statusText }
    }
    throw new Error(
      data.detail || Object.values(data)[0] || 'Request failed'
    )
  }

  if (res.status === 204) return null
  return res.json()
}

export const auth = {
  async login({ email, password }) {
    // normalize email and send as both "username" and "email"
    const cleanEmail = email.trim().toLowerCase()
    const payload = { username: cleanEmail, email: cleanEmail, password }

    const data = await request('/auth/jwt/create/', 'POST', payload)

    localStorage.setItem('access', data.access)
    localStorage.setItem('refresh', data.refresh)
    return data
  },

  async register(payload) {
    // ensure email is lowercase before sending to backend
    if (payload.email) payload.email = payload.email.trim().toLowerCase()
    return request('/auth/register/', 'POST', payload)
  },

  async me() {
    return request('/auth/me/')
  },

  async updateMe(patch) {
    return request('/auth/me/', 'PATCH', patch)
  },
}
