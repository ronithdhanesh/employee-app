import { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/Dashboard/Dashboard"
import Profile from "./pages/Profile/Profile"
import Directory from "./pages/Directory/Directory";
import Leaves from "./pages/Leaves/Leaves";
import Settings from "./pages/Settings/Settings";
import { AuthProvider } from "./context/AuthContext";
import RoleBasedDirectory from "./routes/RoleBasedDirectory";
import RoleBasedLeaves from "./routes/RoleBasedLeaves";
import RoleBasedDashboard from "./routes/RoleBasedDashboard";

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center">
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
