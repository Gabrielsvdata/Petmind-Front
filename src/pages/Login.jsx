import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { loginUsuario, salvarAuth } from '../services/api'
import cachorroIdle from '../assets/sprites/cachorro/cachorro-idle.png'
import styles from './Auth.module.scss'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setErro(null)
    setLoading(true)
    try {
      const res = await loginUsuario({ email, senha })
      salvarAuth(email, senha, res.data)
      navigate('/home')
    } catch (err) {
      setErro(err.response?.data?.detail ?? 'Falha no login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`${styles.pagina} ${styles.loginPagina}`}>
      <div className={styles.loginTopo}>
        <h1 className={styles.loginLogo}>⚽ PETMIND</h1>
        <img className={styles.loginSprite} src={cachorroIdle} alt="Cachorro idle" />
      </div>

      <form className={`${styles.card} ${styles.loginCard}`} onSubmit={handleSubmit}>
        <h1 className={styles.titulo}>Entrar no PetMind</h1>

        <label className={styles.label} htmlFor="email">E-mail</label>
        <input id="email" className={`${styles.input} ${styles.loginInput}`} type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label className={styles.label} htmlFor="senha">Senha</label>
        <input id="senha" className={`${styles.input} ${styles.loginInput}`} type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />

        {erro && <p className={styles.erro}>{erro}</p>}

        <button className={`${styles.botao} ${styles.loginBotao}`} type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>

        <div className={styles.links}>
          <Link to="/cadastro">Criar conta</Link>
          <Link to="/cadastro-admin">Cadastro administrativo</Link>
        </div>
      </form>
    </div>
  )
}
