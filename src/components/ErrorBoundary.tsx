import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

/**
 * ErrorBoundary — captura erros de renderização em qualquer componente
 * filho e mostra uma tela de fallback amigável, em vez de deixar a tela
 * em branco (comportamento padrão do React quando um erro não é tratado).
 *
 * Cobre apenas erros de RENDER (não erros assíncronos como falhas de
 * fetch dentro de um useEffect ou de um try/catch — esses continuam
 * precisando de tratamento local na própria chamada).
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary capturou um erro:', error, info.componentStack)
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null })
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-full min-h-screen w-full flex-col items-center justify-center gap-4 bg-[#0D0D0D] px-6 text-center text-white">
          <div className="text-5xl">⚠️</div>
          <h1 className="text-lg font-semibold">Algo deu errado</h1>
          <p className="max-w-xs text-sm text-white/60">
            Encontramos um problema inesperado nesta tela. Você pode tentar
            voltar para o início.
          </p>
          <button
            onClick={this.handleReload}
            className="mt-2 rounded-full bg-white px-6 py-2 text-sm font-medium text-black"
          >
            Voltar para o início
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
