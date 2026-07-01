import styles from './Busca.module.scss'

export function Busca({ valor, onChange }) {
  return (
    <div className={styles.container}>
      <span className={styles.icone}>🔍</span>
      <input
        className={styles.input}
        type="text"
        placeholder="Buscar pet..."
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Buscar pet"
      />
    </div>
  )
}
