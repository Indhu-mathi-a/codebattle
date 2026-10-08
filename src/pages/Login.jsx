import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { LogIn, Users, User, Shield, Hash } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const login = useStore(state => state.login);
  
  const [teamName, setTeamName] = useState('');
  const [memberCount, setMemberCount] = useState(1);
  const [members, setMembers] = useState([{ name: '', regNo: '' }]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate
    if (teamName && members.every(m => m.name && m.regNo)) {
      login({ teamName, members });
      navigate('/dashboard');
    }
  };

  const handleCountChange = (e) => {
    const count = parseInt(e.target.value) || 1;
    // Limit between 1 and 4 for safety
    const validCount = Math.min(Math.max(count, 1), 4);
    setMemberCount(validCount);
    
    setMembers(prev => {
      const newMembers = [...prev];
      if (validCount > newMembers.length) {
        for (let i = newMembers.length; i < validCount; i++) {
          newMembers.push({ name: '', regNo: '' });
        }
      } else if (validCount < newMembers.length) {
        newMembers.length = validCount;
      }
      return newMembers;
    });
  };

  const handleMemberChange = (index, field, value) => {
    setMembers(prev => {
      const newMembers = [...prev];
      newMembers[index] = { ...newMembers[index], [field]: value };
      return newMembers;
    });
  };

  return (
    <div className="page-container container" style={{ alignItems: 'center', justifyContent: 'center' }}>
      <div className="glass-panel animate-slide-up p-1-mobile w-full-mobile" style={{ padding: '2rem 3rem', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '2rem' }}>
          PARTICIPANT <span className="text-gradient">LOGIN</span>
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label className="form-label"><Users size={16} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '0.5rem' }}/> Team Name</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="e.g. Code Ninjas"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label className="form-label"><Hash size={16} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '0.5rem' }}/> Team Members Count</label>
            <select 
              className="form-control" 
              value={memberCount} 
              onChange={handleCountChange}
            >
              <option value={1}>1 Member</option>
              <option value={2}>2 Members</option>
              <option value={3}>3 Members</option>
              <option value={4}>4 Members</option>
            </select>
          </div>

          {members.map((member, index) => (
            <div key={index} style={{ padding: '1rem', background: 'var(--bg-inset-light)', borderRadius: 'var(--radius-md)', marginBottom: '1rem', border: '1px solid var(--border-subtle)' }}>
              <div style={{ marginBottom: '1rem', fontWeight: 'bold', color: 'var(--primary)', fontSize: '0.9rem', textTransform: 'uppercase' }}>
                Team Member {index + 1}
              </div>
              
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label className="form-label"><User size={16} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '0.5rem' }}/> Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder={`e.g. Student ${index + 1}`}
                  value={member.name}
                  onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group" style={{ marginBottom: '0' }}>
                <label className="form-label"><Shield size={16} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '0.5rem' }}/> Registration Number</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. 24CCE001"
                  value={member.regNo}
                  onChange={(e) => handleMemberChange(index, 'regNo', e.target.value)}
                  required
                />
              </div>
            </div>
          ))}
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', fontSize: '1.1rem' }}>
            START BATTLE <LogIn size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
