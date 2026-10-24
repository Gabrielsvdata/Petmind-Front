import { Navigate, Outlet } from 'react-router-dom'
import { obterAuth } from '../../services/api'

export function RequireAuth() {
  const auth = obterAuth()
  if (!auth?.token) {
    return <Navigate to="/login" replace />
  }
  return <Outlet />
}
