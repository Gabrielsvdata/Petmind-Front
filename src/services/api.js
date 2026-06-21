import axios from 'axios'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL })

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
