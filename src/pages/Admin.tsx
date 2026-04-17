import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Reservation {
  id: number
  name: string
  phone: string
  checkIn: string
  checkOut: string
  adults: number
  children: number
  roomType: string
  status: string
}

const Admin: React.FC = () => {
  const navigate = useNavigate()
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<Partial<Reservation>>({})
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const token = localStorage.getItem('admin_token')

  useEffect(() => {
    if (!token) {
      navigate('/admin-login')
      return
    }

    const fetchReservations = async () => {
      try {
        const response = await fetch('https://api.runabooking.me/api/reservation', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.status === 401) {
          localStorage.removeItem('admin_token')
          navigate('/admin-login')
          return
        }

        const data = await response.json().catch(() => null)
        setReservations(data ?? [])
      } catch {
        setError('Failed to load reservations.')
      } finally {
        setLoading(false)
      }
    }

    fetchReservations()
  }, [token, navigate])

  const handleLogout = async () => {
    try {
      await fetch('https://api.runabooking.me/api/admin/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    } catch {
      // proceed with local logout even if API call fails
    } finally {
      localStorage.removeItem('admin_token')
      navigate('/')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this reservation?')) return
    setDeletingId(id)
    try {
      await fetch(`https://api.runabooking.me/api/reservation/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      setReservations((prev) => prev.filter((r) => r.id !== id))
    } catch {
      alert('Failed to delete.')
    } finally {
      setDeletingId(null)
    }
  }

  const toDateInput = (val: string | undefined) =>
    val ? val.slice(0, 10) : ''

  const openEdit = (r: Reservation) => {
    setEditingId(r.id)
    setEditForm({
      ...r,
      checkIn: toDateInput(r.checkIn),
      checkOut: toDateInput(r.checkOut),
    })
  }

  const handleEditSave = async () => {
    if (editingId === null) return
    setSaving(true)
    try {
      const response = await fetch(`https://api.runabooking.me/api/reservation/${editingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      })
      const updated = await response.json().catch(() => null)
      setReservations((prev) =>
        prev.map((r) => (r.id === editingId ? { ...r, ...updated } : r))
      )
      setEditingId(null)
    } catch {
      alert('Failed to save.')
    } finally {
      setSaving(false)
    }
  }

  const statusStyle: Record<string, string> = {
    booked: 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200',
    cancelled: 'bg-red-100 text-red-700 ring-1 ring-red-200',
    pending: 'bg-amber-100 text-amber-700 ring-1 ring-amber-200',
  }

  const columns = ['#', 'Guest', 'Phone', 'Check In', 'Check Out', 'Guests', 'Room', 'Status', 'Actions']

  return (
    <section className='flex flex-col h-screen bg-slate-900 overflow-hidden'>

      {/* Top bar */}
      <div className='shrink-0 bg-slate-950 border-b border-slate-700/60 px-8 py-4 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='h-8 w-1 rounded-full bg-accent' />
          <h1 className='text-white text-xl font-bold tracking-wide'>Booking Admin</h1>
        </div>
        <button
          onClick={handleLogout}
          className='flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20'
        >
          Logout
        </button>
      </div>

      <div className='flex flex-1 flex-col overflow-hidden px-8 py-6'>

        {/* Header row */}
        <div className='mb-5 shrink-0 flex items-center justify-between'>
          <div>
            <h2 className='text-2xl font-bold text-white'>Reservations</h2>
            {!loading && (
              <p className='mt-1 text-sm text-slate-400'>
                {reservations.length} record{reservations.length !== 1 ? 's' : ''} found
              </p>
            )}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className='flex flex-1 items-center justify-center gap-3'>
            <div className='h-6 w-6 animate-spin rounded-full border-2 border-slate-600 border-t-slate-200' />
            <p className='text-slate-400'>Loading reservations...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className='rounded-xl border border-red-700 bg-red-900/30 px-6 py-4 text-sm text-red-400'>
            {error}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && reservations.length === 0 && (
          <div className='flex flex-1 items-center justify-center'>
            <p className='text-slate-500 text-lg'>No reservations yet.</p>
          </div>
        )}

        {/* Table */}
        {!loading && reservations.length > 0 && (
          <div className='flex-1 overflow-auto rounded-2xl ring-1 ring-slate-700 shadow-2xl'>
            <table className='min-w-full divide-y divide-slate-700/50 text-xl'>

              <thead className='sticky top-0 z-10'>
                <tr className='bg-slate-800 text-left text-lg font-semibold uppercase tracking-widest text-slate-400'>
                  {columns.map((col) => (
                    <th key={col} className='px-6 py-4 whitespace-nowrap'>{col}</th>
                  ))}
                </tr>
              </thead>

              <tbody className='divide-y divide-slate-700/40'>
                {reservations.map((r, idx) => (
                  <tr
                    key={r.id}
                    className={`transition-colors hover:bg-slate-700/40 ${idx % 2 === 0 ? 'bg-slate-800/60' : 'bg-slate-800/30'}`}
                  >
                    <td className='px-6 py-4 text-slate-500 font-mono text-lg'>{r.id}</td>

                    <td className='px-6 py-4'>
                      <div className='font-semibold text-white'>{r.name}</div>
                    </td>

                    <td className='px-6 py-4 text-slate-300'>{r.phone}</td>

                    <td className='px-6 py-4'>
                      <span className='inline-flex items-center gap-1 rounded-md bg-slate-700 px-2 py-1 text-lg font-medium text-slate-200'>
                        📅 {r.checkIn}
                      </span>
                    </td>

                    <td className='px-6 py-4'>
                      <span className='inline-flex items-center gap-1 rounded-md bg-slate-700 px-2 py-1 text-lg font-medium text-slate-200'>
                        📅 {r.checkOut}
                      </span>
                    </td>

                    <td className='px-6 py-4 text-slate-300'>
                      <span title='Adults'>👤 {r.adults}</span>
                      {r.children > 0 && (
                        <span className='ml-2' title='Children'>🧒 {r.children}</span>
                      )}
                    </td>

                    <td className='px-6 py-4 capitalize text-slate-200 font-medium'>{r.roomType}</td>

                    <td className='px-6 py-4'>
                      <span className={`rounded-full px-3 py-1 text-lg font-semibold capitalize ${statusStyle[r.status] ?? 'bg-slate-700 text-slate-300'}`}>
                        {r.status}
                      </span>
                    </td>

                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-2'>
                        <button
                          onClick={() => openEdit(r)}
                          className='rounded-lg bg-blue-600/20 px-3 py-1.5 text-sm font-medium text-blue-400 ring-1 ring-blue-500/40 transition hover:bg-blue-600/40'
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(r.id)}
                          disabled={deletingId === r.id}
                          className='rounded-lg bg-red-600/20 px-3 py-1.5 text-sm font-medium text-red-400 ring-1 ring-red-500/40 transition hover:bg-red-600/40 disabled:opacity-50'
                        >
                          {deletingId === r.id ? '...' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}

      </div>

      {/* Edit modal */}
      {editingId !== null && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm'>
          <div className='w-full max-w-lg rounded-2xl bg-slate-800 p-8 shadow-2xl ring-1 ring-slate-700'>
            <h3 className='mb-6 text-xl font-bold text-white'>Edit Reservation #{editingId}</h3>

            <div className='grid grid-cols-2 gap-4'>
              {(
                [
                  { label: 'Name', key: 'name', type: 'text' },
                  { label: 'Phone', key: 'phone', type: 'tel' },
                  { label: 'Check In', key: 'checkIn', type: 'date' },
                  { label: 'Check Out', key: 'checkOut', type: 'date' },
                  { label: 'Adults', key: 'adults', type: 'number' },
                  { label: 'Children', key: 'children', type: 'number' },
                  { label: 'Room Type', key: 'roomType', type: 'text' },
                ] as { label: string; key: keyof Reservation; type: string }[]
              ).map(({ label, key, type }) => (
                <label key={key} className='flex flex-col gap-1'>
                  <span className='text-xs font-medium uppercase tracking-wider text-slate-400'>{label}</span>
                  <input
                    type={type}
                    value={String(editForm[key] ?? '')}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        [key]: type === 'number' ? Number(e.target.value) : e.target.value,
                      }))
                    }
                    className='rounded-lg bg-slate-700 px-3 py-2 text-white outline-none ring-1 ring-slate-600 focus:ring-blue-500'
                  />
                </label>
              ))}

              <label className='flex flex-col gap-1'>
                <span className='text-xs font-medium uppercase tracking-wider text-slate-400'>Status</span>
                <select
                  value={String(editForm.status ?? '')}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, status: e.target.value }))}
                  className='rounded-lg bg-slate-700 px-3 py-2 text-white outline-none ring-1 ring-slate-600 focus:ring-blue-500'
                >
                  <option value='booked'>Booked</option>
                  <option value='pending'>Pending</option>
                  <option value='cancelled'>Cancelled</option>
                </select>
              </label>
            </div>

            <div className='mt-6 flex justify-end gap-3'>
              <button
                onClick={() => setEditingId(null)}
                className='rounded-lg px-5 py-2 text-sm font-medium text-slate-400 ring-1 ring-slate-600 transition hover:bg-slate-700'
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                disabled={saving}
                className='rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-500 disabled:opacity-60'
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  )
}

export default Admin
