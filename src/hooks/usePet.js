import { useState, useEffect, useCallback } from 'react'
import {
  buscarPet,
  listarRegistros,
  ultimoRegistro,
  adicionarRegistro,
  analisarPet,
} from '../services/api'

export function usePet(id) {
  const [pet, setPet]             = useState(null)
  const [registros, setRegistros] = useState([])
  const [ultimo, setUltimo]       = useState(null)
  const [analise, setAnalise]     = useState(null)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState(null)

  const carregarPet = useCallback(async () => {
    if (!id) return
    setLoading(true)
    setError(null)
    try {
      const [petRes, regRes] = await Promise.all([
        buscarPet(id),
        listarRegistros(id),
      ])
      setPet(petRes.data)
      setRegistros(regRes.data)

      try {
        const ultRes = await ultimoRegistro(id)
        setUltimo(ultRes.data)
      } catch {
        setUltimo(null)
      }
    } catch (err) {
      setError(err.response?.data?.detail ?? 'Erro ao carregar pet')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    carregarPet()
  }, [carregarPet])

  const registrar = useCallback(async (dados) => {
    setLoading(true)
    try {
      const res = await adicionarRegistro(id, dados)
      await carregarPet()
      return res.data
    } catch (err) {
      setError(err.response?.data?.detail ?? 'Erro ao registrar')
      throw err
    } finally {
      setLoading(false)
    }
  }, [id, carregarPet])

  const analisar = useCallback(async () => {
    setLoading(true)
    setAnalise(null)
    try {
      const res = await analisarPet(id)
      setAnalise(res.data)
      return res.data
    } catch (err) {
      setError(err.response?.data?.detail ?? 'Erro ao analisar')
      throw err
    } finally {
      setLoading(false)
    }
  }, [id])

  return { pet, registros, ultimo, analise, loading, error, registrar, analisar, recarregar: carregarPet }
}
