import { useEffect, useState } from 'react'
import { useNavigate }         from 'react-router-dom'
import { listarPets }          from '../services/api'
import { ultimoRegistro }      from '../services/api'
import { CardPet }             from '../components/ui/CardPet'
import { PetSprite }           from '../components/sprites/PetSprite'
import styles                  from './Home.module.scss'

const BADGES_KEY = 'petmind_badges'

function getBadges() {
  try { return JSON.parse(localStorage.getItem(BADGES_KEY)) ?? {} }
  catch { return {} }
}

export default function Home() {
  const [pets, setPets]         = useState([])
  const [estados, setEstados]   = useState({})
  const [loading, setLoading]   = useState(true)
  const navigate                = useNavigate()
  const badges                  = getBadges()

  useEffect(() => {
    listarPets()
      .then(async (res) => {
        setPets(res.data)
        const estadosMap = {}
        await Promise.allSettled(
          res.data.map(async (p) => {
            try {
              const r = await ultimoRegistro(p.id)
              estadosMap[p.id] = r.data?.estado_emocional ?? 'feliz'
            } catch {
              estadosMap[p.id] = 'feliz'
            }
          })
        )
        setEstados(estadosMap)
      })
      .catch(() => setPets([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className={styles.pagina}>
      <header className={styles.header}>
        <h1 className={styles.logo}>🐾 PETMIND</h1>
        <p className={styles.tagline}>Monitoramento emocional para seu pet</p>
      </header>

      <main className={styles.main}>
        {loading ? (
          <div className={styles.carregando}>
            <PetSprite especie="cachorro" estado="animado" tamanho="m" />
            <p className={styles.carregandoTexto}>Carregando…</p>
          </div>
        ) : pets.length === 0 ? (
          <div className={styles.vazio}>
            <PetSprite especie="cachorro" estado="triste" tamanho="g" />
            <p className={styles.vazioTexto}>Nenhum pet cadastrado</p>
            <p className={styles.vazioSub}>Adicione seu primeiro companheiro!</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {pets.map((pet) => (
              <CardPet key={pet.id} pet={pet} estado={estados[pet.id]} />
            ))}
          </div>
        )}

        {/* Badges desbloqueados */}
        {Object.keys(badges).length > 0 && (
          <section className={styles.badgesSection}>
            <h2 className={styles.badgesTitulo}>Conquistas</h2>
            <div className={styles.badgesList}>
              {badges.primeiroRegistro && <span title="Primeiro Registro">🐾</span>}
              {badges.sete && <span title="7 Dias Seguidos">📅</span>}
              {badges.trinta && <span title="30 Dias Seguidos">🏆</span>}
              {badges.especialista && <span title="Especialista PetMind">🧠</span>}
            </div>
          </section>
        )}
      </main>

      {/* FAB para cadastrar pet */}
      <button
        className={styles.fab}
        onClick={() => navigate('/cadastrar')}
        aria-label="Cadastrar novo pet"
      >
        +
      </button>
    </div>
  )
}
