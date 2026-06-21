// Será preenchido quando as imagens chegarem

export const SPRITES_BASE_PATH = '/src/assets/sprites'

export const ESTADOS_VALIDOS = [
  'idle',
  'feliz',
  'triste',
  'agitado',
  'sonolento',
  'com_fome',
]

export const ESPECIES_VALIDAS = [
  'cachorro',
  'gato',
  'hamster',
  'coelho',
]

// Mapeamento estado backend → sprite
export function getSpriteParaEstado(especie, estado) {
  const mapaEstado = {
    feliz:     'feliz',
    animado:   'feliz',
    agitado:   'agitado',
    sonolento: 'sonolento',
    com_fome:  'com_fome',
    triste:    'triste',
  }
  const spriteEstado = mapaEstado[estado] ?? 'idle'
  return `${SPRITES_BASE_PATH}/${especie}/${spriteEstado}.png`
}
