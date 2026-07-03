import cachorroIdle   from '../assets/sprites/cachorro/cachorro-idle.png'
import cachorroFeliz  from '../assets/sprites/cachorro/cachorro-feliz.png'
import cachorroTriste from '../assets/sprites/cachorro/cachorro-triste.png'
import gatoIdle       from '../assets/sprites/gato/gato-idle.png'
import gatoFeliz      from '../assets/sprites/gato/gato-feliz.png'
import gatoTriste     from '../assets/sprites/gato/gato-triste.png'
import hamsterIdle    from '../assets/sprites/hamster/hamster-idle.png'
import hamsterFeliz   from '../assets/sprites/hamster/hamster-feliz.png'
import hamsterTriste  from '../assets/sprites/hamster/hamster-triste.png'
// Mantido o nome atual do arquivo para evitar quebra de build.
import coelhoIdle     from '../assets/sprites/coelho/coelho-idle.png'
import coelhoFeliz    from '../assets/sprites/coelho/coelho-feliz.png'
import coelhoTriste   from '../assets/sprites/coelho/coelho-triste.png'

const SPRITES = {
  cachorro: { idle: cachorroIdle, feliz: cachorroFeliz, triste: cachorroTriste },
  gato: { idle: gatoIdle, feliz: gatoFeliz, triste: gatoTriste },
  hamster: { idle: hamsterIdle, feliz: hamsterFeliz, triste: hamsterTriste },
  coelho: { idle: coelhoIdle, feliz: coelhoFeliz, triste: coelhoTriste },
}

export function getSpriteParaEstado(especie, estado) {
  const grupo = SPRITES[especie] ?? SPRITES.cachorro
  if (['feliz', 'animado', 'agitado'].includes(estado)) return grupo.feliz
  if (estado === 'triste') return grupo.triste
  return grupo.idle
}

export function getClasseAnimacao(estado) {
  const mapa = {
    feliz: 'feliz',
    animado: 'animado',
    agitado: 'agitado',
    sonolento: 'sonolento',
    com_fome: 'com_fome',
    triste: 'triste',
  }
  return mapa[estado] ?? 'idle'
}
