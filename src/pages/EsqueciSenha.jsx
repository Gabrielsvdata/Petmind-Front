import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { redefinirSenha } from '../services/api'
import styles from './Auth.module.scss'

export default function EsqueciSenha() {
  const navigate = useNavigate()
  const [senhaAntiga, setSenhaAntiga] = useState('')
  const [novaSenha, setNovaSenha] = useState('')
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState(null)
  const [loading, setLoading] = useState(false)
  const [sucesso, setSucesso] = useState(false)

  async function handleRedefinir(e) {
    e.preventDefault()
    setErro(null)
    setMensagem('')
    if (novaSenha !== confirmarNovaSenha) {
      setErro('Confirmação de senha não confere')
      return
    }

    setLoading(true)
    try {
      const res = await redefinirSenha({
        senha_antiga: senhaAntiga,
        nova_senha: novaSenha,
      })
      setMensagem(res.data.mensagem)
      setSucesso(true)
      setTimeout(() => navigate('/login'), 1300)
    } catch (err) {
      setErro(err.response?.data?.detail ?? 'Falha ao trocar senha')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.pagina}>
      <div className={styles.card}>
        <h1 className={styles.titulo}>Trocar senha</h1>

        <form onSubmit={handleRedefinir} className={styles.blocoForm}>
          <label className={styles.label} htmlFor="senhaAntiga">Senha antiga</label>
          <input id="senhaAntiga" className={styles.input} type="password" value={senhaAntiga} onChange={(e) => setSenhaAntiga(e.target.value)} required minLength={6} />

          <label className={styles.label} htmlFor="novaSenha">Nova senha</label>
          <input id="novaSenha" className={styles.input} type="password" value={novaSenha} onChange={(e) => setNovaSenha(e.target.value)} required minLength={6} />

          <label className={styles.label} htmlFor="confirmarNovaSenha">Confirmar nova senha</label>
          <input id="confirmarNovaSenha" className={styles.input} type="password" value={confirmarNovaSenha} onChange={(e) => setConfirmarNovaSenha(e.target.value)} required minLength={6} />

          <button className={styles.botaoSecundario} type="submit" disabled={loading}>
            {loading ? 'Processando...' : 'Trocar senha'}
          </button>
        </form>

        {mensagem && <p className={styles.ok}>{mensagem}</p>}
        {erro && <p className={styles.erro}>{erro}</p>}

        {sucesso && (
          <div className={styles.popupSucesso}>
            Senha trocada com sucesso! Redirecionando para login...
          </div>
        )}

        <div className={styles.links}>
          <Link to="/login">Voltar para login</Link>
        </div>
      </div>
    </div>
  )
}
