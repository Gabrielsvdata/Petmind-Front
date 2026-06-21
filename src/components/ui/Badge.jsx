import styles from './Badge.module.scss'

const LABELS = {
  feliz:     '😊 Feliz',
  animado:   '🤩 Animado',
  agitado:   '😤 Agitado',
  sonolento: '😴 Sonolento',
  com_fome:  '🍖 Com fome',
  triste:    '😢 Triste',
}

export function Badge({ estado }) {
  if (!estado) return null
  return (
    <span className={`${styles.badge} ${styles[estado]}`}>
      {LABELS[estado] ?? estado}
    </span>
  )
}
