import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import {
  cadastrarAdminBootstrap,
  cadastrarUsuario,
  salvarAuth,
  statusBootstrapAdmin,
} from '../services/api'
import styles from './Auth.module.scss'

export default function CadastroConta() {
  const navigate = useNavigate()
  const [tipoConta, setTipoConta] = useState('usuario')
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [chaveBootstrap, setChaveBootstrap] = useState('')
  const [adminBootstrapHabilitado, setAdminBootstrapHabilitado] = useState(false)
  const [adminBootstrapExigeChave, setAdminBootstrapExigeChave] = useState(false)
  const [erro, setErro] = useState(null)
  const [loading, setLoading] = useState(false)
  const [loadingStatus, setLoadingStatus] = useState(true)
  const [sucesso, setSucesso] = useState(false)

  useEffect(() => {
    let ativo = true

    async function carregarStatusAdmin() {
      try {
        const resposta = await statusBootstrapAdmin()
        if (!ativo) return
        setAdminBootstrapHabilitado(Boolean(resposta.data?.habilitado))
        setAdminBootstrapExigeChave(Boolean(resposta.data?.exige_chave))
      } catch {
        if (!ativo) return
        setAdminBootstrapHabilitado(false)
        setAdminBootstrapExigeChave(false)
      } finally {
        if (ativo) {
          setLoadingStatus(false)
        }
      }
    }

    carregarStatusAdmin()
    return () => {
      ativo = false
    }
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setErro(null)
    setLoading(true)
    try {
      if (tipoConta === 'admin') {
        const resposta = await cadastrarAdminBootstrap({
          nome,
          email,
          senha,
          chave_bootstrap: adminBootstrapExigeChave ? chaveBootstrap : undefined,
        })
        salvarAuth(email, senha, resposta.data)
        setSucesso(true)
        setTimeout(() => navigate('/admin'), 900)
      } else {
        await cadastrarUsuario({ nome, email, senha })
        setSucesso(true)
        setTimeout(() => navigate('/login'), 1300)
      }
    } catch (err) {
      if (err.response?.status === 409) {
        setAdminBootstrapHabilitado(false)
        setTipoConta('usuario')
      }
      setErro(err.response?.data?.detail ?? 'Falha no cadastro')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.pagina}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <h1 className={styles.titulo}>Criar conta</h1>

        {!loadingStatus && (
          <>
            <label className={styles.label}>Tipo de conta</label>
            <div className={styles.grupoOpcoes}>
              <button
                className={tipoConta === 'usuario' ? styles.opcaoAtiva : styles.opcao}
                type="button"
                onClick={() => setTipoConta('usuario')}
              >
                Usuário comum
              </button>
              <button
                className={tipoConta === 'admin' ? styles.opcaoAtiva : styles.opcao}
                type="button"
                onClick={() => adminBootstrapHabilitado && setTipoConta('admin')}
                disabled={!adminBootstrapHabilitado}
                title={
                  adminBootstrapHabilitado
                    ? 'Criar primeiro administrador'
                    : 'Cadastro de administrador indisponível no momento'
                }
              >
                Administrador
              </button>
            </div>
          </>
        )}

        <label className={styles.label} htmlFor="nome">Nome</label>
        <input id="nome" className={styles.input} type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />

        <label className={styles.label} htmlFor="email">E-mail</label>
        <input id="email" className={styles.input} type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label className={styles.label} htmlFor="senha">Senha</label>
        <input id="senha" className={styles.input} type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required minLength={6} />

        {tipoConta === 'admin' && adminBootstrapExigeChave && (
          <>
            <label className={styles.label} htmlFor="chave-bootstrap">Chave de bootstrap</label>
            <input
              id="chave-bootstrap"
              className={styles.input}
              type="password"
              value={chaveBootstrap}
              onChange={(e) => setChaveBootstrap(e.target.value)}
              required
            />
          </>
        )}

        {tipoConta === 'admin' && adminBootstrapHabilitado && (
          <p className={styles.ok}>Conta de administrador será criada com acesso ao dashboard administrativo.</p>
        )}

        {!loadingStatus && !adminBootstrapHabilitado && (
          <p className={styles.erro}>Cadastro de administrador indisponível. Use conta comum ou peça a um admin para criar acesso.</p>
        )}

        {erro && <p className={styles.erro}>{erro}</p>}

        <button className={styles.botao} type="submit" disabled={loading}>
          {loading
            ? 'Criando conta...'
            : tipoConta === 'admin'
              ? 'Cadastrar administrador'
              : 'Cadastrar'}
        </button>

        {sucesso && (
          <div className={styles.popupSucesso}>
            {tipoConta === 'admin'
              ? 'Administrador criado com sucesso! Entrando no dashboard...'
              : 'Cadastro efetuado com sucesso! Redirecionando para login...'}
          </div>
        )}

        <div className={styles.links}>
          <Link to="/">Voltar para landing</Link>
          <Link to="/login">Ir para login</Link>
        </div>
      </form>
    </div>
  )
}