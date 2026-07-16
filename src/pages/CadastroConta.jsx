import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import {
  cadastrarAdminBootstrap,
  cadastrarUsuario,
  salvarAuth,
  statusBootstrapAdmin,
} from '../services/api'
import styles from './Auth.module.scss'

export default function CadastroConta() {
  const navigate = useNavigate()
  const location = useLocation()
  const tipoInicial = location.state?.tipoConta === 'admin' ? 'admin' : 'usuario'
  const [tipoConta, setTipoConta] = useState(tipoInicial)
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [chaveBootstrap, setChaveBootstrap] = useState('')
  const [adminBootstrapExigeChave, setAdminBootstrapExigeChave] = useState(false)
  const [erro, setErro] = useState(null)
  const [loading, setLoading] = useState(false)
  const [sucesso, setSucesso] = useState(false)

  useEffect(() => {
    let ativo = true

    async function carregarStatusAdmin() {
      try {
        const resposta = await statusBootstrapAdmin()
        if (!ativo) return
        setAdminBootstrapExigeChave(Boolean(resposta.data?.exige_chave))
      } catch {
        if (!ativo) return
        setAdminBootstrapExigeChave(false)
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
      setErro(err.response?.data?.detail ?? 'Falha no cadastro')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.pagina}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <h1 className={styles.titulo}>
          {tipoConta === 'admin' ? 'Criar conta de administrador' : 'Criar conta'}
        </h1>

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
            onClick={() => setTipoConta('admin')}
          >
            Administrador
          </button>
        </div>

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

        {tipoConta === 'admin' && (
          <p className={styles.ok}>Voce esta criando uma conta de administrador com acesso ao dashboard.</p>
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