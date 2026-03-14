import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navigation } from './components/Navigation';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Vote } from './pages/Vote';
import { Submit } from './pages/Submit';
import { Results } from './pages/Results';
import { Legal } from './pages/Legal';
import './styles/App.css';

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/kirjaudu" element={<Login />} />
      <Route path="/luo-tunnus" element={<Register />} />
      <Route path="/tulokset" element={<Results />} />
      <Route path="/tietosuoja" element={<Legal />} />
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <ProtectedRoute>
              <Vote />
            </ProtectedRoute>
          ) : (
            <Home />
          )
        }
      />
      <Route
        path="/aanesta"
        element={
          <ProtectedRoute>
            <Vote />
          </ProtectedRoute>
        }
      />
      <Route
        path="/laheta"
        element={
          <ProtectedRoute>
            <Submit />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Navigation />
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
