import { useEffect, useState, type ReactNode } from 'react'

/**
 * MobileFrame
 * -----------
 * Requisito técnico: em telas grandes (PC/Vercel/Netlify), o app roda
 * centralizado dentro de um mockup de smartphone. Em um dispositivo móvel
 * real, o frame é ignorado e o conteúdo ocupa 100% da tela (PWA nativo).
 *
 * A detecção usa a LARGURA DA JANELA (breakpoint), não o user-agent — é o
 * mesmo comportamento visual que "abrir o navegador no celular" precisa,
 * e evita falsos positivos de UA sniffing.
 */
const BREAKPOINT = 860

export function MobileFrame({ children }: { children: ReactNode }) {
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= BREAKPOINT : true,
  )

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= BREAKPOINT)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  if (!isDesktop) {
    // Mobile real: ocupa a tela inteira, sem chrome decorativo.
    return (
      <div className="h-[100dvh] w-full bg-bio-ink font-body text-bio-paper">
        {children}
      </div>
    )
  }

  // Desktop: emulação estilo device mockup, centralizada, com ambiente
  // de fundo escuro para não competir com o app.
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#050605] p-8">
      <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(circle_at_50%_0%,rgba(198,255,58,0.06),transparent_60%)]" />
      <div className="relative flex flex-col items-center gap-4">
        <div
          className="relative overflow-hidden rounded-[46px] border-[6px] border-bio-line bg-bio-ink shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)]"
          style={{ width: 390, height: 844 }}
        >
          {/* Notch */}
          <div className="absolute left-1/2 top-0 z-20 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-bio-line" />
          <div className="h-full w-full overflow-y-auto font-body text-bio-paper">
            {children}
          </div>
        </div>
        <p className="font-display text-xs tracking-wide text-bio-ink-soft">
          Pré-visualização mobile · redimensione a janela para testar o 100% responsivo
        </p>
      </div>
    </div>
  )
}
