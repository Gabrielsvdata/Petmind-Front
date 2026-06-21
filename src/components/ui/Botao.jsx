import styles from './Botao.module.scss'

export function Botao({ children, variante = 'primario', onClick, type = 'button', disabled = false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.botao} ${styles[variante]} ${disabled ? styles.desativado : ''}`}
    >
      {children}
    </button>
  )
}
