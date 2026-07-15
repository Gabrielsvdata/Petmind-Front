import { useState }       from 'react'
import { useNavigate }    from 'react-router-dom'
import { cadastrarPet }   from '../services/api'
import { SeletorEspecie } from '../components/ui/SeletorEspecie'
import { Botao }          from '../components/ui/Botao'
import { Breadcrumb }     from '../components/ui/Breadcrumb'
import styles             from './CadastrarPet.module.scss'

export default function CadastrarPet() {
  const navigate = useNavigate()
  const [especie, setEspecie] = useState('')
  const [form, setForm] = useState({
    nome: '', raca: '', idade: '', peso: '', observacoes: '',
  })
  const [loading, setLoading] = useState(false)
  const [erro, setErro]       = useState(null)

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!especie) { setErro('Selecione a espécie do pet'); return }
    setLoading(true)
    setErro(null)
    try {
      const payload = {
        ...form,
        especie,
        idade: Number(form.idade),
        peso:  Number(form.peso),
      }
      const res = await cadastrarPet(payload)
      navigate(`/pets/${res.data.id}`)
    } catch (err) {
      setErro(err.response?.data?.detail ?? 'Erro ao cadastrar pet')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.pagina}>
      <Breadcrumb itens={[
        { label: 'Home', to: '/home' },
        { label: 'Novo Pet' },
      ]} />
      <header className={styles.header}>
        <button className={styles.voltar} onClick={() => navigate('/home')} aria-label="Voltar">←</button>
        <h1 className={styles.titulo}>Novo Pet</h1>
      </header>

      <main className={styles.main}>
        <form onSubmit={handleSubmit} className={styles.form} noValidate>

          <section className={styles.secao}>
            <h2 className={styles.secaoTitulo}>Qual é o animal?</h2>
            <SeletorEspecie value={especie} onChange={setEspecie} />
          </section>

          <section className={styles.secao}>
            <h2 className={styles.secaoTitulo}>Dados do pet</h2>

            <div className={styles.campo}>
              <label className={styles.label} htmlFor="nome">Nome *</label>
              <input
                className={styles.input}
                id="nome"
                name="nome"
                type="text"
                value={form.nome}
                onChange={handleChange}
                required
                maxLength={60}
                placeholder="Como você chama seu pet?"
              />
            </div>

            <div className={styles.campo}>
              <label className={styles.label} htmlFor="raca">Raça</label>
              <input
                className={styles.input}
                id="raca"
                name="raca"
                type="text"
                value={form.raca}
                onChange={handleChange}
                maxLength={60}
                placeholder="Raça ou 'Sem raça definida'"
              />
            </div>

            <div className={styles.campoRow}>
              <div className={styles.campo}>
                <label className={styles.label} htmlFor="idade">Idade (anos)</label>
                <input
                  className={styles.input}
                  id="idade"
                  name="idade"
                  type="number"
                  min="0"
                  max="30"
                  step="1"
                  value={form.idade}
                  onChange={handleChange}
                  placeholder="0"
                />
              </div>
              <div className={styles.campo}>
                <label className={styles.label} htmlFor="peso">Peso (kg)</label>
                <input
                  className={styles.input}
                  id="peso"
                  name="peso"
                  type="number"
                  min="0"
                  step="0.1"
                  value={form.peso}
                  onChange={handleChange}
                  placeholder="0.0"
                />
              </div>
            </div>

            <div className={styles.campo}>
              <label className={styles.label} htmlFor="observacoes">Observações</label>
              <textarea
                className={`${styles.input} ${styles.textarea}`}
                id="observacoes"
                name="observacoes"
                value={form.observacoes}
                onChange={handleChange}
                maxLength={500}
                rows={3}
                placeholder="Alguma informação importante sobre seu pet?"
              />
            </div>
          </section>

          {erro && <p className={styles.erro}>{erro}</p>}

          <Botao type="submit" variante="primario" disabled={loading}>
            {loading ? 'Cadastrando…' : '🐾 Cadastrar Pet'}
          </Botao>
        </form>
      </main>
    </div>
  )
}
