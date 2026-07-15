import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { loginUsuario, salvarAuth } from '../services/api'
import cachorroIdle from '../assets/sprites/cachorro/cachorro-idle.png'
import styles from './Auth.module.scss'

export default function Login() {
  const navigate = useNavigate()
  const [tipoAcesso, setTipoAcesso] = useState('usuario')
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
      const papel = res.data?.papel ?? 'usuario'
      if (tipoAcesso === 'admin' && papel !== 'admin') {
        throw new Error('Este login não pertence a um administrador')
      }
      if (tipoAcesso === 'usuario' && papel !== 'usuario') {
        throw new Error('Use a opção de acesso administrativo para esta conta')
      }
      salvarAuth(email, senha, res.data)
      navigate(papel === 'admin' ? '/admin' : '/home')
    } catch (err) {
      setErro(err.response?.data?.detail ?? err.message ?? 'Falha no login')
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

        <label className={styles.label}>Tipo de acesso</label>
        <div className={styles.grupoOpcoes}>
          <button
            className={tipoAcesso === 'usuario' ? styles.opcaoAtiva : styles.opcao}
            type="button"
            onClick={() => setTipoAcesso('usuario')}
          >
            Usuário comum
          </button>
          <button
            className={tipoAcesso === 'admin' ? styles.opcaoAtiva : styles.opcao}
            type="button"
            onClick={() => setTipoAcesso('admin')}
          >
            Administrador
          </button>
        </div>

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
        </div>
      </form>
    </div>
  )
}
