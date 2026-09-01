import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ChevronLeft, ChevronUp, ChevronDown, Trash2, Plus, Pencil } from 'lucide-react'
import { BottomNav } from '@/components/layout/BottomNav'
import { SmartMedia } from '@/components/media/MediaPlaceholder'
import { AddExerciseDrawer } from '@/components/treinos/AddExerciseDrawer'
import { useWorkoutPlans } from '@/hooks/useWorkoutPlans'
import { useExerciseLibrary } from '@/hooks/useExerciseLibrary'

export function TreinoDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { plans, renamePlan, addItem, updateItem, removeItem, moveItem } = useWorkoutPlans()
  const { exercises } = useExerciseLibrary()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editingItemId, setEditingItemId] = useState<string | null>(null)
  const [renaming, setRenaming] = useState(false)
  const [nomeDraft, setNomeDraft] = useState('')

  const plan = plans.find((p) => p.id === id)

  const exerciseById = useMemo(() => {
    const map = new Map(exercises.map((e) => [e.id, e]))
    return map
  }, [exercises])

  if (!plan) {
    return (
      <div className="flex min-h-full flex-col">
        <main className="flex flex-1 flex-col items-center justify-center gap-2 px-8 text-center">
          <p className="font-body text-sm text-bio-ink-soft">Ficha não encontrada.</p>
          <button onClick={() => navigate('/treinos')} className="font-body text-sm font-semibold text-bio-lime">
            Voltar para Meus Treinos
          </button>
        </main>
        <BottomNav />
      </div>
    )
  }

  return (
    <div className="flex min-h-full flex-col">
      <header className="sticky top-0 z-30 flex flex-col gap-2 bg-bio-ink/95 px-5 pb-3 pt-6 backdrop-blur">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/treinos')} aria-label="Voltar">
            <ChevronLeft className="h-5 w-5 text-bio-paper" />
          </button>
          {renaming ? (
            <input
              autoFocus
              value={nomeDraft}
              onChange={(e) => setNomeDraft(e.target.value)}
              onBlur={() => {
                renamePlan(plan.id, nomeDraft)
                setRenaming(false)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  renamePlan(plan.id, nomeDraft)
                  setRenaming(false)
                }
              }}
              className="flex-1 rounded-bio-sm border border-bio-lime bg-bio-surface px-2 py-1 font-display text-base font-bold text-bio-paper outline-none"
            />
          ) : (
            <button
              onClick={() => {
                setNomeDraft(plan.nome)
                setRenaming(true)
              }}
              className="flex flex-1 items-center gap-2 text-left"
            >
              <h1 className="font-display text-base font-bold text-bio-paper">
                Ficha {plan.letra} — {plan.nome}
              </h1>
              <Pencil className="h-3.5 w-3.5 shrink-0 text-bio-ink-soft" strokeWidth={1.75} />
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 px-5 pb-24 pt-1">
        {plan.itens.length === 0 ? (
          <p className="mt-10 text-center font-body text-sm text-bio-ink-soft">
            Essa ficha ainda não tem exercícios. Toque em "Adicionar exercício" para montar o treino.
          </p>
        ) : (
          <div className="flex flex-col gap-2.5">
            {plan.itens.map((item, idx) => {
              const ex = exerciseById.get(item.exerciseId)
              const isEditing = editingItemId === item.id
              return (
                <div key={item.id} className="rounded-bio-md border border-bio-line bg-bio-surface p-2.5">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-bio-sm">
                      <SmartMedia
                        src={ex?.thumbnail}
                        alt={ex?.name ?? 'Exercício'}
                        placeholderLabel={ex?.name ?? 'Exercício removido'}
                        kind="photo"
                        className="h-full w-full"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-body text-sm font-semibold text-bio-paper">
                        {ex?.name ?? 'Exercício removido do catálogo'}
                      </p>
                      <p className="font-body text-xs text-bio-ink-soft">
                        {item.series}x{item.repsMin === item.repsMax ? item.repsMin : `${item.repsMin}-${item.repsMax}`}
                        {item.carga ? ` · ${item.carga}` : ''}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-col items-center">
                      <button
                        onClick={() => moveItem(plan.id, item.id, 'up')}
                        disabled={idx === 0}
                        aria-label="Mover para cima"
                        className="p-0.5 text-bio-ink-soft disabled:opacity-20"
                      >
                        <ChevronUp className="h-4 w-4" strokeWidth={2} />
                      </button>
                      <button
                        onClick={() => moveItem(plan.id, item.id, 'down')}
                        disabled={idx === plan.itens.length - 1}
                        aria-label="Mover para baixo"
                        className="p-0.5 text-bio-ink-soft disabled:opacity-20"
                      >
                        <ChevronDown className="h-4 w-4" strokeWidth={2} />
                      </button>
                    </div>
                    <button
                      onClick={() => setEditingItemId(isEditing ? null : item.id)}
                      aria-label="Editar"
                      className="shrink-0 p-1 text-bio-ink-soft"
                    >
                      <Pencil className="h-4 w-4" strokeWidth={1.75} />
                    </button>
                    <button
                      onClick={() => removeItem(plan.id, item.id)}
                      aria-label="Remover"
                      className="shrink-0 p-1 text-bio-ink-soft active:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" strokeWidth={1.75} />
                    </button>
                  </div>

                  {isEditing && (
                    <div className="mt-3 grid grid-cols-3 gap-2 border-t border-bio-line pt-3">
                      <div>
                        <label className="font-body text-[10px] font-semibold text-bio-ink-soft">Séries</label>
                        <input
                          type="number"
                          min={1}
                          defaultValue={item.series}
                          onBlur={(e) => updateItem(plan.id, item.id, { series: Math.max(1, Number(e.target.value) || 1) })}
                          className="mt-1 w-full rounded-bio-sm border border-bio-line bg-bio-ink px-2 py-1.5 font-body text-sm text-bio-paper outline-none focus:border-bio-lime"
                        />
                      </div>
                      <div>
                        <label className="font-body text-[10px] font-semibold text-bio-ink-soft">Reps min</label>
                        <input
                          type="number"
                          min={1}
                          defaultValue={item.repsMin}
                          onBlur={(e) => updateItem(plan.id, item.id, { repsMin: Math.max(1, Number(e.target.value) || 1) })}
                          className="mt-1 w-full rounded-bio-sm border border-bio-line bg-bio-ink px-2 py-1.5 font-body text-sm text-bio-paper outline-none focus:border-bio-lime"
                        />
                      </div>
                      <div>
                        <label className="font-body text-[10px] font-semibold text-bio-ink-soft">Reps max</label>
                        <input
                          type="number"
                          min={1}
                          defaultValue={item.repsMax}
                          onBlur={(e) => updateItem(plan.id, item.id, { repsMax: Math.max(1, Number(e.target.value) || 1) })}
                          className="mt-1 w-full rounded-bio-sm border border-bio-line bg-bio-ink px-2 py-1.5 font-body text-sm text-bio-paper outline-none focus:border-bio-lime"
                        />
                      </div>
                      <div className="col-span-3">
                        <label className="font-body text-[10px] font-semibold text-bio-ink-soft">Carga</label>
                        <input
                          defaultValue={item.carga ?? ''}
                          onBlur={(e) => updateItem(plan.id, item.id, { carga: e.target.value })}
                          placeholder="Ex.: 20kg"
                          className="mt-1 w-full rounded-bio-sm border border-bio-line bg-bio-ink px-2 py-1.5 font-body text-sm text-bio-paper outline-none focus:border-bio-lime"
                        />
                      </div>
                      <div className="col-span-3">
                        <label className="font-body text-[10px] font-semibold text-bio-ink-soft">Observações</label>
                        <input
                          defaultValue={item.observacoes ?? ''}
                          onBlur={(e) => updateItem(plan.id, item.id, { observacoes: e.target.value })}
                          className="mt-1 w-full rounded-bio-sm border border-bio-line bg-bio-ink px-2 py-1.5 font-body text-sm text-bio-paper outline-none focus:border-bio-lime"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        <button
          onClick={() => setDrawerOpen(true)}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-bio-md border border-dashed border-bio-line py-3 font-body text-sm font-semibold text-bio-lime active:bg-bio-surface"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
          Adicionar exercício
        </button>
      </main>

      {drawerOpen && (
        <AddExerciseDrawer
          onClose={() => setDrawerOpen(false)}
          onAdd={(exercise, form) => addItem(plan.id, { exerciseId: exercise.id, ...form })}
        />
      )}

      <BottomNav />
    </div>
  )
}
