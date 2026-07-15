import { useEffect, useState } from 'react'

import {
  adminAlterarPapel,
  adminBuscarUsuario,
  adminCriarAdministrador,
  adminDeletarUsuario,
  adminListarUsuarios,
} from '../../services/api'
import styles from './AdminUsuarios.module.scss'

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([])
  const [detalhe, setDetalhe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState('')
  const [carregandoDetalhe, setCarregandoDetalhe] = useState(false)
  const [mostrarCriacao, setMostrarCriacao] = useState(false)
  const [novoAdmin, setNovoAdmin] = useState({ nome: '', email: '', senha: '' })
  const [salvandoAdmin, setSalvandoAdmin] = useState(false)

  async function carregarUsuarios() {
    setLoading(true)
    setErro('')
    setSucesso('')

    try {
      const res = await adminListarUsuarios()
      setUsuarios(res.data)
    } catch (err) {
      setErro(err.response?.data?.detail ?? 'Não foi possível carregar os usuários.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    carregarUsuarios()
  }, [])

  function atualizarCampoAdmin(campo, valor) {
    setNovoAdmin((estadoAtual) => ({ ...estadoAtual, [campo]: valor }))
  }

  async function criarAdministrador(e) {
    e.preventDefault()
    setErro('')
    setSucesso('')
    setSalvandoAdmin(true)

    try {
      await adminCriarAdministrador(novoAdmin)
      setSucesso('Administrador criado com sucesso.')
      setNovoAdmin({ nome: '', email: '', senha: '' })
      setMostrarCriacao(false)
      await carregarUsuarios()
    } catch (err) {
      setErro(err.response?.data?.detail ?? 'Não foi possível criar o administrador.')
    } finally {
      setSalvandoAdmin(false)
    }
  }

  async function abrirDetalhes(id) {
    setCarregandoDetalhe(true)

    try {
      const res = await adminBuscarUsuario(id)
      setDetalhe(res.data)
    } catch (err) {
      setErro(err.response?.data?.detail ?? 'Não foi possível carregar os detalhes.')
    } finally {
      setCarregandoDetalhe(false)
    }
  }

  async function trocarPapel(usuario) {
    const novoPapel = usuario.papel === 'admin' ? 'usuario' : 'admin'

    try {
      await adminAlterarPapel(usuario.id, novoPapel)
      await carregarUsuarios()
      if (detalhe?.id === usuario.id) {
        await abrirDetalhes(usuario.id)
      }
    } catch (err) {
      setErro(err.response?.data?.detail ?? 'Não foi possível alterar o papel.')
    }
  }

  async function excluirUsuario(usuario) {
    const confirmado = window.confirm(
      `Deseja remover o usuário ${usuario.nome} e todos os pets dele?`
    )

    if (!confirmado) {
      return
    }

    try {
      await adminDeletarUsuario(usuario.id)
      if (detalhe?.id === usuario.id) {
        setDetalhe(null)
      }
      await carregarUsuarios()
    } catch (err) {
      setErro(err.response?.data?.detail ?? 'Não foi possível remover o usuário.')
    }
  }

  return (
    <div className={styles.pagina}>
      <div className={styles.topo}>
        <h2 className={styles.titulo}>Usuários</h2>
        <p className={styles.subtitulo}>Gerencie acesso, papel e histórico de pets.</p>
        <div className={styles.topoAcoes}>
          <button
            className={styles.acao}
            onClick={() => setMostrarCriacao((valorAtual) => !valorAtual)}
          >
            {mostrarCriacao ? 'Fechar criação' : 'Criar conta de administrador'}
          </button>
        </div>
      </div>

      {erro && <div className={styles.alerta}>{erro}</div>}
      {sucesso && <div className={styles.sucesso}>{sucesso}</div>}

      {mostrarCriacao && (
        <section className={styles.cardFormulario}>
          <form className={styles.formulario} onSubmit={criarAdministrador}>
            <h3 className={styles.formTitulo}>Novo administrador</h3>

            <label className={styles.campo}>
              <span>Nome</span>
              <input
                value={novoAdmin.nome}
                onChange={(e) => atualizarCampoAdmin('nome', e.target.value)}
                required
              />
            </label>

            <label className={styles.campo}>
              <span>E-mail</span>
              <input
                type="email"
                value={novoAdmin.email}
                onChange={(e) => atualizarCampoAdmin('email', e.target.value)}
                required
              />
            </label>

            <label className={styles.campo}>
              <span>Senha</span>
              <input
                type="password"
                value={novoAdmin.senha}
                onChange={(e) => atualizarCampoAdmin('senha', e.target.value)}
                minLength={6}
                required
              />
            </label>

            <div className={styles.formAcoes}>
              <button className={styles.acao} type="submit" disabled={salvandoAdmin}>
                {salvandoAdmin ? 'Criando...' : 'Criar administrador'}
              </button>
            </div>
          </form>
        </section>
      )}

      <section className={styles.cardTabela}>
        {loading ? (
          <div className={styles.estadoTela}>Carregando usuários...</div>
        ) : (
          <div className={styles.tabelaWrap}>
            <table className={styles.tabela}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Papel</th>
                  <th>Pets</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.id}</td>
                    <td>{usuario.nome}</td>
                    <td>{usuario.email}</td>
                    <td>
                      <span className={styles.papel}>{usuario.papel}</span>
                    </td>
                    <td>{usuario.total_pets}</td>
                    <td>
                      <div className={styles.acoes}>
                        <button className={styles.acao} onClick={() => abrirDetalhes(usuario.id)}>
                          👁
                        </button>
                        <button className={styles.acao} onClick={() => trocarPapel(usuario)}>
                          {usuario.papel === 'admin' ? 'Tornar usuário' : 'Tornar admin'}
                        </button>
                        <button className={styles.acaoPerigo} onClick={() => excluirUsuario(usuario)}>
                          🗑
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {detalhe && (
        <div className={styles.modalFundo} onClick={() => setDetalhe(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalTopo}>
              <div>
                <h3 className={styles.modalTitulo}>Detalhes do usuário</h3>
                <p className={styles.modalTexto}>{detalhe.nome} • {detalhe.email}</p>
              </div>
              <button className={styles.fechar} onClick={() => setDetalhe(null)}>
                Fechar
              </button>
            </div>

            {carregandoDetalhe ? (
              <p className={styles.modalTexto}>Carregando detalhes...</p>
            ) : (
              <>
                <div className={styles.modalGrid}>
                  <div className={styles.metrica}>
                    <span className={styles.metricaRotulo}>Papel</span>
                    <strong>{detalhe.papel}</strong>
                  </div>
                  <div className={styles.metrica}>
                    <span className={styles.metricaRotulo}>Pets</span>
                    <strong>{detalhe.total_pets}</strong>
                  </div>
                  <div className={styles.metrica}>
                    <span className={styles.metricaRotulo}>Registros</span>
                    <strong>{detalhe.total_registros}</strong>
                  </div>
                </div>

                <div className={styles.listaPets}>
                  <h4 className={styles.listaTitulo}>Pets desse usuário</h4>
                  {detalhe.pets.length === 0 ? (
                    <p className={styles.modalTexto}>Nenhum pet cadastrado.</p>
                  ) : (
                    detalhe.pets.map((pet) => (
                      <div key={pet.id} className={styles.petItem}>
                        <strong>{pet.nome}</strong>
                        <span>{pet.especie} • {pet.raca}</span>
                      </div>
                    ))
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}