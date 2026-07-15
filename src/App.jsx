import { Navigate, Route, Routes } from 'react-router-dom'

import { RotaAdmin } from './components/guards/RotaAdmin'
import { RotaProtegida } from './components/guards/RotaProtegida'
import AdminLayout from './components/admin/AdminLayout'
import Landing from './pages/Landing'
import Home         from './pages/Home'
import PerfilPet    from './pages/PerfilPet'
import CadastrarPet from './pages/CadastrarPet'
import Registrar    from './pages/Registrar'
import Login        from './pages/Login'
import CadastroConta from './pages/CadastroConta'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminPets from './pages/admin/AdminPets'
import AdminUsuarios from './pages/admin/AdminUsuarios'
import { estaAutenticado } from './services/api'

function App() {
  const autenticado = estaAutenticado()

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<CadastroConta tipo="usuario" />} />
      <Route path="/cadastro-admin" element={<CadastroConta tipo="admin" />} />

      <Route element={<RotaProtegida />}>
        <Route path="/home" element={<Home />} />
        <Route path="/pets/novo" element={<CadastrarPet />} />
        <Route path="/pets/:id" element={<PerfilPet />} />
        <Route path="/pets/:id/registrar" element={<Registrar />} />
      </Route>

      <Route element={<RotaAdmin />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/usuarios" element={<AdminUsuarios />} />
          <Route path="/admin/pets" element={<AdminPets />} />
        </Route>
      </Route>

      <Route
        path="*"
        element={<Navigate to={autenticado ? '/home' : '/'} replace />}
      />
    </Routes>
  )
}

export default App
