import { useState } from 'react'
import { Play, Image as ImageIcon } from 'lucide-react'

/**
 * SmartMedia
 * ----------
 * Decide entre mostrar mídia real (GIF vindo do exercisedb-api, uma URL
 * http/https) ou o MediaPlaceholder local (quando o exercício vem da
 * nossa biblioteca curada, que ainda não tem asset de mídia real).
 *
 * Duas correções de UI/UX aplicadas aqui, centralizadas num único lugar
 * porque todo card/imagem do app passa por este componente:
 *
 * 1. Fallback de imagem quebrada: se a URL (GIF/foto) falhar ao carregar
 *    (404, CORS, instabilidade do free tier), caímos para o mesmo
 *    MediaPlaceholder usado quando não há mídia — nunca deixamos o
 *    ícone de "imagem quebrada" nativo do navegador aparecer.
 * 2. Integração no Dark Mode: em vez de usar `mix-blend-mode: multiply`
 *    para "sumir" o fundo branco dos GIFs do exercisedb-api (isso
 *    escurecia demais fotos reais com fundo escuro/colorido), a mídia
 *    fica sobre um chip claro (`bio-paper-surface`) — os GIFs de fundo
 *    branco se integram naturalmente e fotos mantêm brilho/cor real.
 */
export function SmartMedia({
  src,
  alt,
  placeholderLabel,
  kind = 'video',
  className = '',
}: {
  src?: string
  alt: string
  placeholderLabel: string
  kind?: 'video' | 'photo'
  className?: string
}) {
  const [failed, setFailed] = useState(false)

  if (src && /^https?:\/\//.test(src) && !failed) {
    return (
      <div className={`relative overflow-hidden bg-bio-paper-surface ${className}`}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      </div>
    )
  }
  return <MediaPlaceholder label={placeholderLabel} kind={kind} className={className} />
}


/**
 * MediaPlaceholder
 * -----------------
 * Este projeto ainda não tem fotos/vídeos reais dos exercícios — é um MOCK.
 * Este componente marca visualmente onde a mídia real (GIF em loop, vídeo
 * slow-motion ou foto de execução) deve ser plugada futuramente via CMS/S3.
 * Basta trocar por <img> / <video> apontando para a URL real mantendo as
 * mesmas props de className.
 */
export function MediaPlaceholder({
  label,
  kind = 'video',
  className = '',
}: {
  label: string
  kind?: 'video' | 'photo'
  className?: string
}) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-bio-surface-2 ${className}`}
      style={{
        backgroundImage:
          'radial-gradient(circle at 30% 20%, rgba(198,255,58,0.12), transparent 55%)',
      }}
    >
      <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(var(--color-bio-lime)_1px,transparent_1px),linear-gradient(90deg,var(--color-bio-lime)_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="relative flex flex-col items-center gap-2 text-bio-ink-soft">
        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-bio-line bg-bio-ink/60">
          {kind === 'video' ? (
            <Play className="h-4 w-4 fill-current" strokeWidth={0} />
          ) : (
            <ImageIcon className="h-4 w-4" strokeWidth={1.5} />
          )}
        </div>
        <span className="max-w-[80%] text-center font-body text-[11px] leading-tight">
          {label}
        </span>
      </div>
    </div>
  )
}
