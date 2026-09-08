/**
 * RouteFallback — exibido enquanto o chunk de uma rota lazy-loaded está
 * sendo baixado (React.lazy + Suspense). Mantém o mesmo fundo escuro do
 * app para evitar "flash" branco entre a troca de telas.
 */
export function RouteFallback() {
  return (
    <div className="flex h-full min-h-screen w-full items-center justify-center bg-[#0D0D0D]">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
    </div>
  )
}
