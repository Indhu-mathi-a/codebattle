import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { Star, Trophy, ArrowRight } from 'lucide-react';

const Results = () => {
  const navigate = useNavigate();
  const { user, score, stars, completedQuestions, questions } = useStore();

  const totalQuestions = questions.length;
  const attempted = Object.keys(completedQuestions).length;
  const correct = Object.values(completedQuestions).filter(q => q.isCorrect).length;

  return (
    <div className="page-container container" style={{ alignItems: 'center', justifyContent: 'center' }}>
      <div className="glass-panel animate-slide-up" style={{ padding: '3rem', width: '100%', maxWidth: '600px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>BATTLE COMPLETE</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Great job, Team {user?.teamName}!</p>
        
        <div className="results-top gap-sm-mobile" style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2rem' }}>
          <div style={{ background: 'var(--bg-inset)', padding: '1.5rem', borderRadius: 'var(--radius-md)', minWidth: '150px' }}>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Final Score</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent)', textShadow: '0 0 10px var(--accent-glow)' }}>
              {score.toLocaleString()}
            </div>
          </div>
          
          <div style={{ background: 'var(--bg-inset)', padding: '1.5rem', borderRadius: 'var(--radius-md)', minWidth: '150px' }}>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Stars Collected</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              {stars} <Star size={28} fill="#f59e0b" />
            </div>
          </div>
        </div>
        
        <div className="results-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '3rem', textAlign: 'left', background: 'var(--bg-inset-light)', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
          <div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Attempted</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{attempted} / {totalQuestions}</div>
          </div>
          <div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Correct</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--success)' }}>{correct}</div>
          </div>
          <div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Accuracy</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{attempted > 0 ? Math.round((correct / attempted) * 100) : 0}%</div>
          </div>
        </div>

        <button className="btn btn-primary" style={{ width: '100%', fontSize: '1.2rem' }} onClick={() => navigate('/leaderboard')}>
          VIEW LEADERBOARD <Trophy size={20} />
        </button>
      </div>
    </div>
  );
};

export default Results;
