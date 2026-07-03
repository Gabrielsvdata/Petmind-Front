import { useNavigate } from 'react-router-dom'
import { PetSprite } from '../sprites/PetSprite'
import { Badge }     from './Badge'
import styles        from './CardPet.module.scss'

export function CardPet({ pet, estado, precisaAtencao = false }) {
  const navigate = useNavigate()

  return (
    <article
      className={`${styles.card} ${precisaAtencao ? styles.atencao : ''}`}
      onClick={() => navigate(`/pets/${pet.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/pets/${pet.id}`)}
    >
      <div className={styles.sprite}>
        <PetSprite especie={pet.especie} estado={estado ?? 'feliz'} tamanho="m" />
      </div>

      <div className={styles.info}>
        <h3 className={styles.nome}>{pet.nome}</h3>
        <p className={styles.especie}>{pet.especie} · {pet.raca}</p>
        <div className={styles.badgeRow}>
          {precisaAtencao ? (
            <span className={styles.badgeAlerta}>⚠️ Precisa de atenção</span>
          ) : (
            <Badge estado={estado} />
          )}
        </div>
      </div>
    </article>
  )
}
