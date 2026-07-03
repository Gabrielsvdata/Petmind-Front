import axios from 'axios'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL })

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

export function salvarAuth(email, senha) {
  localStorage.setItem(AUTH_KEY, JSON.stringify({ email, senha }))
}

export function limparAuth() {
  localStorage.removeItem(AUTH_KEY)
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
export const esqueciSenha = (dados) => api.post('/auth/esqueci-senha', dados)
export const redefinirSenha = (dados) => api.post('/auth/redefinir-senha', dados)

export const listarPets        = ()        => api.get('/pets')
export const buscarPet         = (id)      => api.get(`/pets/${id}`)
export const cadastrarPet      = (dados)   => api.post('/pets', dados)
export const adicionarRegistro = (id, d)   => api.post(`/pets/${id}/registros`, d)
export const listarRegistros   = (id)      => api.get(`/pets/${id}/registros`)
export const ultimoRegistro    = (id)      => api.get(`/pets/${id}/registros/ultimo`)
export const analisarPet       = (id)      => api.post(`/pets/${id}/analisar`)

export function calcularEstado(agitacao, sono, apetite, humor) {
  if (agitacao >= 4 && sono >= 4 && apetite >= 4 && humor >= 4) return 'animado'
  if (agitacao >= 4) return 'agitado'
  if (humor <= 2 && agitacao <= 2) return 'triste'
  if (sono <= 2) return 'sonolento'
  if (apetite <= 2) return 'com_fome'
  return 'feliz'
}

export default api
