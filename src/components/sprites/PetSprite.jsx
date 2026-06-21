// AGUARDANDO IMAGENS — placeholder temporário

export function PetSprite({ especie, estado, tamanho = 'm' }) {
  const tamanhos = { g: '14rem', m: '8rem', p: '4rem' }
  const fontes   = { g: '6rem',  m: '4rem', p: '2rem' }
  const emoji = {
    cachorro: '🐶',
    gato:     '🐱',
    hamster:  '🐹',
    coelho:   '🐰',
  }

  return (
    <div style={{
      width:           tamanhos[tamanho] ?? '8rem',
      height:          tamanhos[tamanho] ?? '8rem',
      display:         'flex',
      alignItems:      'center',
      justifyContent:  'center',
      fontSize:        fontes[tamanho]   ?? '4rem',
    }}>
      {emoji[especie] ?? '🐾'}
    </div>
  )
}
