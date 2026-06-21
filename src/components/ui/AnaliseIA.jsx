import styles from './AnaliseIA.module.scss'

const ICONE_TENDENCIA = {
  melhorando: '↑',
  piorando:   '↓',
  'estável':  '→',
}

const COR_TENDENCIA = {
  melhorando: 'verde',
  piorando:   'vermelho',
  'estável':  'neutro',
}

const LABEL_CAMPO = {
  agitacao: 'Agitação',
  sono:     'Sono',
  apetite:  'Apetite',
  humor:    'Humor',
}

export function AnaliseIA({ analise, carregando }) {
  if (carregando) {
    return (
      <div className={styles.loading}>
        <span className={styles.spinner} />
        <p className={styles.loadingTexto}>Analisando padrões...</p>
      </div>
    )
  }

  if (!analise) return null

  return (
    <div className={styles.container}>

      {/* Header — Estado + Confiança */}
      <div className={styles.header}>
        <div className={styles.estadoBloco}>
          <span className={styles.estadoLabel}>Estado detectado</span>
          <span className={`${styles.estadoBadge} ${styles[analise.estado_predominante]}`}>
            {analise.estado_predominante.replace('_', ' ').toUpperCase()}
          </span>
        </div>
        <div className={styles.confiancaBloco}>
          <span className={styles.confiancaNumero}>{analise.confianca}%</span>
          <span className={styles.confiancaLabel}>confiança</span>
          <div className={styles.confiancaBarra}>
            <div
              className={styles.confiancaFill}
              style={{ width: `${analise.confianca}%` }}
            />
          </div>
        </div>
      </div>

      {/* Médias + Tendências */}
      <div className={styles.metricas}>
        <h4 className={styles.secaoTitulo}>Métricas do período</h4>
        <div className={styles.metricasGrid}>
          {Object.entries(analise.medias).map(([campo, valor]) => (
            <div key={campo} className={styles.metricaCard}>
              <span className={styles.metricaLabel}>{LABEL_CAMPO[campo]}</span>
              <div className={styles.metricaBarra}>
                <div
                  className={styles.metricaFill}
                  style={{ width: `${(valor / 5) * 100}%` }}
                />
              </div>
              <div className={styles.metricaRodape}>
                <span className={styles.metricaValor}>{valor}/5</span>
                <span className={`${styles.tendencia} ${styles[COR_TENDENCIA[analise.tendencias[campo]]]}`}>
                  {ICONE_TENDENCIA[analise.tendencias[campo]]} {analise.tendencias[campo]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alertas */}
      {analise.alertas?.length > 0 && (
        <div className={styles.alertas}>
          <h4 className={styles.secaoTitulo}>⚠️ Alertas detectados</h4>
          {analise.alertas.map((alerta, i) => (
            <div key={i} className={styles.alertaItem}>
              {alerta}
            </div>
          ))}
        </div>
      )}

      {/* Diagnóstico */}
      <div className={styles.diagnostico}>
        <h4 className={styles.secaoTitulo}>🔍 Diagnóstico</h4>
        <p className={styles.diagnosticoTexto}>{analise.diagnostico}</p>
      </div>

      {/* Recomendação */}
      <div className={styles.recomendacao}>
        <h4 className={styles.secaoTitulo}>✅ Recomendação</h4>
        <p className={styles.recomendacaoTexto}>{analise.recomendacao}</p>
      </div>

      {/* Rodapé */}
      <div className={styles.rodape}>
        📊 {analise.total_registros} registros analisados
      </div>
    </div>
  )
}
