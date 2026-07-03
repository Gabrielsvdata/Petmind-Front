import { CATEGORIAS, EVENTOS } from '../../services/eventos'
import styles from './SeletorEventos.module.scss'

export function SeletorEventos({ selecionados, onChange }) {
  const toggleEvento = (id) => {
    if (selecionados.includes(id)) {
      onChange(selecionados.filter((e) => e !== id))
    } else {
      onChange([...selecionados, id])
    }
  }

  return (
    <div className={styles.container}>
      <label className={styles.titulo}>
        O que aconteceu hoje? <span className={styles.opcional}>(opcional)</span>
      </label>

      {Object.entries(CATEGORIAS).map(([cat, info]) => (
        <div key={cat} className={styles.categoria}>
          <span className={styles.categoriaLabel} style={{ color: info.cor }}>
            {info.label}
          </span>
          <div className={styles.eventos}>
            {EVENTOS.filter((e) => e.categoria === cat).map((evento) => (
              <button
                key={evento.id}
                type="button"
                onClick={() => toggleEvento(evento.id)}
                className={`${styles.eventoBtn} ${selecionados.includes(evento.id) ? styles.ativo : ''}`}
              >
                {evento.icone} {evento.label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
