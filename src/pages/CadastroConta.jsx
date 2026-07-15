import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { cadastrarUsuario } from '../services/api'
import styles from './Auth.module.scss'

export default function CadastroConta() {
  const navigate = useNavigate()
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState(null)
  const [loading, setLoading] = useState(false)
  const [sucesso, setSucesso] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setErro(null)
    setLoading(true)
    try {
      await cadastrarUsuario({ nome, email, senha })
      setSucesso(true)
      setTimeout(() => navigate('/login'), 1300)
    } catch (err) {
      setErro(err.response?.data?.detail ?? 'Falha no cadastro')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.pagina}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <h1 className={styles.titulo}>Criar conta</h1>

        <label className={styles.label} htmlFor="nome">Nome</label>
        <input id="nome" className={styles.input} type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />

        <label className={styles.label} htmlFor="email">E-mail</label>
        <input id="email" className={styles.input} type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label className={styles.label} htmlFor="senha">Senha</label>
        <input id="senha" className={styles.input} type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required minLength={6} />

        {erro && <p className={styles.erro}>{erro}</p>}

        <button className={styles.botao} type="submit" disabled={loading}>
          {loading ? 'Criando conta...' : 'Cadastrar'}
        </button>

        {sucesso && (
          <div className={styles.popupSucesso}>
            Cadastro efetuado com sucesso! Redirecionando para login...
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