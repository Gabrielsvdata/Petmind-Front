import { Navigate, Outlet } from 'react-router-dom'

import { estaAutenticado } from '../../services/api'

export function RotaProtegida() {
  if (!estaAutenticado()) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}