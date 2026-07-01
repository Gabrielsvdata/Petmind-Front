import { useState, useEffect }    from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { usePet }                 from '../hooks/usePet'
import { calcularEstado }         from '../services/api'
import { PetSprite }              from '../components/sprites/PetSprite'
import { Badge }                  from '../components/ui/Badge'
import { Botao }                  from '../components/ui/Botao'
import { AnaliseIA }              from '../components/ui/AnaliseIA'
import { FiltrosHistorico }       from '../components/ui/FiltrosHistorico'
import { StreakIndicador }        from '../components/ui/StreakIndicador'
import { Breadcrumb }             from '../components/ui/Breadcrumb'
import styles                     from './PerfilPet.module.scss'

const BADGES_KEY = 'petmind_badges'

function MetricaBar({ label, valor }) {
  return (
    <div className={styles.metrica}>
      <span className={styles.metricaLabel}>{label}</span>
      <div className={styles.barraContainer}>
        {[1, 2, 3, 4, 5].map((n) => (
          <div
            key={n}
            className={`${styles.barraSeg} ${n <= valor ? styles.barraAtiva : ''}`}
          />
        ))}
      </div>
      <span className={styles.metricaValor}>{valor ?? '—'}/5</span>
    </div>
  )
}

export default function PerfilPet() {
  const { id }                        = useParams()
  const navigate                      = useNavigate()
  const { pet, registros, ultimo, analise, loading, error, analisar } = usePet(id)
  const [analisando, setAnalisando]   = useState(false)
  const [analiseAtual, setAnalise]    = useState(null)
  const [filtroEstado, setFiltroEstado]   = useState('todos')
  const [filtroCopa,   setFiltroCopa]     = useState(false)
  const [filtroPeriodo, setFiltroPeriodo] = useState('todos')

  const estado = ultimo?.estado_emocional ?? 'feliz'
  const ult    = registros[0]

  function verificarPeriodo(dataHora, periodo) {
    if (periodo === 'todos') return true
    const data  = new Date(dataHora)
    const hoje  = new Date()
    const diff  = (hoje - data) / (1000 * 60 * 60 * 24)
    if (periodo === 'semana') return diff <= 7
    if (periodo === 'mes')    return diff <= 30
    return true
  }

  const registrosFiltrados = registros.filter((r) => {
    const estadoReg  = calcularEstado(r.agitacao, r.sono, r.apetite, r.humor)
    const passaEstado  = filtroEstado === 'todos' || estadoReg === filtroEstado
    const passaCopa    = !filtroCopa || r.observacoes?.includes('⚽')
    const passaPeriodo = verificarPeriodo(r.data_hora, filtroPeriodo)
    return passaEstado && passaCopa && passaPeriodo
  })

  // Desbloquear badge na primeira visita com registros
  useEffect(() => {
    if (registros.length > 0) {
      try {
        const badges = JSON.parse(localStorage.getItem(BADGES_KEY)) ?? {}
        if (!badges.primeiroRegistro) {
          badges.primeiroRegistro = true
          localStorage.setItem(BADGES_KEY, JSON.stringify(badges))
        }
        if (registros.length >= 7 && !badges.sete) {
          badges.sete = true
          localStorage.setItem(BADGES_KEY, JSON.stringify(badges))
        }
        if (registros.length >= 30 && !badges.trinta) {
          badges.trinta = true
          localStorage.setItem(BADGES_KEY, JSON.stringify(badges))
        }
      } catch { /* ignore */ }
    }
  }, [registros])

  async function handleAnalisar() {
    setAnalisando(true)
    try {
      const res = await analisar()
      setAnalise(res)
      // Badge especialista
      try {
        const badges = JSON.parse(localStorage.getItem(BADGES_KEY)) ?? {}
        badges.especialista = true
        localStorage.setItem(BADGES_KEY, JSON.stringify(badges))
      } catch { /* ignore */ }
    } finally {
      setAnalisando(false)
    }
  }

  if (loading && !pet) {
    return (
      <div className={styles.centrado}>
        <PetSprite especie="cachorro" estado="animado" tamanho="m" />
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.centrado}>
        <p className={styles.erro}>{error}</p>
        <Botao variante="secundario" onClick={() => navigate('/')}>← Voltar</Botao>
      </div>
    )
  }

  if (!pet) return null

  return (
    <div className={styles.pagina}>
      <Breadcrumb itens={[
        { label: 'Home', to: '/' },
        { label: pet?.nome ?? '...' },
      ]} />

      <header className={styles.header}>
        <button className={styles.voltar} onClick={() => navigate('/')} aria-label="Voltar">←</button>
        <h1 className={styles.titulo}>{pet.nome}</h1>
      </header>

      <main className={styles.main}>
        {/* Sprite grande + estado */}
        <section className={styles.hero}>
          <PetSprite especie={pet.especie} estado={estado} tamanho="g" />
          <div className={styles.heroInfo}>
            <h2 className={styles.nomeHero}>{pet.nome}</h2>
            <p className={styles.especiePet}>{pet.especie} · {pet.raca}</p>
            <Badge estado={estado} />
            <StreakIndicador registros={registros} />
          </div>
        </section>

        {/* Métricas do último registro */}
        {ult && (
          <section className={styles.metricas}>
            <h3 className={styles.secaoTitulo}>Último registro</h3>
            <div className={styles.metricasGrid}>
              <MetricaBar label="Agitação" valor={ult.agitacao} />
              <MetricaBar label="Sono"     valor={ult.sono} />
              <MetricaBar label="Apetite"  valor={ult.apetite} />
              <MetricaBar label="Humor"    valor={ult.humor} />
            </div>
          </section>
        )}

        {/* Ações */}
        <div className={styles.acoes}>
          <Botao variante="primario" onClick={() => navigate(`/pets/${id}/registrar`)}>
            📝 Registrar hoje
          </Botao>
          <Botao variante="secundario" onClick={handleAnalisar} disabled={analisando || registros.length === 0}>
            🧠 Analisar com IA
          </Botao>
        </div>

        {/* Análise IA */}
        {(analisando || analiseAtual || analise) && (
          <AnaliseIA
            analise={analiseAtual ?? analise}
            carregando={analisando}
          />
        )}

        {/* Histórico */}
        {registros.length > 0 && (
          <section className={styles.historico}>
            <h3 className={styles.secaoTitulo}>Histórico</h3>

            <FiltrosHistorico
              filtroEstado={filtroEstado}   setFiltroEstado={setFiltroEstado}
              filtroCopa={filtroCopa}       setFiltroCopa={setFiltroCopa}
              filtroPeriodo={filtroPeriodo} setFiltroPeriodo={setFiltroPeriodo}
            />

            {registrosFiltrados.length === 0 ? (
              <p className={styles.semResultado}>Nenhum registro encontrado com esses filtros.</p>
            ) : (
              <div className={styles.historicoLista}>
                {registrosFiltrados.slice(0, 10).map((r, i) => (
                  <article key={r.id ?? i} className={styles.registroCard}>
                    <div className={styles.registroData}>
                      {r.data_hora ? new Date(r.data_hora).toLocaleDateString('pt-BR') : `Registro ${i + 1}`}
                    </div>
                    <div className={styles.registroMetricas}>
                      <span>😤 {r.agitacao}</span>
                      <span>😴 {r.sono}</span>
                      <span>🍖 {r.apetite}</span>
                      <span>😊 {r.humor}</span>
                    </div>
                    <Badge estado={calcularEstado(r.agitacao, r.sono, r.apetite, r.humor)} />
                  </article>
                ))}
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  )
}
