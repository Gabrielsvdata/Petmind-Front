import { useState, useEffect } from 'react'
import styles from './MenuAcoesRapidas.module.scss'

export function MenuAcoesRapidas({ onNovoPet, onRegistrar, onAnalisar, temPets }) {
  const [aberto, setAberto] = useState(false)

  useEffect(() => {
    if (!aberto) return
    function fechar() { setAberto(false) }
    document.addEventListener('click', fechar)
    return () => document.removeEventListener('click', fechar)
  }, [aberto])

  return (
    <div className={styles.fab} onClick={(e) => e.stopPropagation()}>
      {aberto && (
        <div className={styles.opcoes}>
          {temPets && (
            <>
              <button
                className={styles.opcao}
                onClick={() => { setAberto(false); onAnalisar() }}
              >
                🧠 Analisar com IA
              </button>
              <button
                className={styles.opcao}
                onClick={() => { setAberto(false); onRegistrar() }}
              >
                📋 Registrar comportamento
              </button>
            </>
          )}
          <button
            className={styles.opcao}
            onClick={() => { setAberto(false); onNovoPet() }}
          >
            ➕ Novo pet
          </button>
        </div>
      )}
      <button
        className={`${styles.botaoPrincipal} ${aberto ? styles.aberto : ''}`}
        onClick={() => setAberto((v) => !v)}
        aria-label="Ações rápidas"
      >
        +
      </button>
    </div>
  )
}
