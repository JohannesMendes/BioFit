import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MobileFrame } from '@/components/layout/MobileFrame'
import { AuthProvider } from '@/context/AuthContext'
import { Home } from '@/pages/Home'
import { ExerciseList } from '@/pages/ExerciseList'
import { ExerciseDetail } from '@/pages/ExerciseDetail'
import { Treinos } from '@/pages/Treinos'
import { TreinoDetail } from '@/pages/TreinoDetail'
import { Profile } from '@/pages/Profile'
import { Login } from '@/pages/auth/Login'
import { Signup } from '@/pages/auth/Signup'
import { ForgotPassword } from '@/pages/auth/ForgotPassword'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <MobileFrame>
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
        </MobileFrame>
      </BrowserRouter>
    </AuthProvider>
  )
}
