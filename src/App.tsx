import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MobileFrame } from '@/components/layout/MobileFrame'
import { AuthProvider } from '@/context/AuthContext'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { RouteFallback } from '@/components/RouteFallback'

// Rotas carregadas sob demanda (code-splitting por página): o usuário só
// baixa o código da tela que está acessando, reduzindo o bundle inicial.
const Home = lazy(() => import('@/pages/Home').then((m) => ({ default: m.Home })))
const ExerciseList = lazy(() =>
  import('@/pages/ExerciseList').then((m) => ({ default: m.ExerciseList })),
)
const ExerciseDetail = lazy(() =>
  import('@/pages/ExerciseDetail').then((m) => ({ default: m.ExerciseDetail })),
)
const Treinos = lazy(() => import('@/pages/Treinos').then((m) => ({ default: m.Treinos })))
const TreinoDetail = lazy(() =>
  import('@/pages/TreinoDetail').then((m) => ({ default: m.TreinoDetail })),
)
const Profile = lazy(() => import('@/pages/Profile').then((m) => ({ default: m.Profile })))
const Login = lazy(() => import('@/pages/auth/Login').then((m) => ({ default: m.Login })))
const Signup = lazy(() => import('@/pages/auth/Signup').then((m) => ({ default: m.Signup })))
const ForgotPassword = lazy(() =>
  import('@/pages/auth/ForgotPassword').then((m) => ({ default: m.ForgotPassword })),
)

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter basename="/biofit">
          <MobileFrame>
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/exercicios" element={<ExerciseList />} />
                <Route path="/exercicios/:id" element={<ExerciseDetail />} />
                <Route path="/treinos" element={<Treinos />} />
                <Route path="/treinos/:id" element={<TreinoDetail />} />
                <Route path="/perfil" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Signup />} />
                <Route path="/esqueci-senha" element={<ForgotPassword />} />
              </Routes>
            </Suspense>
          </MobileFrame>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  )
}
