import { useState } from 'react'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import { LogIn } from 'lucide-react'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import { Navigate } from 'react-router-dom'
import { lazy, Suspense } from "react";
import PlaygroundPage from './pages/PlaygroundPage'
import Dashboard from './components/MainContent/Dashboard/Dashboard'
import Profile from "./components/MainContent/Profile"
import Directory from "./components/MainContent/Directory/Directory"
import Leaves from "./components/MainContent/Leaves/Leaves"
import Settings from "./components/MainContent/Settings/Settings"
// const Dashboard = lazy(() =>
//   import("./pages/Dashboard")
// );

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
    // <Suspense
    //   fallback={
    //     <div className="flex min-h-screen items-center justify-center">
    //       Loading...
    //     </div>
    //   }
    // >
    //   <BrowserRouter>
    //     <Routes>
    //       <Route 
    //         path='/dashboard'
    //         element={
    //           <ProtectedRoute>
    //             <Dashboard />
    //           </ProtectedRoute>
    //         }
    //       />
          
    //       <Route
    //         path='/'
    //         element={<Navigate to="/dashboard" replace/>}
    //       />

    //       <Route
    //         path='/leaves'
    //         element={
    //           <ProtectedRoute>
    //             <LeavesPage />
    //           </ProtectedRoute>
    //         }
    //       />

    //       <Route
    //         path="/design"
    //         element={<PlaygroundPage />}
    //       />

    //       <Route
    //         path='/departments'
    //         element={<DepartmentsPage />}
    //       />
    //       <Route
    //         path='/employees'
    //         element={<EmployeesPage />}
    //       />
    //       <Route path="/login" element={
    //         <PublicRoute>
    //           <Login />
    //         </PublicRoute>
    //       } />
    //       <Route path="/register" element={
    //         <PublicRoute>
    //           <Register />
    //         </PublicRoute>
    //       } />

    //       <Route path="/employees" element={
    //         <ProtectedRoute>
    //           <EmployeesPage />
    //         </ProtectedRoute>
    //       } />
    //     </Routes>
    //   </BrowserRouter>
    // </Suspense>
    <BrowserRouter>
      <Routes>

        <Route element={<PlaygroundPage />}>

          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/leaves"
            element={<Leaves />}
          />

          <Route
            path="/directory"
            element={<Directory />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
    
  )
}

export default App
