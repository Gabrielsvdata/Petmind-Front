import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { cadastrarAdmin, cadastrarUsuario } from '../services/api'
import styles from './Auth.module.scss'

const configuracaoPorTipo = {
  usuario: {
    titulo: 'Criar conta',
    acao: 'Cadastrar',
    carregando: 'Criando conta...',
    sucesso: 'Cadastro efetuado com sucesso! Redirecionando para login...',
    erro: 'Falha no cadastro',
    submit: cadastrarUsuario,
  },
  admin: {
    titulo: 'Cadastro administrativo',
    acao: 'Cadastrar admin',
    carregando: 'Criando acesso...',
    sucesso: 'Cadastro administrativo efetuado com sucesso! Redirecionando para login...',
    erro: 'Falha no cadastro administrativo',
    submit: cadastrarAdmin,
  },
}

export default function CadastroConta({ tipo = 'usuario' }) {
  const navigate = useNavigate()
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState(null)
  const [loading, setLoading] = useState(false)
  const [sucesso, setSucesso] = useState(false)

  const config = configuracaoPorTipo[tipo] ?? configuracaoPorTipo.usuario

  async function handleSubmit(e) {
    e.preventDefault()
    setErro(null)
    setLoading(true)
    try {
      await config.submit({ nome, email, senha })
      setSucesso(true)
      setTimeout(() => navigate('/login'), 1300)
    } catch (err) {
      setErro(err.response?.data?.detail ?? config.erro)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.pagina}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <h1 className={styles.titulo}>{config.titulo}</h1>

        <label className={styles.label} htmlFor="nome">Nome</label>
        <input id="nome" className={styles.input} type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />

        <label className={styles.label} htmlFor="email">E-mail</label>
        <input id="email" className={styles.input} type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label className={styles.label} htmlFor="senha">Senha</label>
        <input id="senha" className={styles.input} type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required minLength={6} />

        {erro && <p className={styles.erro}>{erro}</p>}

        <button className={tipo === 'admin' ? styles.botaoSecundario : styles.botao} type="submit" disabled={loading}>
          {loading ? config.carregando : config.acao}
        </button>

        {sucesso && (
          <div className={styles.popupSucesso}>
            {config.sucesso}
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