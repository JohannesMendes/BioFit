import { useMemo, useState } from 'react'
import { X, Check, Search } from 'lucide-react'
import { SmartMedia } from '@/components/media/MediaPlaceholder'
import { useExerciseLibrary } from '@/hooks/useExerciseLibrary'
import { muscleGroups } from '@/data/categories'
import type { Exercise, MuscleGroupId } from '@/types'

interface Props {
  onClose: () => void
  onAdd: (exercise: Exercise, form: { series: number; repsMin: number; repsMax: number; carga: string; observacoes: string }) => void
}

export function AddExerciseDrawer({ onClose, onAdd }: Props) {
  const { exercises, loading } = useExerciseLibrary()
  const [query, setQuery] = useState('')
  const [grupo, setGrupo] = useState<MuscleGroupId | 'todos'>('todos')
  const [selected, setSelected] = useState<Exercise | null>(null)

  const [series, setSeries] = useState('4')
  const [repsMin, setRepsMin] = useState('10')
  const [repsMax, setRepsMax] = useState('12')
  const [carga, setCarga] = useState('')
  const [observacoes, setObservacoes] = useState('')
  const [justAddedId, setJustAddedId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return exercises.filter((ex) => {
      if (grupo !== 'todos' && !ex.muscleGroups.includes(grupo)) return false
      if (q && !ex.name.toLowerCase().includes(q)) return false
      return true
    })
  }, [exercises, grupo, query])

  function resetForm() {
    setSeries('4')
    setRepsMin('10')
    setRepsMax('12')
    setCarga('')
    setObservacoes('')
  }

  function handleConfirmAdd() {
    if (!selected) return
    onAdd(selected, {
      series: Math.max(1, Number(series) || 1),
      repsMin: Math.max(1, Number(repsMin) || 1),
      repsMax: Math.max(Number(repsMin) || 1, Number(repsMax) || Number(repsMin) || 1),
      carga: carga.trim(),
      observacoes: observacoes.trim(),
    })
    setJustAddedId(selected.id)
    setSelected(null)
    resetForm()
    setTimeout(() => setJustAddedId(null), 1800)
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60" onClick={onClose}>
      <div
        className="flex max-h-[88vh] flex-col rounded-t-bio-lg border-t border-bio-line bg-bio-ink"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-bio-line px-4 py-3">
          <h2 className="font-display text-sm font-bold text-bio-paper">Adicionar exercício</h2>
          <button onClick={onClose} aria-label="Fechar" className="p-1 text-bio-ink-soft">
            <X className="h-5 w-5" strokeWidth={1.75} />
          </button>
        </div>

        {selected ? (
          <div className="flex flex-col gap-3 overflow-y-auto px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-bio-sm">
                <SmartMedia
                  src={selected.thumbnail}
                  alt={selected.name}
                  placeholderLabel={selected.name}
                  kind="photo"
                  className="h-full w-full"
                />
              </div>
              <p className="font-body text-sm font-semibold text-bio-paper">{selected.name}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-body text-xs font-semibold text-bio-ink-soft">Séries</label>
                <input
                  type="number"
                  min={1}
                  value={series}
                  onChange={(e) => setSeries(e.target.value)}
                  className="mt-1 w-full rounded-bio-sm border border-bio-line bg-bio-surface px-3 py-2 font-body text-sm text-bio-paper outline-none focus:border-bio-lime"
                />
              </div>
              <div>
                <label className="font-body text-xs font-semibold text-bio-ink-soft">Repetições</label>
                <div className="mt-1 flex items-center gap-1.5">
                  <input
                    type="number"
                    min={1}
                    value={repsMin}
                    onChange={(e) => setRepsMin(e.target.value)}
                    className="w-full rounded-bio-sm border border-bio-line bg-bio-surface px-3 py-2 font-body text-sm text-bio-paper outline-none focus:border-bio-lime"
                  />
                  <span className="text-bio-ink-soft">–</span>
                  <input
                    type="number"
                    min={1}
                    value={repsMax}
                    onChange={(e) => setRepsMax(e.target.value)}
                    className="w-full rounded-bio-sm border border-bio-line bg-bio-surface px-3 py-2 font-body text-sm text-bio-paper outline-none focus:border-bio-lime"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="font-body text-xs font-semibold text-bio-ink-soft">
                Carga inicial (opcional)
              </label>
              <input
                value={carga}
                onChange={(e) => setCarga(e.target.value)}
                placeholder="Ex.: 20kg"
                className="mt-1 w-full rounded-bio-sm border border-bio-line bg-bio-surface px-3 py-2 font-body text-sm text-bio-paper outline-none focus:border-bio-lime"
              />
            </div>

            <div>
              <label className="font-body text-xs font-semibold text-bio-ink-soft">
                Observações (opcional)
              </label>
              <textarea
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                placeholder="Ex.: pegada aberta, cadência 3s na descida..."
                rows={2}
                className="mt-1 w-full resize-none rounded-bio-sm border border-bio-line bg-bio-surface px-3 py-2 font-body text-sm text-bio-paper outline-none focus:border-bio-lime"
              />
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={handleConfirmAdd}
                className="flex-1 rounded-bio-sm bg-bio-lime py-2.5 font-body text-sm font-semibold text-bio-ink"
              >
                Adicionar à ficha
              </button>
              <button
                onClick={() => setSelected(null)}
                className="rounded-bio-sm border border-bio-line px-4 py-2.5 font-body text-sm text-bio-ink-soft"
              >
                Voltar
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-2 border-b border-bio-line px-4 py-3">
              <div className="flex items-center gap-2 rounded-bio-md border border-bio-line bg-bio-surface px-3 py-2">
                <Search className="h-4 w-4 shrink-0 text-bio-ink-soft" strokeWidth={1.75} />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar exercício ou músculo"
                  className="w-full bg-transparent font-body text-sm text-bio-paper outline-none placeholder:text-bio-ink-soft"
                />
              </div>
              <div className="flex gap-1.5 overflow-x-auto pb-0.5">
                <button
                  onClick={() => setGrupo('todos')}
                  className={`shrink-0 rounded-bio-pill px-3 py-1 font-body text-xs font-semibold ${
                    grupo === 'todos' ? 'bg-bio-lime text-bio-ink' : 'border border-bio-line text-bio-ink-soft'
                  }`}
                >
                  Todos
                </button>
                {muscleGroups.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setGrupo(g.id)}
                    className={`shrink-0 rounded-bio-pill px-3 py-1 font-body text-xs font-semibold ${
                      grupo === g.id ? 'bg-bio-lime text-bio-ink' : 'border border-bio-line text-bio-ink-soft'
                    }`}
                  >
                    {g.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3">
              {loading ? (
                <p className="mt-6 text-center font-body text-sm text-bio-ink-soft">Carregando…</p>
              ) : filtered.length === 0 ? (
                <p className="mt-6 text-center font-body text-sm text-bio-ink-soft">
                  Nenhum exercício encontrado.
                </p>
              ) : (
                <div className="flex flex-col gap-2 pb-4">
                  {filtered.slice(0, 100).map((ex) => (
                    <button
                      key={ex.id}
                      onClick={() => setSelected(ex)}
                      className="flex items-center gap-3 rounded-bio-md border border-bio-line bg-bio-surface p-2.5 text-left active:border-bio-lime/40"
                    >
                      <div className="h-11 w-11 shrink-0 overflow-hidden rounded-bio-sm">
                        <SmartMedia
                          src={ex.thumbnail}
                          alt={ex.name}
                          placeholderLabel={ex.name}
                          kind="photo"
                          className="h-full w-full"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-body text-sm font-semibold text-bio-paper">{ex.name}</p>
                        <span className="font-body text-[11px] text-bio-ink-soft">{ex.equipment}</span>
                      </div>
                      {justAddedId === ex.id ? (
                        <Check className="h-4 w-4 shrink-0 text-bio-lime" strokeWidth={2.5} />
                      ) : null}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
