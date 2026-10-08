import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Home, Star, Trash2 } from 'lucide-react';
import { useStore } from '../store';

const Leaderboard = () => {
  const navigate = useNavigate();
  const { user, score, stars, isAdmin, removeTeam, logoutAdmin } = useStore();

  let displayData = [];
  if (user) {
    displayData.push({ team: user.teamName, score: score, stars: stars, members: user.members });
  }

  displayData.sort((a, b) => b.score - a.score);
  displayData.forEach((item, index) => {
    item.rank = index + 1;
    if (index === 0) item.medal = '🥇';
    else if (index === 1) item.medal = '🥈';
    else if (index === 2) item.medal = '🥉';
    else item.medal = '';
  });

  return (
    <div className="container page-container">
      <div className="flex-col-mobile gap-sm-mobile" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 className="text-center-mobile" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)' }}>
          <Trophy size={32} /> LIVE LEADERBOARD
        </h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {isAdmin && (
            <button className="btn btn-secondary" style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }} onClick={() => { logoutAdmin(); navigate('/'); }}>
               LOGOUT ADMIN
            </button>
          )}
          <button className="btn btn-secondary" onClick={() => navigate('/')}>
            <Home size={18} /> HOME
          </button>
        </div>
      </div>

      <div className="glass-panel animate-slide-up" style={{ padding: '0', overflowX: 'auto' }}>
        <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--bg-inset)', borderBottom: '1px solid var(--border-subtle)' }}>
              <th style={{ padding: '1.5rem', width: '100px', textAlign: 'center' }}>Rank</th>
              <th style={{ padding: '1.5rem' }}>Team</th>
              <th style={{ padding: '1.5rem', textAlign: 'right' }}>Score</th>
              <th style={{ padding: '1.5rem', textAlign: 'right' }}>Stars</th>
              {isAdmin && <th style={{ padding: '1.5rem', textAlign: 'right' }}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {displayData.length > 0 ? (
              displayData.map((row, index) => (
                <tr 
                  key={index} 
                  style={{ 
                    borderBottom: '1px solid var(--border-subtle)',
                    background: user && row.team === user.teamName ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
                    transition: 'background 0.2s'
                  }}
                >
                  <td style={{ padding: '1.5rem', textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold', color: row.rank <= 3 ? 'var(--text-highlight)' : 'var(--text-muted)' }}>
                    {row.medal || `#${row.rank}`}
                  </td>
                  <td style={{ padding: '1.5rem', fontSize: '1.2rem', fontWeight: 'bold' }}>
                    {row.team} {user && row.team === user.teamName && <span style={{ fontSize: '0.8rem', color: 'var(--primary)', marginLeft: '0.5rem', verticalAlign: 'middle' }}>(YOU)</span>}
                    {row.members && (
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem', fontWeight: 'normal' }}>
                        {row.members.map(m => m.name).join(', ')}
                      </div>
                    )}
                  </td>
                  <td style={{ padding: '1.5rem', textAlign: 'right', fontSize: '1.2rem', color: 'var(--accent)', fontWeight: 'bold', fontFamily: 'var(--font-mono)' }}>
                    {row.score.toLocaleString()}
                  </td>
                  <td style={{ padding: '1.5rem', textAlign: 'right', fontSize: '1.2rem', color: '#f59e0b', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.25rem' }}>
                    {row.stars} <Star size={16} fill="#f59e0b" />
                  </td>
                  {isAdmin && (
                    <td style={{ padding: '1.5rem', textAlign: 'right' }}>
                      <button 
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to remove team ${row.team}?`)) {
                            removeTeam();
                          }
                        }} 
                        style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--danger)', color: 'var(--danger)', cursor: 'pointer', padding: '0.5rem', borderRadius: 'var(--radius-sm)', transition: 'all 0.2s ease' }}
                        title="Remove Team"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={isAdmin ? "5" : "4"} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                  No teams have started the battle yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
