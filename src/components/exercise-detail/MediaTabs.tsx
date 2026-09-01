import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { SmartMedia } from '@/components/media/MediaPlaceholder'
import { AnimatedFramesMedia } from '@/components/media/AnimatedFramesMedia'
import { MuscleMap } from '@/components/exercise-detail/MuscleMap'
import { curatedMediaOverrides } from '@/data/curatedMediaOverrides'
import { illustratedMedia } from '@/data/illustratedMedia'
import type { Exercise } from '@/types'

export function MediaTabs({ exercise }: { exercise: Exercise }) {
  const [tab, setTab] = useState<'video' | 'anatomia'>('video')
  const aproximado = curatedMediaOverrides[exercise.id]?.aproximado
  const isIllustration = !!illustratedMedia[exercise.id]

  return (
    <div>
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-bio-sm">
          <AnimatedFramesMedia
            frameA={exercise.media.photoStart}
            frameB={exercise.media.photoEnd}
            alt={exercise.name}
            placeholderLabel={exercise.name}
            className="h-full w-full"
          />
        </div>
        <p className="font-body text-xs leading-snug text-bio-ink-soft">
          Prévia rápida do movimento — veja a demonstração completa em vídeo abaixo.
        </p>
      </div>

      {(aproximado || isIllustration) && (
        <div className="mx-4 mb-1 flex items-start gap-2 rounded-bio-sm border border-amber-500/30 bg-amber-500/10 px-3 py-2">
          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" strokeWidth={2} />
          <p className="font-body text-[11px] leading-snug text-amber-200/90">
            {isIllustration
              ? 'Não achamos uma foto real confiável para este exercício — a imagem abaixo é uma ilustração própria, não uma foto.'
              : `Foto de referência: ${aproximado}.`}
          </p>
        </div>
      )}

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
        <AnimatedFramesMedia
          frameA={exercise.media.photoStart}
          frameB={exercise.media.photoEnd}
          alt={`Demonstração: ${exercise.name}`}
          placeholderLabel={exercise.name}
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
