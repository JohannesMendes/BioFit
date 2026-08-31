import { BottomNav } from '@/components/layout/BottomNav'
import { HomeHeader } from '@/components/home/HomeHeader'
import { CategoryCard } from '@/components/home/CategoryCard'
import { muscleGroups, regionLabels } from '@/data/categories'
import type { MuscleGroup } from '@/types'

const regions: MuscleGroup['region'][] = ['superiores', 'inferiores', 'core']

export function Home() {
  return (
    <div className="flex min-h-full flex-col">
      <HomeHeader />

      <main className="flex-1 px-5 pb-6">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="font-display text-sm font-bold uppercase tracking-wide text-bio-paper">
            Grupos musculares
          </h2>
          <span className="font-body text-xs text-bio-ink-soft">{muscleGroups.length} grupos</span>
        </div>

        {regions.map((region) => (
          <section key={region} className="mb-6">
            <h3 className="mb-3 font-body text-xs font-semibold uppercase tracking-wide text-bio-ink-soft">
              {regionLabels[region]}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {muscleGroups
                .filter((g) => g.region === region)
                .map((group) => (
                  <CategoryCard key={group.id} group={group} />
                ))}
            </div>
          </section>
        ))}
      </main>

      <BottomNav />
    </div>
  )
}
