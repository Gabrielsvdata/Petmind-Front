import styles from './FiltrosHistorico.module.scss'

const ESTADOS = [
  { valor: 'todos',    label: 'Todos' },
  { valor: 'feliz',    label: '😊 Feliz' },
  { valor: 'agitado',  label: '😤 Agitado' },
  { valor: 'sonolento',label: '😴 Sonolento' },
  { valor: 'com_fome', label: '🍖 Com fome' },
  { valor: 'triste',   label: '😢 Triste' },
  { valor: 'animado',  label: '✨ Animado' },
]

const PERIODOS = [
  { valor: 'todos',  label: 'Todos' },
  { valor: 'semana', label: 'Última semana' },
  { valor: 'mes',    label: 'Último mês' },
]

export function FiltrosHistorico({
  filtroEstado,    setFiltroEstado,
  filtroCopa,      setFiltroCopa,
  filtroPeriodo,   setFiltroPeriodo,
}) {
  return (
    <div className={styles.container}>

      <div className={styles.grupo}>
        <span className={styles.grupoLabel}>Estado</span>
        <div className={styles.pills}>
          {ESTADOS.map((e) => (
            <button
              key={e.valor}
              className={`${styles.pill} ${filtroEstado === e.valor ? styles.ativo : ''}`}
              onClick={() => setFiltroEstado(e.valor)}
            >
              {e.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.grupo}>
        <span className={styles.grupoLabel}>Período</span>
        <div className={styles.pills}>
          {PERIODOS.map((p) => (
            <button
              key={p.valor}
              className={`${styles.pill} ${filtroPeriodo === p.valor ? styles.ativo : ''}`}
              onClick={() => setFiltroPeriodo(p.valor)}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.grupo}>
        <button
          className={`${styles.pill} ${filtroCopa ? styles.ativo : ''}`}
          onClick={() => setFiltroCopa((v) => !v)}
        >
          ⚽ Apenas jogos da Copa
        </button>
      </div>

    </div>
  )
}
