import React, { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API_BASE_URL = 'https://api.runabooking.me/api'
const DEFAULT_ADMIN_EMAIL = 'admin@booking.local'
const DEFAULT_ADMIN_PASSWORD = 'admin12345'

const Login: React.FC = () => {
  const navigate = useNavigate()
  // const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState(DEFAULT_ADMIN_EMAIL)
  const [password, setPassword] = useState(DEFAULT_ADMIN_PASSWORD)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setMessage('')
    setError('')

    try {
      setIsSubmitting(true)

      const response = await fetch(`${API_BASE_URL}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({  email, password }),
      })

      const responseData = await response.json().catch(() => null)

      if (!response.ok) {
        const apiError = responseData?.message || responseData?.error || 'Request failed.'
        throw new Error(apiError)
      }

      const token = responseData?.token || responseData?.accessToken || responseData?.user?.token
      if (token) {
        localStorage.setItem('admin_token', token)
        navigate('/admin')
      } else {
        throw new Error('Login succeeded but token is missing in response.')
      }
    } catch (submitError) {
      const errorText = submitError instanceof Error ? submitError.message : 'Unexpected error.'
      setError(errorText)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className='min-h-screen bg-slate-100 px-4 py-12'>
      <div className='mx-auto flex min-h-[70vh] w-full max-w-md items-center justify-center'>
        <form
          onSubmit={handleSubmit}
          className='w-full rounded-2xl bg-white p-8 shadow-lg ring-1 ring-slate-200'
        >
          <h1 className='mb-2 text-center text-3xl font-semibold text-slate-900'>Admin Login</h1>
          <p className='mb-6 text-center text-sm text-slate-600'>Sign in to your admin dashboard.</p>

          {/* <label className='mb-4 block'>
            <span className='mb-1 block text-sm font-medium text-slate-700'>Full Name</span>
            <input
              type='text'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className='w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-300'
              placeholder='Enter your full name'
            />
          </label> */}

          <label className='mb-4 block'>
            <span className='mb-1 block text-sm font-medium text-slate-700'>Email</span>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-300'
              placeholder='name@example.com'
            />
          </label>

          <label className='mb-6 block'>
            <span className='mb-1 block text-sm font-medium text-slate-700'>Password</span>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={4}
              className='w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-300'
              placeholder='Enter password'
            />
          </label>

          {error && (
            <p className='mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700'>
              {error}
            </p>
          )}

          {message && (
            <p className='mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700'>
              {message}
            </p>
          )}

          <button
            type='submit'
            disabled={isSubmitting}
            className='w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70'
          >
            {isSubmitting ? 'Please wait...' : 'Login'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default Login