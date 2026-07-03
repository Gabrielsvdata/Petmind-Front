export const EVENTOS = [
  { id: 'jogo_copa', icone: '⚽', label: 'Jogo da Copa', categoria: 'copa' },
  { id: 'brasil_ganhou', icone: '🏆', label: 'Brasil ganhou!', categoria: 'copa' },
  { id: 'brasil_perdeu', icone: '😢', label: 'Brasil perdeu', categoria: 'copa' },
  { id: 'torcida_casa', icone: '📺', label: 'Torcida em casa', categoria: 'copa' },
  { id: 'sozinho', icone: '🚪', label: 'Ficou sozinho', categoria: 'rotina' },
  { id: 'visita', icone: '👥', label: 'Visita em casa', categoria: 'rotina' },
  { id: 'passeio', icone: '🦮', label: 'Foi passear', categoria: 'rotina' },
  { id: 'banho', icone: '🛁', label: 'Tomou banho', categoria: 'rotina' },
  { id: 'veterinario', icone: '🏥', label: 'Foi ao veterinário', categoria: 'rotina' },
  { id: 'aniversario', icone: '🎂', label: 'Aniversário em casa', categoria: 'festa' },
  { id: 'festa', icone: '🎉', label: 'Festa/Reunião', categoria: 'festa' },
  { id: 'reveillon', icone: '🎆', label: 'Réveillon/Fogos', categoria: 'festa' },
  { id: 'festa_junina', icone: '🎪', label: 'Festa Junina', categoria: 'festa' },
  { id: 'natal', icone: '🎄', label: 'Natal', categoria: 'festa' },
  { id: 'tempestade', icone: '⛈️', label: 'Tempestade/Trovão', categoria: 'ambiente' },
  { id: 'calor_intenso', icone: '🌡️', label: 'Calor intenso', categoria: 'ambiente' },
  { id: 'mudanca_casa', icone: '📦', label: 'Mudança/Bagunça', categoria: 'ambiente' },
  { id: 'novo_animal', icone: '🐾', label: 'Novo animal em casa', categoria: 'ambiente' },
]

export const CATEGORIAS = {
  copa: { label: '⚽ Copa do Mundo', cor: '#1a5c2a' },
  rotina: { label: '🏠 Rotina', cor: '#3A7CA5' },
  festa: { label: '🎉 Festas', cor: '#7B5EA7' },
  ambiente: { label: '🌍 Ambiente', cor: '#E8651A' },
}

export function extrairEventos(observacoes) {
  if (!observacoes) return []
  const match = observacoes.match(/EVENTOS:([^|]+)/)
  if (!match) return []
  return match[1].trim().split(',').map((e) => e.trim()).filter(Boolean)
}

export function montarObservacoesComEventos(eventosSelecionados, observacoes) {
  return [
    eventosSelecionados.length > 0 ? `EVENTOS:${eventosSelecionados.join(',')}` : null,
    observacoes?.trim() ? observacoes.trim() : null,
  ].filter(Boolean).join(' | ')
}
