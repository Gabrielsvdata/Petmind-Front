import styles from './OrdenacaoSelector.module.scss'

const OPCOES = [
  { valor: 'recente',  label: 'Mais recente' },
  { valor: 'nome',     label: 'Nome A-Z' },
  { valor: 'atencao',  label: 'Precisa de atenção' },
]

export function OrdenacaoSelector({ valor, onChange }) {
  return (
    <div className={styles.container}>
      <span className={styles.label}>Ordenar por:</span>
      <div className={styles.opcoes}>
        {OPCOES.map((op) => (
          <button
            key={op.valor}
            className={`${styles.opcao} ${valor === op.valor ? styles.ativo : ''}`}
            onClick={() => onChange(op.valor)}
          >
            {op.label}
          </button>
        ))}
      </div>
    </div>
  )
}
