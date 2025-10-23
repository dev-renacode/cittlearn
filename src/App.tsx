import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./guards";
import { Layout } from "./components/common/layout";
import { Home, Profile, Feed } from "./pages";
import { Login, Register } from "./components/domain/auth";
import { DashboardLayout } from "./components/domain/dashboard";
import {
  DashboardHome,
  DashboardUsers,
  DashboardPosts,
} from "./pages/dashboard";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rutas públicas con layout completo (header + footer) */}
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />

          {/* Rutas de autenticación sin layout (sin header ni footer) */}
          <Route
            path="/login"
            element={
              <ProtectedRoute requireAuth={false}>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute requireAuth={false}>
                <Register />
              </ProtectedRoute>
            }
          />

          {/* Rutas protegidas (requieren autenticación) */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute requireAuth={true}>
                <Layout>
                  <Profile />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/feed/*"
            element={
              <ProtectedRoute requireAuth={true}>
                <Layout>
                  <Feed />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Dashboard (Admin y Capitán) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requireAuth={true}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="usuarios" element={<DashboardUsers />} />
            <Route path="posts" element={<DashboardPosts />} />
          </Route>

          {/* Ruta 404 - Página no encontrada */}
          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                  <p className="text-gray-600 mb-4">Página no encontrada</p>
                  <a href="/" className="text-blue-600 hover:text-blue-500">
                    Volver al inicio
                  </a>
                </div>
              </div>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
