import { Link } from 'react-router-dom'
import { SmartMedia } from '@/components/media/MediaPlaceholder'
import type { Exercise } from '@/types'

export function ExerciseCard({ exercise }: { exercise: Exercise }) {
  return (
    <Link
      to={`/exercicios/${exercise.id}`}
      className="flex items-center gap-3 rounded-bio-md border border-bio-line bg-bio-surface p-2.5 transition-colors active:border-bio-lime/40"
    >
      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-bio-sm">
        <SmartMedia
          src={exercise.thumbnail}
          alt={exercise.name}
          placeholderLabel="GIF"
          kind="photo"
          className="h-full w-full"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-body text-sm font-semibold text-bio-paper">
          {exercise.name}
        </p>
        <span className="mt-1 inline-flex items-center rounded-bio-pill border border-bio-line px-2 py-0.5 font-body text-[10px] font-medium text-bio-ink-soft">
          {exercise.equipment}
        </span>
      </div>
    </Link>
  )
}
