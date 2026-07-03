export function useJogoCopa() {
  const jogos = [
    '2026-06-11',
    '2026-06-12',
    '2026-06-15',
    '2026-06-18',
    '2026-06-22',
    '2026-06-26',
    '2026-07-02',
    '2026-07-08',
  ]

  const hoje = new Date().toISOString().split('T')[0]
  return jogos.includes(hoje)
}
