import React, { useState, useEffect } from 'react';
import { Heart, Eye, Users, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [crushData, setCrushData] = useState([]);

  // Mock data for now - will be replaced with real backend data
  const mockData = [
    { id: 1, name1: "Sumeet", name2: "Papally", percentage: 87, timestamp: "2 hours ago" },
    { id: 2, name1: "Rahul", name2: "Priya", percentage: 65, timestamp: "5 hours ago" },
    { id: 3, name1: "Amit", name2: "Sneha", percentage: 43, timestamp: "1 day ago" },
    { id: 4, name1: "Karan", name2: "Ananya", percentage: 92, timestamp: "2 days ago" },
    { id: 5, name1: "Rohan", name2: "Isha", percentage: 28, timestamp: "3 days ago" },
  ];

  useEffect(() => {
    // For now using mock data, later will fetch from backend
    setCrushData(mockData);
  }, []);

  return (
    <div className="admin-page">
      <div className="admin-container">
        <div className="admin-header">
          <button 
            onClick={() => navigate('/')} 
            className="back-btn"
          >
            <ArrowLeft size={20} />
            Back to Calculator
          </button>
          
          <div className="admin-title">
            <Eye size={32} />
            <h1>Secret Admin Panel</h1>
            <p>All the crushes revealed! 😈</p>
          </div>
        </div>

        <div className="stats-section">
          <div className="stat-card">
            <Users size={24} />
            <div>
              <span className="stat-number">{crushData.length}</span>
              <span className="stat-label">Total Submissions</span>
            </div>
          </div>
          
          <div className="stat-card">
            <Heart size={24} />
            <div>
              <span className="stat-number">
                {crushData.filter(item => item.percentage >= 70).length}
              </span>
              <span className="stat-label">High Matches</span>
            </div>
          </div>
        </div>

        <div className="crush-list">
          <h2 className="list-title">All Crush Confessions 💕</h2>
          
          {crushData.length === 0 ? (
            <div className="empty-state">
              <Heart size={48} />
              <p>No crushes revealed yet...</p>
              <p>Share the calculator link to start collecting! 😏</p>
            </div>
          ) : (
            <div className="crush-items">
              {crushData.map((item) => (
                <div key={item.id} className="crush-item">
                  <div className="crush-info">
                    <div className="names">
                      <span className="name">{item.name1}</span>
                      <Heart size={16} className="heart-separator" />
                      <span className="crush-name">{item.name2}</span>
                    </div>
                    <div className="percentage-badge">
                      {item.percentage}%
                    </div>
                  </div>
                  <div className="timestamp">
                    {item.timestamp}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;