import { useEffect, useMemo, useState } from 'react'

import { adminEstatisticas } from '../../services/api'
import styles from './AdminDashboard.module.scss'

const especieEmoji = {
  cachorro: '🐶',
  gato: '🐱',
  hamster: '🐹',
  coelho: '🐰',
}

const estadoEmoji = {
  feliz: '😊',
  agitado: '😤',
  sonolento: '😴',
  com_fome: '🍖',
  triste: '😢',
  animado: '✨',
}

function BarraResumo({ rotulo, valor, maior, emoji }) {
  const largura = maior > 0 ? `${Math.max((valor / maior) * 100, 16)}%` : '16%'

  return (
    <div className={styles.barraLinha}>
      <div className={styles.barraRotulo}>
        <span>{emoji}</span>
        <span>{rotulo}</span>
      </div>
      <div className={styles.barraTrilha}>
        <div className={styles.barraValor} style={{ width: largura }} />
      </div>
      <strong className={styles.barraNumero}>{valor}</strong>
    </div>
  )
}

export default function AdminDashboard() {
  const [dados, setDados] = useState(null)
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    async function carregar() {
      setLoading(true)
      setErro('')

      try {
        const res = await adminEstatisticas()
        setDados(res.data)
      } catch (err) {
        setErro(err.response?.data?.detail ?? 'Não foi possível carregar o dashboard.')
      } finally {
        setLoading(false)
      }
    }

    carregar()
  }, [])

  const maiorEspecie = useMemo(() => {
    if (!dados) return 0
    return Math.max(...Object.values(dados.pets_por_especie), 0)
  }, [dados])

  const maiorEstado = useMemo(() => {
    if (!dados) return 0
    return Math.max(...Object.values(dados.estados_mais_comuns), 0)
  }, [dados])

  if (loading) {
    return <div className={styles.estadoTela}>Carregando estatísticas...</div>
  }

  if (erro) {
    return <div className={styles.estadoTela}>{erro}</div>
  }

  if (!dados) {
    return <div className={styles.estadoTela}>Nenhum dado disponível.</div>
  }

  return (
    <div className={styles.pagina}>
      <div className={styles.topo}>
        <h2 className={styles.titulo}>Dashboard</h2>
        <p className={styles.subtitulo}>Visão geral do uso do PetMind.</p>
      </div>

      <section className={styles.cardsGrid}>
        <article className={styles.cardResumo}>
          <strong className={styles.numeroResumo}>{dados.total_usuarios}</strong>
          <span className={styles.rotuloResumo}>Usuários</span>
        </article>
        <article className={styles.cardResumo}>
          <strong className={styles.numeroResumo}>{dados.total_pets}</strong>
          <span className={styles.rotuloResumo}>Pets</span>
        </article>
        <article className={styles.cardResumo}>
          <strong className={styles.numeroResumo}>{dados.total_registros}</strong>
          <span className={styles.rotuloResumo}>Registros</span>
        </article>
        <article className={styles.cardResumo}>
          <strong className={styles.numeroResumo}>{dados.usuarios_ativos}</strong>
          <span className={styles.rotuloResumo}>Ativos</span>
        </article>
      </section>

      <section className={styles.gridAnalitico}>
        <article className={styles.cardPainel}>
          <h3 className={styles.cardTitulo}>Pets por espécie</h3>
          <div className={styles.barras}>
            {Object.entries(dados.pets_por_especie).map(([especie, valor]) => (
              <BarraResumo
                key={especie}
                rotulo={especie}
                valor={valor}
                maior={maiorEspecie}
                emoji={especieEmoji[especie] ?? '🐾'}
              />
            ))}
          </div>
        </article>

        <article className={styles.cardPainel}>
          <h3 className={styles.cardTitulo}>Estados mais comuns</h3>
          <div className={styles.barras}>
            {Object.entries(dados.estados_mais_comuns).map(([estado, valor]) => (
              <BarraResumo
                key={estado}
                rotulo={estado.replace('_', ' ')}
                valor={valor}
                maior={maiorEstado}
                emoji={estadoEmoji[estado] ?? '🐾'}
              />
            ))}
          </div>
        </article>
      </section>

      <section className={styles.cardPainel}>
        <h3 className={styles.cardTitulo}>Movimento recente</h3>
        <p className={styles.subtituloPainel}>
          Registros na última semana: <strong>{dados.registros_ultima_semana}</strong>
        </p>
      </section>
    </div>
  )
}