import axios from 'axios'

const API_BASE_URL = (
  import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000'
).replace(/\/+$/, '')

const api = axios.create({ baseURL: API_BASE_URL })

const AUTH_KEY = 'petmind_auth'

export function obterAuth() {
  const raw = localStorage.getItem(AUTH_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function salvarAuth(email, senha, usuario = {}) {
  localStorage.setItem(
    AUTH_KEY,
    JSON.stringify({
      email,
      senha,
      nome: usuario?.nome ?? '',
      papel: usuario?.papel ?? 'usuario',
      usuarioId: usuario?.usuario_id ?? null,
    })
  )
}

export function limparAuth() {
  localStorage.removeItem(AUTH_KEY)
}

export function estaAutenticado() {
  const auth = obterAuth()
  return Boolean(auth?.email && auth?.senha)
}

export function usuarioEhAdmin() {
  const auth = obterAuth()
  return auth?.papel === 'admin'
}

export function usuarioEhComum() {
  const auth = obterAuth()
  return auth?.papel === 'usuario'
}

api.interceptors.request.use((config) => {
  const auth = obterAuth()
  if (auth?.email && auth?.senha) {
    const basic = btoa(`${auth.email}:${auth.senha}`)
    config.headers.Authorization = `Basic ${basic}`
  }
  return config
})

export const cadastrarUsuario = (dados) => api.post('/auth/register', dados)
export const loginUsuario = (dados) => api.post('/auth/login', dados)
export const usuarioLogado = () => api.get('/auth/me')

export const listarPets        = ()        => api.get('/pets')
export const buscarPet         = (id)      => api.get(`/pets/${id}`)
export const cadastrarPet      = (dados)   => api.post('/pets', dados)
export const adicionarRegistro = (id, d)   => api.post(`/pets/${id}/registros`, d)
export const listarRegistros   = (id)      => api.get(`/pets/${id}/registros`)
export const ultimoRegistro    = (id)      => api.get(`/pets/${id}/registros/ultimo`)
export const analisarPet       = (id)      => api.post(`/pets/${id}/analisar`)

export const adminEstatisticas  = ()       => api.get('/admin/estatisticas')
export const adminListarUsuarios = ()      => api.get('/admin/usuarios')
export const adminBuscarUsuario  = (id)    => api.get(`/admin/usuarios/${id}`)
export const adminAlterarPapel   = (id, p) => api.put(`/admin/usuarios/${id}/papel`, { papel: p })
export const adminDeletarUsuario = (id)    => api.delete(`/admin/usuarios/${id}`)
export const adminListarPets     = ()      => api.get('/admin/pets')
export const adminDeletarPet     = (id)    => api.delete(`/admin/pets/${id}`)

export function calcularEstado(agitacao, sono, apetite, humor) {
  if (agitacao >= 4 && sono >= 4 && apetite >= 4 && humor >= 4) return 'animado'
  if (agitacao >= 4) return 'agitado'
  if (humor <= 2 && agitacao <= 2) return 'triste'
  if (sono <= 2) return 'sonolento'
  if (apetite <= 2) return 'com_fome'
  return 'feliz'
}

export default api
