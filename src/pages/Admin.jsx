import React, { useState } from 'react';
import { Shield, Users, Database, Activity, Plus } from 'lucide-react';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="container page-container">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
        <Shield size={32} color="var(--primary)" />
        <h2>ADMIN DASHBOARD</h2>
      </div>

      <div className="admin-layout gap-sm-mobile" style={{ display: 'flex', gap: '2rem' }}>
        {/* Sidebar */}
        <div className="admin-sidebar" style={{ width: '250px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button 
            className={`btn ${activeTab === 'dashboard' ? 'btn-primary' : 'btn-secondary'}`} 
            style={{ justifyContent: 'flex-start' }}
            onClick={() => setActiveTab('dashboard')}
          >
            <Activity size={18} /> Overview
          </button>
          <button 
            className={`btn ${activeTab === 'questions' ? 'btn-primary' : 'btn-secondary'}`} 
            style={{ justifyContent: 'flex-start' }}
            onClick={() => setActiveTab('questions')}
          >
            <Database size={18} /> Question Bank
          </button>
          <button 
            className={`btn ${activeTab === 'teams' ? 'btn-primary' : 'btn-secondary'}`} 
            style={{ justifyContent: 'flex-start' }}
            onClick={() => setActiveTab('teams')}
          >
            <Users size={18} /> Teams & Players
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1 }}>
          {activeTab === 'dashboard' && (
            <div className="glass-panel animate-slide-up p-1-mobile" style={{ padding: '2rem' }}>
              <h3 style={{ marginBottom: '1.5rem', color: 'var(--accent)' }}>LIVE STATISTICS</h3>
              <div className="admin-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                <div style={{ background: 'var(--bg-inset)', padding: '1.5rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Participants</div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>80</div>
                </div>
                <div style={{ background: 'var(--bg-inset)', padding: '1.5rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Teams</div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>20</div>
                </div>
                <div style={{ background: 'var(--bg-inset)', padding: '1.5rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Questions Solved</div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--success)' }}>1,428</div>
                </div>
                <div style={{ background: 'var(--bg-inset)', padding: '1.5rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Stars Earned</div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b' }}>1,231</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'questions' && (
            <div className="glass-panel animate-slide-up" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ color: 'var(--primary)' }}>QUESTION MANAGEMENT</h3>
                <button className="btn btn-primary btn-sm" style={{ padding: '0.5rem 1rem' }}><Plus size={16} /> ADD QUESTION</button>
              </div>
              
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-inset)', borderBottom: '1px solid var(--border-subtle)' }}>
                    <th style={{ padding: '1rem' }}>ID</th>
                    <th style={{ padding: '1rem' }}>Title</th>
                    <th style={{ padding: '1rem' }}>Difficulty</th>
                    <th style={{ padding: '1rem' }}>Topic</th>
                    <th style={{ padding: '1rem' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '1rem' }}>Q01</td>
                    <td style={{ padding: '1rem' }}>Fibonacci Series</td>
                    <td style={{ padding: '1rem' }}><span style={{ color: 'var(--warning)' }}>Medium</span></td>
                    <td style={{ padding: '1rem' }}>Loops</td>
                    <td style={{ padding: '1rem' }}><button className="btn btn-secondary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }}>Edit</button></td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '1rem' }}>Q02</td>
                    <td style={{ padding: '1rem' }}>Even or Odd</td>
                    <td style={{ padding: '1rem' }}><span style={{ color: 'var(--success)' }}>Easy</span></td>
                    <td style={{ padding: '1rem' }}>Conditionals</td>
                    <td style={{ padding: '1rem' }}><button className="btn btn-secondary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }}>Edit</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
