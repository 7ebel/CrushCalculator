import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, Link as LinkIcon, BarChart3, Zap, Shield } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="landing-container">
        {/* Navigation */}
        <nav className="nav-bar">
          <div className="nav-content">
            <div className="logo">
              <Heart size={28} />
              <span>CrushCalc</span>
            </div>
            <div className="nav-links">
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-btn">Get Started</Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-badge">
              <Zap size={16} />
              <span>The Ultimate Crush Prank Platform</span>
            </div>
            
            <h1 className="hero-title">
              Create Your Own<br/>
              <span className="gradient-text">Crush Calculator</span>
            </h1>
            
            <p className="hero-subtitle">
              Get your personalized link, share with friends, and discover who has crushes. 
              The best prank tool that reveals all secrets to you! 😈
            </p>
            
            <div className="hero-actions">
              <Link to="/register" className="primary-btn">
                Create Your Link
                <LinkIcon size={20} />
              </Link>
              <Link to="/login" className="secondary-btn">
                Already have an account?
              </Link>
            </div>

            {/* Demo bars like Emergent.sh */}
            <div className="demo-bars">
              {Array.from({ length: 10 }).map((_, i) => (
                <div 
                  key={i} 
                  className="demo-bar"
                  style={{
                    height: `${30 + Math.random() * 40}px`,
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="features-section">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <LinkIcon size={32} />
              </div>
              <h3>Personal Links</h3>
              <p>Get your custom crushcalc.app/c/yourname link to share</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <BarChart3 size={32} />
              </div>
              <h3>Live Dashboard</h3>
              <p>See all crush submissions in real-time on your dashboard</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <Users size={32} />
              </div>
              <h3>Prank Friends</h3>
              <p>Friends think it's anonymous but you see everything! 😏</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <Shield size={32} />
              </div>
              <h3>Safe & Fun</h3>
              <p>Just harmless pranks with your friends - nothing malicious</p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="how-section">
          <h2 className="section-title">How it works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Create Account</h3>
              <p>Sign up and get your personalized link</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Share Link</h3>
              <p>Send your link to friends on social media</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Watch Magic</h3>
              <p>See their crush submissions on your dashboard!</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-logo">
              <Heart size={24} />
              <span>CrushCalc</span>
            </div>
            <p>The ultimate crush calculator prank platform</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;