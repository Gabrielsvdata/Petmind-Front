import { Navigate, Outlet } from 'react-router-dom'

import { estaAutenticado, usuarioEhAdmin } from '../../services/api'

export function RotaAdmin() {
  if (!estaAutenticado()) {
    return <Navigate to="/login" replace />
  }

  if (!usuarioEhAdmin()) {
    return <Navigate to="/home" replace />
  }

  return <Outlet />
}