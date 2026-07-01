import { Link } from 'react-router-dom'
import styles from './Breadcrumb.module.scss'

export function Breadcrumb({ itens }) {
  return (
    <nav className={styles.nav} aria-label="Navegação">
      {itens.map((item, i) => (
        <span key={i} className={styles.item}>
          {i > 0 && <span className={styles.sep}>›</span>}
          {item.to ? (
            <Link to={item.to} className={styles.link}>{item.label}</Link>
          ) : (
            <span className={styles.atual}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
