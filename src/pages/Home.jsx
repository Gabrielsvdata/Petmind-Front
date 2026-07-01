import { useEffect, useState, useMemo } from 'react'
import { useNavigate }                  from 'react-router-dom'
import { listarPets, ultimoRegistro }   from '../services/api'
import { CardPet }                      from '../components/ui/CardPet'
import { PetSprite }                    from '../components/sprites/PetSprite'
import { Busca }                        from '../components/ui/Busca'
import { DashboardResumo }              from '../components/ui/DashboardResumo'
import { MenuAcoesRapidas }             from '../components/ui/MenuAcoesRapidas'
import { OrdenacaoSelector }            from '../components/ui/OrdenacaoSelector'
import styles                           from './Home.module.scss'

const BADGES_KEY = 'petmind_badges'

function getBadges() {
  try { return JSON.parse(localStorage.getItem(BADGES_KEY)) ?? {} }
  catch { return {} }
}

export default function Home() {
  const [pets, setPets]                     = useState([])
  const [ultimosRegistros, setUltimos]      = useState({})
  const [loading, setLoading]               = useState(true)
  const [busca, setBusca]                   = useState('')
  const [ordenacao, setOrdenacao]           = useState('recente')
  const navigate                            = useNavigate()
  const badges                              = getBadges()

  useEffect(() => {
    listarPets()
      .then(async (res) => {
        setPets(res.data)
        const mapa = {}
        await Promise.allSettled(
          res.data.map(async (p) => {
            try {
              const r = await ultimoRegistro(p.id)
              mapa[p.id] = {
                estado_emocional: r.data?.estado_emocional ?? 'feliz',
                data_hora:        r.data?.data_hora ?? null,
              }
            } catch {
              /* pet sem registros — não entra no mapa */
            }
          })
        )
        setUltimos(mapa)
      })
      .catch(() => setPets([]))
      .finally(() => setLoading(false))
  }, [])

  const petsOrdenados = useMemo(() => {
    const ATENCAO = ['triste', 'com_fome']
    let lista = pets.filter((p) =>
      p.nome.toLowerCase().includes(busca.toLowerCase())
    )
    if (ordenacao === 'nome') {
      lista = [...lista].sort((a, b) => a.nome.localeCompare(b.nome))
    } else if (ordenacao === 'atencao') {
      lista = [...lista].sort((a, b) => {
        const aA = ATENCAO.includes(ultimosRegistros[a.id]?.estado_emocional) ? 0 : 1
        const bA = ATENCAO.includes(ultimosRegistros[b.id]?.estado_emocional) ? 0 : 1
        return aA - bA
      })
    } else {
      // recente — pets com data_hora mais recente primeiro
      lista = [...lista].sort((a, b) => {
        const ta = ultimosRegistros[a.id]?.data_hora ? new Date(ultimosRegistros[a.id].data_hora).getTime() : 0
        const tb = ultimosRegistros[b.id]?.data_hora ? new Date(ultimosRegistros[b.id].data_hora).getTime() : 0
        return tb - ta
      })
    }
    return lista
  }, [pets, busca, ordenacao, ultimosRegistros])

  const primeiroPetId = pets[0]?.id

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
          <>
            <DashboardResumo pets={pets} ultimosRegistros={ultimosRegistros} />

            <div className={styles.controles}>
              <Busca valor={busca} onChange={setBusca} />
              <OrdenacaoSelector valor={ordenacao} onChange={setOrdenacao} />
            </div>

            {petsOrdenados.length === 0 ? (
              <p className={styles.semResultado}>Nenhum pet encontrado</p>
            ) : (
              <div className={styles.grid}>
                {petsOrdenados.map((pet) => (
                  <CardPet key={pet.id} pet={pet} estado={ultimosRegistros[pet.id]?.estado_emocional} />
                ))}
              </div>
            )}
          </>
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

      <MenuAcoesRapidas
        temPets={pets.length > 0}
        onNovoPet={() => navigate('/cadastrar')}
        onRegistrar={() => primeiroPetId && navigate(`/pets/${primeiroPetId}/registrar`)}
        onAnalisar={() => primeiroPetId && navigate(`/pets/${primeiroPetId}`)}
      />
    </div>
  )
}
