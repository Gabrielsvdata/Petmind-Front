import { useState }                from 'react'
import { useParams, useNavigate }  from 'react-router-dom'
import { calcularEstado }          from '../services/api'
import { PetSprite }               from '../components/sprites/PetSprite'
import { SeletorComportamento }    from '../components/ui/SeletorComportamento'
import { SeletorEventos }          from '../components/ui/SeletorEventos'
import { Botao }                   from '../components/ui/Botao'
import { Badge }                   from '../components/ui/Badge'
import { usePet }                  from '../hooks/usePet'
import { Breadcrumb }              from '../components/ui/Breadcrumb'
import { montarObservacoesComEventos } from '../services/eventos'
import styles                      from './Registrar.module.scss'

export default function Registrar() {
  const { id }     = useParams()
  const navigate   = useNavigate()
  const { pet, registrar } = usePet(id)

  const [valores, setValores] = useState({
    agitacao: 3, sono: 3, apetite: 3, humor: 3,
  })
  const [loading, setLoading] = useState(false)
  const [erro, setErro]       = useState(null)
  const [eventosSelecionados, setEventosSelecionados] = useState([])
  const [observacoes, setObservacoes] = useState('')

  const estadoAtual = calcularEstado(
    valores.agitacao, valores.sono, valores.apetite, valores.humor
  )

  function handleChange(campo, valor) {
    setValores((v) => ({ ...v, [campo]: valor }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setErro(null)
    try {
      const observacoesCompletas = montarObservacoesComEventos(
        eventosSelecionados,
        observacoes
      )
      await registrar({
        ...valores,
        observacoes: observacoesCompletas || null,
      })
      navigate(`/pets/${id}`)
    } catch (err) {
      setErro(err.response?.data?.detail ?? 'Erro ao salvar registro')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.pagina}>
      <Breadcrumb itens={[
        { label: 'Home', to: '/' },
        { label: pet?.nome ?? '...', to: `/pets/${id}` },
        { label: 'Registrar comportamento' },
      ]} />
      <header className={styles.header}>
        <button className={styles.voltar} onClick={() => navigate(`/pets/${id}`)} aria-label="Voltar">←</button>
        <h1 className={styles.titulo}>Registrar hoje</h1>
      </header>

      <main className={styles.main}>
        {/* Preview do pet reagindo em tempo real */}
        <div className={styles.preview}>
          <PetSprite especie={pet?.especie ?? 'cachorro'} estado={estadoAtual} tamanho="m" />
          <div className={styles.previewInfo}>
            <span className={styles.previewNome}>{pet?.nome ?? '…'}</span>
            <Badge estado={estadoAtual} />
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          {(['agitacao', 'sono', 'apetite', 'humor']).map((campo) => (
            <SeletorComportamento
              key={campo}
              campo={campo}
              value={valores[campo]}
              onChange={(v) => handleChange(campo, v)}
            />
          ))}

          <SeletorEventos
            selecionados={eventosSelecionados}
            onChange={setEventosSelecionados}
          />

          <div className={styles.campoObservacoes}>
            <label className={styles.labelObservacoes} htmlFor="observacoes">
              Observações do dia
            </label>
            <textarea
              id="observacoes"
              className={styles.textareaObservacoes}
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              placeholder="Ex.: ficou mais quieto após a visita"
              rows={4}
            />
          </div>

          {erro && <p className={styles.erro}>{erro}</p>}

          <div className={styles.acoes}>
            <Botao type="submit" variante="primario" disabled={loading}>
              {loading ? 'Salvando…' : '💾 Salvar registro'}
            </Botao>
            <Botao variante="secundario" onClick={() => navigate(`/pets/${id}`)}>
              Cancelar
            </Botao>
          </div>
        </form>
      </main>
    </div>
  )
}
