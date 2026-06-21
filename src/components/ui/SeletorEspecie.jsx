import { PetSprite } from '../sprites/PetSprite'
import styles        from './SeletorEspecie.module.scss'

const ESPECIES = [
  { valor: 'cachorro', label: 'Cachorro', cor: '#E8651A' },
  { valor: 'gato',     label: 'Gato',     cor: '#8A8A9A' },
  { valor: 'hamster',  label: 'Hamster',  cor: '#E8845A' },
  { valor: 'coelho',   label: 'Coelho',   cor: '#D4C4A0' },
]

export function SeletorEspecie({ value, onChange }) {
  return (
    <div className={styles.grid}>
      {ESPECIES.map((e) => {
        const ativo = value === e.valor
        return (
          <button
            key={e.valor}
            type="button"
            onClick={() => onChange(e.valor)}
            className={`${styles.card} ${ativo ? styles.ativo : ''}`}
            style={{ '--cor-especie': e.cor }}
            aria-pressed={ativo}
          >
            <PetSprite especie={e.valor} estado={ativo ? 'animado' : 'feliz'} tamanho="m" />
            <span className={styles.label}>{e.label}</span>
          </button>
        )
      })}
    </div>
  )
}
