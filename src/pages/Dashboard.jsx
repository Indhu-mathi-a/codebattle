import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { Play, Star, CheckCircle, XCircle, Circle, Trophy } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, questions, score, stars, completedQuestions, goToQuestion } = useStore();

  const handleQuestionClick = (index) => {
    goToQuestion(index);
    navigate('/battle');
  };

  return (
    <div className="container page-container">
      <div className="flex-col-mobile" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem' }}>
        
        {/* Left Side: Questions Grid */}
        <div className="w-full-mobile" style={{ flex: '1 1 60%' }}>
          <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Play size={24} color="var(--primary)" /> QUESTION NAVIGATOR
          </h2>
          
          <div className="glass-panel p-1-mobile" style={{ padding: '2rem' }}>
            <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))', gap: '1rem' }}>
              {questions.map((q, index) => {
                const status = completedQuestions[q.id];
                let bgColor = 'var(--bg-inset-light)';
                let borderColor = 'var(--border-subtle)';
                let Icon = Circle;
                
                if (status) {
                  if (status.isCorrect) {
                    bgColor = 'rgba(16, 185, 129, 0.2)';
                    borderColor = 'var(--success)';
                    Icon = CheckCircle;
                  } else {
                    bgColor = 'rgba(239, 68, 68, 0.2)';
                    borderColor = 'var(--danger)';
                    Icon = XCircle;
                  }
                }
                
                return (
                  <button
                    key={q.id}
                    onClick={() => handleQuestionClick(index)}
                    style={{
                      background: bgColor,
                      border: `1px solid ${borderColor}`,
                      borderRadius: 'var(--radius-md)',
                      padding: '1rem 0.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.5rem',
                      cursor: 'pointer',
                      color: 'var(--text-main)',
                      transition: 'all 0.2s ease',
                      position: 'relative'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{String(index + 1).padStart(2, '0')}</span>
                    {status?.isCorrect && (
                      <Star size={14} color="#f59e0b" fill="#f59e0b" style={{ position: 'absolute', top: -5, right: -5 }} className="animate-star" />
                    )}
                  </button>
                );
              })}
            </div>
            
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2rem', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><CheckCircle size={14} color="var(--success)"/> Correct</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><XCircle size={14} color="var(--danger)"/> Wrong</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Circle size={14} /> Not attempted</span>
            </div>
          </div>
        </div>

        {/* Right Side: Dashboard Stats */}
        <div className="w-full-mobile mt-1-mobile" style={{ flex: '1 1 30%', minWidth: '300px' }}>
          <div className="glass-panel p-1-mobile" style={{ padding: '2rem', position: 'sticky', top: '2rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-subtle)' }}>
              <h3 style={{ color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem', marginBottom: '1rem' }}>{user.teamName}</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {user.members && user.members.map((member, idx) => (
                  <div key={idx} style={{ background: 'var(--bg-inset-light)', padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{member.name}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{member.regNo}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Your Score</div>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--accent)', textShadow: '0 0 10px var(--accent-glow)' }}>
                {score.toLocaleString()}
              </div>
            </div>
            
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Stars Earned</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                {Array.from({ length: 10 }).map((_, i) => (
                  <Star key={i} size={24} color={i < stars ? '#f59e0b' : '#333'} fill={i < stars ? '#f59e0b' : 'transparent'} />
                ))}
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.95rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Correct</span>
                <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>{Object.values(completedQuestions).filter(q => q.isCorrect).length}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Wrong</span>
                <span style={{ color: 'var(--danger)', fontWeight: 'bold' }}>{Object.values(completedQuestions).filter(q => !q.isCorrect).length}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Completed</span>
                <span style={{ fontWeight: 'bold' }}>{Object.keys(completedQuestions).length} / {questions.length}</span>
              </div>
            </div>
            
            <button 
              className="btn btn-primary" 
              style={{ width: '100%', marginTop: '2rem' }}
              onClick={() => {
                // Find next unattempted
                const nextIndex = questions.findIndex(q => !completedQuestions[q.id]);
                if (nextIndex !== -1) {
                  handleQuestionClick(nextIndex);
                } else {
                  handleQuestionClick(0);
                }
              }}
            >
              CONTINUE BATTLE <Play size={18} />
            </button>

            <button 
              className="btn btn-secondary" 
              style={{ width: '100%', marginTop: '1rem' }}
              onClick={() => navigate('/leaderboard')}
            >
              VIEW LEADERBOARD <Trophy size={18} />
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;
