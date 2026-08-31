import { useState } from 'react'
import { SmartMedia } from '@/components/media/MediaPlaceholder'
import { MuscleMap } from '@/components/exercise-detail/MuscleMap'
import type { Exercise } from '@/types'

export function MediaTabs({ exercise }: { exercise: Exercise }) {
  const [tab, setTab] = useState<'video' | 'anatomia'>('video')

  return (
    <div>
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-bio-sm">
          <SmartMedia
            src={exercise.thumbnail}
            alt={exercise.name}
            placeholderLabel="GIF"
            kind="photo"
            className="h-full w-full"
          />
        </div>
        <p className="font-body text-xs leading-snug text-bio-ink-soft">
          Prévia rápida do movimento — veja a demonstração completa em vídeo abaixo.
        </p>
      </div>

      <div className="flex flex-nowrap border-b border-bio-line">
        {(['video', 'anatomia'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 border-b-2 py-3 font-body text-sm font-semibold transition-colors ${
              tab === t
                ? 'border-bio-lime text-bio-paper'
                : 'border-transparent text-bio-ink-soft'
            }`}
          >
            {t === 'video' ? 'Vídeo' : 'Foto & Anatomia'}
          </button>
        ))}
      </div>

      {tab === 'video' ? (
        <SmartMedia
          src={exercise.videoLoop ?? exercise.thumbnail}
          alt={`Demonstração: ${exercise.name}`}
          placeholderLabel={`Demonstração em loop · ${exercise.name} · opção slow-motion`}
          kind="video"
          className="h-64 w-full"
        />
      ) : (
        <div className="flex flex-col gap-4 bg-bio-surface px-4 py-5">
          <div className="grid grid-cols-2 gap-2">
            <SmartMedia
              src={exercise.media.photoStart}
              alt={`${exercise.name} — postura inicial`}
              placeholderLabel="Postura inicial"
              kind="photo"
              className="h-32 rounded-bio-md"
            />
            <SmartMedia
              src={exercise.media.photoEnd}
              alt={`${exercise.name} — postura final`}
              placeholderLabel="Postura final"
              kind="photo"
              className="h-32 rounded-bio-md"
            />
          </div>
          <MuscleMap highlights={exercise.muscleHighlights} />
        </div>
      )}
    </div>
  )
}
