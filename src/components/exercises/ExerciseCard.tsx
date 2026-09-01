import { Link } from 'react-router-dom'
import { Building2, Home as HomeIcon } from 'lucide-react'
import { SmartMedia } from '@/components/media/MediaPlaceholder'
import type { Exercise } from '@/types'

export function ExerciseCard({ exercise }: { exercise: Exercise }) {
  const homeReady = exercise.environment.includes('casa')
  const gymOnly = exercise.environment.includes('academia') && !homeReady

  return (
    <Link
      to={`/exercicios/${exercise.id}`}
      className="flex items-center gap-3 rounded-bio-md border border-bio-line bg-bio-surface p-2.5 transition-colors active:border-bio-lime/40"
    >
      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-bio-sm">
        <SmartMedia
          src={exercise.thumbnail}
          alt={exercise.name}
          placeholderLabel={exercise.name}
          kind="photo"
          className="h-full w-full"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-body text-sm font-semibold text-bio-paper">
          {exercise.name}
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-1.5">
          <span className="inline-flex items-center rounded-bio-pill border border-bio-line px-2 py-0.5 font-body text-[10px] font-medium text-bio-ink-soft">
            {exercise.equipment}
          </span>
          <span
            className={`inline-flex items-center gap-1 rounded-bio-pill px-2 py-0.5 font-body text-[10px] font-medium ${
              gymOnly ? 'border border-bio-line text-bio-ink-soft' : 'bg-bio-lime/15 text-bio-lime'
            }`}
          >
            {gymOnly ? (
              <Building2 className="h-2.5 w-2.5" strokeWidth={2} />
            ) : (
              <HomeIcon className="h-2.5 w-2.5" strokeWidth={2} />
            )}
            {gymOnly ? 'Academia' : 'Em casa'}
          </span>
        </div>
      </div>
    </Link>
  )
}
