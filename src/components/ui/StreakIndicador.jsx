import styles from './StreakIndicador.module.scss'

function calcularStreak(registros) {
  if (!registros.length) return 0
  const dias = new Set(
    registros.map((r) => {
      const d = new Date(r.data_hora)
      return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
    })
  )
  const hoje = new Date()
  let streak = 0
  const dia = new Date(hoje)
  while (true) {
    const chave = `${dia.getFullYear()}-${dia.getMonth()}-${dia.getDate()}`
    if (dias.has(chave)) {
      streak++
      dia.setDate(dia.getDate() - 1)
    } else {
      break
    }
  }
  return streak
}

function diasDesdeUltimo(registros) {
  if (!registros.length) return null
  const ultimo = new Date(
    Math.max(...registros.map((r) => new Date(r.data_hora).getTime()))
  )
  const hoje = new Date()
  return Math.floor((hoje - ultimo) / (1000 * 60 * 60 * 24))
}

export function StreakIndicador({ registros }) {
  if (!registros.length) return null

  const streak = calcularStreak(registros)
  const dias   = diasDesdeUltimo(registros)

  if (streak >= 1) {
    const dourado = streak >= 7
    return (
      <span className={`${styles.streak} ${dourado ? styles.dourado : styles.ativo}`}>
        🔥 {streak} dia{streak > 1 ? 's' : ''} seguido{streak > 1 ? 's' : ''} de registro
        {dourado && ' 🏆'}
      </span>
    )
  }

  return (
    <span className={`${styles.streak} ${styles.aviso}`}>
      ⚠️ Último registro há {dias} dia{dias !== 1 ? 's' : ''}
    </span>
  )
}
