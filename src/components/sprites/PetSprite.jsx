import { getClasseAnimacao, getSpriteParaEstado } from '../../services/sprites'
import styles from './PetSprite.module.scss'

export function PetSprite({ especie, estado = 'idle', tamanho = 'm' }) {
  const src = getSpriteParaEstado(especie, estado)
  const classeAnim = getClasseAnimacao(estado)

  return (
    <div className={`${styles.container} ${styles[tamanho]}`}>
      <img
        src={src}
        alt={`${especie} ${estado}`}
        className={`${styles.sprite} ${styles[classeAnim]}`}
        draggable={false}
      />
      {estado === 'com_fome' && (
        <span className={styles.bolhaComida}>🍖</span>
      )}
    </div>
  )
}
