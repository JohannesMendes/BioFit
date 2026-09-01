import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Trash2, Dumbbell, ChevronRight } from 'lucide-react'
import { TopBar } from '@/components/layout/TopBar'
import { BottomNav } from '@/components/layout/BottomNav'
import { useWorkoutPlans } from '@/hooks/useWorkoutPlans'

export function Treinos() {
  const { plans, loaded, createPlan, deletePlan } = useWorkoutPlans()
  const [creating, setCreating] = useState(false)
  const [nome, setNome] = useState('')

  function handleCreate() {
    if (!nome.trim()) return
    createPlan(nome)
    setNome('')
    setCreating(false)
  }

  return (
    <div className="flex min-h-full flex-col">
      <TopBar />

      <main className="flex-1 px-5 pb-6 pt-2">
        <div className="mb-4 flex items-baseline justify-between">
          <h1 className="font-display text-lg font-bold text-bio-paper">Meus Treinos</h1>
          <span className="font-body text-xs text-bio-ink-soft">
            {plans.length} {plans.length === 1 ? 'ficha' : 'fichas'}
          </span>
        </div>

        {!loaded ? (
          <p className="mt-10 text-center font-body text-sm text-bio-ink-soft">Carregando…</p>
        ) : (
          <div className="flex flex-col gap-2.5">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="flex items-center gap-3 rounded-bio-md border border-bio-line bg-bio-surface p-3"
              >
                <Link to={`/treinos/${plan.id}`} className="flex min-w-0 flex-1 items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-bio-sm bg-bio-lime/15 font-display text-lg font-bold text-bio-lime">
                    {plan.letra}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-body text-sm font-semibold text-bio-paper">
                      Ficha {plan.letra} — {plan.nome}
                    </p>
                    <p className="font-body text-xs text-bio-ink-soft">
                      {plan.itens.length} {plan.itens.length === 1 ? 'exercício' : 'exercícios'}
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-bio-ink-soft" strokeWidth={1.75} />
                </Link>
                <button
                  onClick={() => {
                    if (confirm(`Excluir a Ficha ${plan.letra} — ${plan.nome}?`)) deletePlan(plan.id)
                  }}
                  aria-label="Excluir ficha"
                  className="shrink-0 rounded-bio-sm p-1.5 text-bio-ink-soft transition-colors active:text-red-400"
                >
                  <Trash2 className="h-4 w-4" strokeWidth={1.75} />
                </button>
              </div>
            ))}

            {plans.length === 0 && !creating && (
              <div className="mt-6 flex flex-col items-center gap-2 text-center">
                <Dumbbell className="h-8 w-8 text-bio-lime" strokeWidth={1.5} />
                <p className="font-display text-sm font-semibold text-bio-paper">
                  Monte sua primeira ficha
                </p>
                <p className="max-w-[85%] font-body text-sm text-bio-ink-soft">
                  Crie fichas como "A — Peito e Tríceps" ou "B — Costas e Bíceps" e adicione os
                  exercícios do catálogo com séries e repetições.
                </p>
              </div>
            )}

            {creating ? (
              <div className="mt-2 flex flex-col gap-2 rounded-bio-md border border-bio-line bg-bio-surface p-3">
                <label className="font-body text-xs font-semibold text-bio-ink-soft">
                  Nome / foco muscular da ficha
                </label>
                <input
                  autoFocus
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                  placeholder="Ex.: Peito e Tríceps"
                  className="rounded-bio-sm border border-bio-line bg-bio-ink px-3 py-2 font-body text-sm text-bio-paper outline-none focus:border-bio-lime"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleCreate}
                    disabled={!nome.trim()}
                    className="flex-1 rounded-bio-sm bg-bio-lime py-2 font-body text-sm font-semibold text-bio-ink disabled:opacity-40"
                  >
                    Criar ficha
                  </button>
                  <button
                    onClick={() => {
                      setCreating(false)
                      setNome('')
                    }}
                    className="rounded-bio-sm border border-bio-line px-4 py-2 font-body text-sm text-bio-ink-soft"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setCreating(true)}
                className="mt-2 flex items-center justify-center gap-2 rounded-bio-md border border-dashed border-bio-line py-3 font-body text-sm font-semibold text-bio-lime active:bg-bio-surface"
              >
                <Plus className="h-4 w-4" strokeWidth={2} />
                Nova ficha de treino
              </button>
            )}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
