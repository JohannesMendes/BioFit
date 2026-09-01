import { useEffect, useState } from 'react'
import { MediaPlaceholder } from '@/components/media/MediaPlaceholder'

/**
 * AnimatedFramesMedia
 * --------------------
 * O dataset de fotos que usamos (free-exercise-db) não tem GIF animado
 * de verdade — só duas fotos por exercício (posição inicial/final).
 * Em vez de fingir uma URL de ".gif" que não existe (dá 404), simulamos
 * o movimento alternando as duas fotos reais em loop, com crossfade.
 * Se as fotos falharem ao carregar, cai no mesmo MediaPlaceholder
 * elegante usado no resto do app (nunca imagem quebrada).
 */
export function AnimatedFramesMedia({
  frameA,
  frameB,
  alt,
  placeholderLabel,
  className = '',
}: {
  frameA?: string
  frameB?: string
  alt: string
  placeholderLabel: string
  className?: string
}) {
  const [showB, setShowB] = useState(false)
  const [failed, setFailed] = useState(false)
  const hasRealMedia = !!frameA && /^https?:\/\//.test(frameA) && !failed

  useEffect(() => {
    if (!hasRealMedia || !frameB || frameB === frameA) return
    const id = setInterval(() => setShowB((v) => !v), 900)
    return () => clearInterval(id)
  }, [hasRealMedia, frameA, frameB])

  if (!hasRealMedia) {
    return <MediaPlaceholder label={placeholderLabel} kind="video" className={className} />
  }

  return (
    <div className={`relative overflow-hidden bg-bio-paper-surface ${className}`}>
      <img
        src={frameA}
        alt={alt}
        loading="lazy"
        onError={() => setFailed(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${showB ? 'opacity-0' : 'opacity-100'}`}
      />
      {frameB && frameB !== frameA && (
        <img
          src={frameB}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${showB ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
      <span className="absolute bottom-1.5 right-1.5 rounded-bio-pill bg-black/55 px-1.5 py-0.5 font-body text-[9px] font-semibold uppercase tracking-wide text-bio-paper">
        Loop
      </span>
    </div>
  )
}
