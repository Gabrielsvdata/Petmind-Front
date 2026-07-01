import styles from './DashboardResumo.module.scss'

function CartaoMetrica({ valor, label, destaque }) {
  return (
    <div className={`${styles.cartao} ${destaque ? styles.destaque : ''}`}>
      <span className={styles.valor}>{valor}</span>
      <span className={styles.label}>{label}</span>
    </div>
  )
}

export function DashboardResumo({ pets, ultimosRegistros }) {
  const total       = pets.length
  const comRegistro = Object.keys(ultimosRegistros).length
  const positivos   = pets.filter((p) =>
    ['feliz', 'animado'].includes(ultimosRegistros[p.id]?.estado_emocional)
  ).length
  const atencao     = pets.filter((p) =>
    ['triste', 'com_fome'].includes(ultimosRegistros[p.id]?.estado_emocional)
  ).length

  return (
    <section className={styles.painel}>
      <h2 className={styles.titulo}>📊 Resumo Geral</h2>
      <div className={styles.grid}>
        <CartaoMetrica valor={total}       label="Pets" />
        <CartaoMetrica valor={comRegistro} label="Com registro" />
        <CartaoMetrica valor={positivos}   label="Felizes" />
        <CartaoMetrica valor={atencao}     label="Atenção" destaque={atencao > 0} />
      </div>
    </section>
  )
}
