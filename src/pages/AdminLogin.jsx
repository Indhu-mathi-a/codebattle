import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';
import { useStore } from '../store';

const AdminLogin = () => {
  const navigate = useNavigate();
  const loginAdmin = useStore(state => state.loginAdmin);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      loginAdmin();
      navigate('/admin');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="page-container container" style={{ alignItems: 'center', justifyContent: 'center' }}>
      <div className="glass-panel animate-slide-up p-1-mobile w-full-mobile" style={{ padding: '2rem 3rem', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '2rem', color: 'var(--danger)' }}>
          ADMIN <span style={{ color: 'var(--text-main)' }}>LOGIN</span>
        </h2>
        
        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid var(--danger)', color: 'var(--danger)', padding: '0.75rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label className="form-label"><User size={16} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '0.5rem' }}/> Username</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Admin Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label className="form-label"><Lock size={16} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '0.5rem' }}/> Password</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', fontSize: '1.1rem', background: 'var(--danger)' }}>
            ACCESS SYSTEM <Lock size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
