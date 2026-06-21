import { Routes, Route } from 'react-router-dom'
import Home        from './pages/Home'
import PerfilPet   from './pages/PerfilPet'
import CadastrarPet from './pages/CadastrarPet'
import Registrar   from './pages/Registrar'

function App() {
  return (
    <Routes>
      <Route path="/"                       element={<Home />} />
      <Route path="/pets/:id"               element={<PerfilPet />} />
      <Route path="/cadastrar"              element={<CadastrarPet />} />
      <Route path="/pets/:id/registrar"     element={<Registrar />} />
    </Routes>
  )
}

export default App
