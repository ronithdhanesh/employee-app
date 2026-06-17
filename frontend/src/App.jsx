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
import PlaygroundPage from "./pages/PlaygroundPage";
import Dashboard from "./components/MainContent/Dashboard/Dashboard";
import Profile from "./components/MainContent/Profile/Profile";
import Directory from "./components/MainContent/Directory/Directory";
import Leaves from "./components/MainContent/Leaves/Leaves";
import Settings from "./components/MainContent/Settings/Settings";
import { AuthProvider } from "./context/AuthContext";

const EmployeesPage = lazy(() =>
  import("./pages/EmployeesPage")
);

const DepartmentsPage = lazy(() =>
  import("./pages/Departments")
);

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
                <PlaygroundPage />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route
              path="dashboard"
              element={<Navigate to="/" replace />}
            />
            <Route path="profile" element={<Profile />} />
            <Route path="leaves" element={<Leaves />} />
            <Route path="directory" element={<Directory />} />
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
