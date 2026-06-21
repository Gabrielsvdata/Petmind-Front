import styles from './SeletorComportamento.module.scss'

const OPCOES = {
  agitacao: [
    { valor: 1, emoji: '😴', label: 'Muito calmo' },
    { valor: 2, emoji: '🙂', label: 'Calmo' },
    { valor: 3, emoji: '😐', label: 'Normal' },
    { valor: 4, emoji: '😤', label: 'Agitado' },
    { valor: 5, emoji: '🌪️', label: 'Muito agitado' },
  ],
  sono: [
    { valor: 1, emoji: '😵', label: 'Péssimo' },
    { valor: 2, emoji: '😪', label: 'Ruim' },
    { valor: 3, emoji: '😐', label: 'Normal' },
    { valor: 4, emoji: '😴', label: 'Bom' },
    { valor: 5, emoji: '🌙', label: 'Ótimo' },
  ],
  apetite: [
    { valor: 1, emoji: '🚫', label: 'Recusou' },
    { valor: 2, emoji: '😒', label: 'Pouco' },
    { valor: 3, emoji: '😐', label: 'Normal' },
    { valor: 4, emoji: '🍖', label: 'Bastante' },
    { valor: 5, emoji: '🍽️', label: 'Devorou' },
  ],
  humor: [
    { valor: 1, emoji: '😢', label: 'Triste' },
    { valor: 2, emoji: '😟', label: 'Abatido' },
    { valor: 3, emoji: '😐', label: 'Neutro' },
    { valor: 4, emoji: '😊', label: 'Alegre' },
    { valor: 5, emoji: '🤩', label: 'Eufórico' },
  ],
}

const TITULOS = {
  agitacao: 'Agitação',
  sono:     'Sono',
  apetite:  'Apetite',
  humor:    'Humor',
}

export function SeletorComportamento({ campo, value, onChange }) {
  const opcoes = OPCOES[campo] ?? []

  return (
    <fieldset className={styles.grupo}>
      <legend className={styles.legenda}>{TITULOS[campo]}</legend>
      <div className={styles.opcoes}>
        {opcoes.map((op) => {
          const ativo = value === op.valor
          return (
            <button
              key={op.valor}
              type="button"
              onClick={() => onChange(op.valor)}
              className={`${styles.opcao} ${ativo ? styles.ativo : ''}`}
              aria-pressed={ativo}
              title={op.label}
            >
              <span className={styles.emoji}>{op.emoji}</span>
              <span className={styles.label}>{op.label}</span>
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}
