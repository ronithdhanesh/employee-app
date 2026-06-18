import { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard/Dashboard"
import Directory from "./pages/Directory/Directory";
import Leaves from "./pages/Leaves/Leaves";
import { AuthProvider } from "./context/AuthContext";


const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const AppLayout = lazy(() => import("./layouts/AppLayout"));
const ProtectedRoute = lazy(() => import("./routes/ProtectedRoute"));
const PublicRoute = lazy(() => import("./routes/PublicRoute"));

const Profile = lazy(() => import("./pages/Profile/Profile"));
const Settings = lazy(() => import("./pages/Settings/Settings"));
const RoleBasedDashboard = lazy(() => import("./routes/RoleBasedDashboard"));
const RoleBasedDirectory = lazy(() => import("./routes/RoleBasedDirectory"));
const RoleBasedLeaves = lazy(() => import("./routes/RoleBasedLeaves"));

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
            Loading...
          </div>
        }
      >
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<RoleBasedDashboard />} />
            <Route
              path="dashboard"
              element={<RoleBasedDashboard />}
            />
            <Route path="profile" element={<Profile />} />
            <Route path="leaves" element={<RoleBasedLeaves />} />
            <Route path="directory" element={<RoleBasedDirectory />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route
            path="*"
            element={<Navigate to="/login" replace />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
