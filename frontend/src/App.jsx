import { useState } from 'react'
import Dashboard from "./pages/Dashboard"
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import CreateEmployee from './components/CreateEmployee'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import { LogIn } from 'lucide-react'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import { Navigate } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path='/'
          element={<Navigate to="/dashboard" />}
        />
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
