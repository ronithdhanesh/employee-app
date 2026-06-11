import { useState } from 'react'
import EmployeesPage from "./pages/EmployeesPage"
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import CreateEmployee from './components/CreateEmployee'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import { LogIn } from 'lucide-react'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import { Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import DepartmentsPage from './pages/Departments'
import LeavesPage from './pages/LeavesPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path='/dashboard'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path='/leaves'
          element={
            <ProtectedRoute>
              <LeavesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path='/departments'
          element={<DepartmentsPage />}
        />
        <Route
          path='/employees'
          element={<EmployeesPage />}
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

        <Route path="/employees" element={
          <ProtectedRoute>
            <EmployeesPage />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
