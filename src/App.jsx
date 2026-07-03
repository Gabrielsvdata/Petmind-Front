import { Routes, Route } from 'react-router-dom'
import Home         from './pages/Home'
import PerfilPet    from './pages/PerfilPet'
import CadastrarPet from './pages/CadastrarPet'
import Registrar    from './pages/Registrar'
import Login        from './pages/Login'
import CadastroUsuario from './pages/CadastroUsuario'
import EsqueciSenha from './pages/EsqueciSenha'
import { RequireAuth } from './components/ui/RequireAuth'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<CadastroUsuario />} />
      <Route path="/esqueci-senha" element={<EsqueciSenha />} />

      <Route element={<RequireAuth />}>
        <Route path="/" element={<Home />} />
        <Route path="/pets/:id" element={<PerfilPet />} />
        <Route path="/cadastrar" element={<CadastrarPet />} />
        <Route path="/pets/:id/registrar" element={<Registrar />} />
      </Route>
    </Routes>
  )
}

export default App
