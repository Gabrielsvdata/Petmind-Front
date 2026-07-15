import { Link } from 'react-router-dom'

import cachorroFeliz from '../assets/sprites/cachorro/cachorro-feliz.png'
import gatoIdle from '../assets/sprites/gato/gato-idle.png'
import hamsterFeliz from '../assets/sprites/hamster/hamster-feliz.png'
import coelhoIdle from '../assets/sprites/coelho/coelho-idle.png'
import styles from './Landing.module.scss'

const estados = [
  { emoji: '😊', titulo: 'Feliz', descricao: 'Rotina equilibrada e comportamento tranquilo.' },
  { emoji: '😤', titulo: 'Agitado', descricao: 'Mais energia, tensão ou estímulos no ambiente.' },
  { emoji: '😴', titulo: 'Sonolento', descricao: 'Mudanças no descanso e no ritmo do pet.' },
  { emoji: '🍖', titulo: 'Com fome', descricao: 'Apetite abaixo do normal em dias diferentes.' },
  { emoji: '😢', titulo: 'Triste', descricao: 'Sinais de apatia, baixa interação ou desânimo.' },
  { emoji: '✨', titulo: 'Animado', descricao: 'Picos positivos de humor, energia e curiosidade.' },
]

const passos = [
  {
    emoji: '📝',
    titulo: 'Registre',
    texto: 'Conte como foi o dia do seu pet com poucos toques.',
  },
  {
    emoji: '🧠',
    titulo: 'IA analisa',
    texto: 'Acompanhe leituras inteligentes sobre humor e rotina.',
  },
  {
    emoji: '📊',
    titulo: 'Entenda padrões',
    texto: 'Descubra tendências e momentos que merecem atenção.',
  },
]

const sprites = [
  { src: cachorroFeliz, alt: 'Sprite de cachorro feliz', delay: styles.delayA },
  { src: gatoIdle, alt: 'Sprite de gato idle', delay: styles.delayB },
  { src: hamsterFeliz, alt: 'Sprite de hamster feliz', delay: styles.delayC },
  { src: coelhoIdle, alt: 'Sprite de coelho idle', delay: styles.delayD },
]

export default function Landing() {
  return (
    <main className={styles.pagina}>
      <section className={styles.hero}>
        <div className={styles.faixaTopo} />

        <div className={styles.heroConteudo}>
          <div className={styles.heroTexto}>
            <span className={styles.marca}>⚽ PETMIND</span>
            <h1 className={styles.titulo}>Entenda o que seu pet sente</h1>
            <p className={styles.subtitulo}>
              Registre rotina, descubra padrões emocionais e acompanhe como o ambiente afeta o bem-estar do seu animal.
            </p>

            <div className={styles.acoes}>
              <Link className={styles.botaoPrimario} to="/cadastro">
                Começar agora →
              </Link>
              <Link className={styles.botaoSecundario} to="/login">
                Já tenho conta
              </Link>
              <Link className={styles.botaoSecundario} to="/cadastro-admin">
                Bootstrap admin local
              </Link>
            </div>
          </div>

          <div className={styles.spriteGrid}>
            {sprites.map((sprite) => (
              <div key={sprite.alt} className={`${styles.spriteCard} ${sprite.delay}`}>
                <img className={styles.sprite} src={sprite.src} alt={sprite.alt} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.secao}>
        <div className={styles.secaoCabecalho}>
          <span className={styles.kicker}>Como funciona</span>
          <h2 className={styles.secaoTitulo}>Um diário simples com leitura inteligente</h2>
        </div>

        <div className={styles.passosGrid}>
          {passos.map((passo) => (
            <article key={passo.titulo} className={styles.passoCard}>
              <span className={styles.passoEmoji}>{passo.emoji}</span>
              <h3 className={styles.passoTitulo}>{passo.titulo}</h3>
              <p className={styles.passoTexto}>{passo.texto}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.copa}>
        <div className={styles.copaTexto}>
          <span className={styles.kickerClaro}>Especial Copa</span>
          <h2 className={styles.copaTitulo}>⚽ Seu pet e a Copa do Mundo</h2>
          <p className={styles.copaDescricao}>
            Descubra como seu pet reage durante os jogos. Registre, analise e entenda o impacto da torcida no bem-estar do seu animal.
          </p>
        </div>

        <img
          className={styles.copaSprite}
          src={cachorroFeliz}
          alt="Sprite de cachorro animado"
        />
      </section>

      <section className={styles.secao}>
        <div className={styles.secaoCabecalho}>
          <span className={styles.kicker}>Leitura emocional</span>
          <h2 className={styles.secaoTitulo}>6 estados emocionais detectados por IA</h2>
        </div>

        <div className={styles.badgesGrid}>
          {estados.map((estado) => (
            <article key={estado.titulo} className={styles.badgeCard}>
              <span className={styles.badgeEmoji}>{estado.emoji}</span>
              <div>
                <h3 className={styles.badgeTitulo}>{estado.titulo}</h3>
                <p className={styles.badgeTexto}>{estado.descricao}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.ctaFinal}>
        <h2 className={styles.ctaTitulo}>Pronto para entender seu pet?</h2>
        <div className={styles.acoes}>
          <Link className={styles.ctaBotao} to="/cadastro">
            Criar conta grátis →
          </Link>
          <Link className={styles.botaoSecundario} to="/cadastro-admin">
            Criar admin local
          </Link>
        </div>
      </section>
    </main>
  )
}