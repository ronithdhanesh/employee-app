import { useState } from 'react'
// import EmployeesPage from "./pages/EmployeesPage"
import {Routes, Route, BrowserRouter} from 'react-router-dom'
// import CreateEmployee from './components/CreateEmployee'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import { LogIn } from 'lucide-react'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import { Navigate } from 'react-router-dom'
// import Dashboard from './pages/Dashboard'
// import DepartmentsPage from './pages/Departments'
// import LeavesPage from './pages/LeavesPage'
import { lazy, Suspense } from "react";

const Dashboard = lazy(() =>
  import("./pages/Dashboard")
);

const EmployeesPage = lazy(() =>
  import("./pages/EmployeesPage")
);

const DepartmentsPage = lazy(() =>
  import("./pages/Departments")
);

const LeavesPage = lazy(() =>
  import("./pages/LeavesPage")
);

function App() {

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          Loading...
        </div>
      }
    >
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
            path='/'
            element={<Navigate to="/dashboard" replace/>}
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
    </Suspense>
    
  )
}

export default App
