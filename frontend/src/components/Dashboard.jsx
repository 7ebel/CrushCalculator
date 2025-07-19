import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Heart, Users, Link as LinkIcon, Copy, Eye, Calendar, ExternalLink, LogOut, Share } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [crushData, setCrushData] = useState([]);
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({ total: 0, today: 0, thisWeek: 0 });
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Mock data - will be replaced with real API
    const mockData = [
      { 
        id: 1, 
        name1: "Alex", 
        name2: "Sarah", 
        percentage: 87, 
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        ip: "192.168.1.xxx"
      },
      { 
        id: 2, 
        name1: "Michael", 
        name2: "Emma", 
        percentage: 65, 
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        ip: "10.0.0.xxx"
      },
      { 
        id: 3, 
        name1: "Jake", 
        name2: "Lisa", 
        percentage: 43, 
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        ip: "172.16.0.xxx"
      },
    ];

    setCrushData(mockData);
    setStats({
      total: mockData.length,
      today: mockData.filter(item => 
        new Date(item.timestamp).toDateString() === new Date().toDateString()
      ).length,
      thisWeek: mockData.filter(item => 
        new Date(item.timestamp) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      ).length
    });
  }, [user, navigate]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(user?.customLink || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = now - time;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return `${Math.floor(diff / 86400000)}d ago`;
  };

  if (!user) return null;

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-left">
            <div className="dashboard-logo">
              <Heart size={24} />
              <span>CrushCalc</span>
            </div>
            <div className="user-info">
              <span className="welcome-text">Welcome back, <strong>{user.username}</strong>!</span>
            </div>
          </div>
          
          <div className="header-right">
            <button onClick={handleLogout} className="logout-btn">
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </header>

        {/* Quick Stats */}
        <section className="stats-section">
          <div className="stat-card primary">
            <div className="stat-icon">
              <Users size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-number">{stats.total}</span>
              <span className="stat-label">Total Submissions</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <Calendar size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-number">{stats.today}</span>
              <span className="stat-label">Today</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <Eye size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-number">{stats.thisWeek}</span>
              <span className="stat-label">This Week</span>
            </div>
          </div>
        </section>

        {/* Share Link Section */}
        <section className="share-section">
          <div className="share-card">
            <div className="share-header">
              <LinkIcon size={20} />
              <h3>Your Personal Link</h3>
            </div>
            <div className="share-content">
              <div className="link-display">
                <code>{user.customLink}</code>
                <button 
                  onClick={handleCopyLink}
                  className={`copy-btn ${copied ? 'copied' : ''}`}
                >
                  <Copy size={16} />
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="share-actions">
                <a 
                  href={`https://twitter.com/intent/tweet?text=Find out your love compatibility! 💕&url=${encodeURIComponent(user.customLink)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-btn twitter"
                >
                  Share on Twitter
                </a>
                <a 
                  href={`https://wa.me/?text=${encodeURIComponent(`Find out your love compatibility! 💕 ${user.customLink}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-btn whatsapp"
                >
                  Share on WhatsApp
                </a>
                <Link 
                  to={`/c/${user.username}`}
                  className="share-btn preview"
                >
                  <ExternalLink size={16} />
                  Preview
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Submissions List */}
        <section className="submissions-section">
          <div className="submissions-header">
            <h2>Recent Submissions</h2>
            <div className="submissions-count">{crushData.length} total</div>
          </div>

          {crushData.length === 0 ? (
            <div className="empty-state">
              <Heart size={48} />
              <h3>No submissions yet</h3>
              <p>Share your link with friends to start collecting crush data!</p>
              <button onClick={handleCopyLink} className="primary-btn">
                <Share size={18} />
                Share Your Link
              </button>
            </div>
          ) : (
            <div className="submissions-list">
              {crushData.map((item) => (
                <div key={item.id} className="submission-item">
                  <div className="submission-main">
                    <div className="submission-names">
                      <span className="name-primary">{item.name1}</span>
                      <Heart size={16} className="heart-separator" />
                      <span className="name-secondary">{item.name2}</span>
                    </div>
                    <div className="submission-percentage">
                      {item.percentage}%
                    </div>
                  </div>
                  <div className="submission-meta">
                    <span className="submission-time">{formatTime(item.timestamp)}</span>
                    <span className="submission-ip">from {item.ip}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;