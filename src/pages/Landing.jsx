import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, Code2, Trophy, Zap } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container" style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div className="animate-float" style={{ marginBottom: '2rem' }}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <Code2 size={80} color="var(--primary)" />
          <Zap size={40} color="var(--accent)" style={{ position: 'absolute', bottom: -10, right: -10 }} />
        </div>
      </div>
      
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem', textShadow: '0 0 20px var(--primary-glow)' }}>
        CODEBLOCKS <span className="text-gradient">BATTLE</span>
      </h1>
      
      <p style={{ fontSize: '1.5rem', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '600px' }}>
        Drag • Arrange • Run • Win <br/>
        <span style={{ fontSize: '1rem', marginTop: '1rem', display: 'block' }}>Python Team Competition</span>
      </p>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className="btn btn-primary animate-slide-up" style={{ fontSize: '1.2rem', padding: '1rem 3rem', animationDelay: '0.1s' }} onClick={() => navigate('/login')}>
          START BATTLE <Terminal size={20} />
        </button>
        
        <button className="btn btn-secondary animate-slide-up" style={{ fontSize: '1.2rem', padding: '1rem 3rem', animationDelay: '0.2s' }} onClick={() => navigate('/admin-login')}>
          ADMIN <Trophy size={20} />
        </button>
      </div>
    </div>
  );
};

export default Landing;
