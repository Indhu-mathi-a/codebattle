import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import BattleArena from './pages/BattleArena';
import Results from './pages/Results';
import Leaderboard from './pages/Leaderboard';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import { useStore } from './store';
import { Moon, Sun } from 'lucide-react';

const ProtectedRoute = ({ children }) => {
  const user = useStore(state => state.user);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Protected Admin Route Component
const ProtectedAdminRoute = ({ children }) => {
  const isAdmin = useStore(state => state.isAdmin);
  if (!isAdmin) {
    return <Navigate to="/admin-login" replace />;
  }
  return children;
};

function App() {
  const { theme, toggleTheme } = useStore();

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <Router>
      <button 
        onClick={toggleTheme}
        style={{ 
          position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999, 
          background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', 
          borderRadius: '50%', width: '50px', height: '50px', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', 
          cursor: 'pointer', color: 'var(--text-main)', boxShadow: 'var(--shadow-md)',
          transition: 'all 0.3s ease'
        }}
        title="Toggle Theme"
      >
        {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
      </button>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/battle" element={
          <ProtectedRoute>
            <BattleArena />
          </ProtectedRoute>
        } />
        <Route path="/results" element={
          <ProtectedRoute>
            <Results />
          </ProtectedRoute>
        } />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={
          <ProtectedAdminRoute>
            <Admin />
          </ProtectedAdminRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
