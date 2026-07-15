import { useEffect, useState } from 'react'

import {
  adminBuscarUsuario,
  adminDeletarPet,
  adminListarPets,
  adminListarUsuarios,
  listarRegistros,
} from '../../services/api'
import styles from './AdminPets.module.scss'

export default function AdminPets() {
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState('')

  async function carregarPets() {
    setLoading(true)
    setErro('')

    try {
      const [petsRes, usuariosRes] = await Promise.all([
        adminListarPets(),
        adminListarUsuarios(),
      ])

      const detalhesUsuarios = await Promise.all(
        usuariosRes.data.map(async (usuario) => {
          const detalhe = await adminBuscarUsuario(usuario.id)
          return detalhe.data
        })
      )

      const mapaDonos = new Map()
      detalhesUsuarios.forEach((usuario) => {
        usuario.pets.forEach((pet) => {
          mapaDonos.set(pet.id, usuario.nome)
        })
      })

      const petsComRegistros = await Promise.all(
        petsRes.data.map(async (pet) => {
          try {
            const registrosRes = await listarRegistros(pet.id)
            return {
              ...pet,
              dono: mapaDonos.get(pet.id) ?? 'Sem dono',
              totalRegistros: registrosRes.data.length,
            }
          } catch {
            return {
              ...pet,
              dono: mapaDonos.get(pet.id) ?? 'Sem dono',
              totalRegistros: 0,
            }
          }
        })
      )

      setPets(petsComRegistros)
    } catch (err) {
      setErro(err.response?.data?.detail ?? 'Não foi possível carregar os pets.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    carregarPets()
  }, [])

  async function excluirPet(pet) {
    const confirmado = window.confirm(`Deseja remover o pet ${pet.nome}?`)

    if (!confirmado) {
      return
    }

    try {
      await adminDeletarPet(pet.id)
      await carregarPets()
    } catch (err) {
      setErro(err.response?.data?.detail ?? 'Não foi possível remover o pet.')
    }
  }

  return (
    <div className={styles.pagina}>
      <div className={styles.topo}>
        <h2 className={styles.titulo}>Pets</h2>
        <p className={styles.subtitulo}>Acompanhe todos os pets cadastrados no sistema.</p>
      </div>

      {erro && <div className={styles.alerta}>{erro}</div>}

      <section className={styles.cardTabela}>
        {loading ? (
          <div className={styles.estadoTela}>Carregando pets...</div>
        ) : (
          <div className={styles.tabelaWrap}>
            <table className={styles.tabela}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Espécie</th>
                  <th>Dono</th>
                  <th>Registros</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {pets.map((pet) => (
                  <tr key={pet.id}>
                    <td>{pet.id}</td>
                    <td>{pet.nome}</td>
                    <td>{pet.especie}</td>
                    <td>{pet.dono}</td>
                    <td>{pet.totalRegistros}</td>
                    <td>
                      <button className={styles.acaoPerigo} onClick={() => excluirPet(pet)}>
                        🗑
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}