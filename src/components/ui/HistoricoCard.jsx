import { Badge } from './Badge'
import { EVENTOS, extrairEventos } from '../../services/eventos'
import { calcularEstado } from '../../services/api'
import styles from './HistoricoCard.module.scss'

function infoEvento(id) {
  return EVENTOS.find((e) => e.id === id)
}

export function HistoricoCard({ registro, index }) {
  const eventos = extrairEventos(registro.observacoes)
  const estado = calcularEstado(
    registro.agitacao,
    registro.sono,
    registro.apetite,
    registro.humor
  )

  return (
    <article className={styles.registroCard}>
      <div className={styles.registroData}>
        {registro.data_hora
          ? new Date(registro.data_hora).toLocaleDateString('pt-BR')
          : `Registro ${index + 1}`}
      </div>

      <div className={styles.registroMetricas}>
        <span>😤 {registro.agitacao}</span>
        <span>😴 {registro.sono}</span>
        <span>🍖 {registro.apetite}</span>
        <span>😊 {registro.humor}</span>
      </div>

      <Badge estado={estado} />

      {eventos.length > 0 && (
        <div className={styles.eventosLinha}>
          {eventos.map((ev) => {
            const info = infoEvento(ev)
            if (!info) return null
            return (
              <span key={ev} className={styles.eventoPill}>
                {info.icone} {info.label}
              </span>
            )
          })}
        </div>
      )}
    </article>
  )
}
