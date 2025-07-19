import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Plus, Sparkles, Eye, ArrowLeft } from 'lucide-react';

const CrushCalculator = () => {
  const { username } = useParams();
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [percentage, setPercentage] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [showPrank, setShowPrank] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [sparkles, setSparkles] = useState([]);
  const [ownerExists, setOwnerExists] = useState(true);

  useEffect(() => {
    // Mock check if username exists - will be replaced with real API
    if (!username) {
      setOwnerExists(false);
    }
  }, [username]);

  const calculateLove = async () => {
    if (!name1.trim() || !name2.trim()) return;
    
    setIsCalculating(true);
    setShowResult(false);
    setShowPrank(false);
    
    // Generate sparkles
    const newSparkles = Array.from({ length: 4 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: Math.random() * 360,
    }));
    setSparkles(newSparkles);
    
    // Submit to backend (mock for now)
    const submissionData = {
      username,
      name1: name1.trim(),
      name2: name2.trim(),
      timestamp: new Date().toISOString()
    };
    
    console.log('Submitting:', submissionData);
    
    // Simulate calculation time
    setTimeout(() => {
      const randomPercentage = Math.floor(Math.random() * 101);
      setPercentage(randomPercentage);
      setShowResult(true);
      setIsCalculating(false);
      setSparkles([]);
      
      // Show the prank reveal after 3 seconds
      setTimeout(() => {
        setShowPrank(true);
      }, 3000);
      
    }, 2000);
  };

  const resetCalculator = () => {
    setName1('');
    setName2('');
    setPercentage(null);
    setShowResult(false);
    setShowPrank(false);
    setIsCalculating(false);
  };

  const getResultMessage = (percent) => {
    if (percent >= 80) return "Soulmates! 💕";
    if (percent >= 60) return "Perfect match! 💖";
    if (percent >= 40) return "Good vibes! ✨";
    if (percent >= 20) return "Maybe friends? 🤔";
    return "Nah bestie... 💀";
  };

  if (!ownerExists) {
    return (
      <div className="error-page">
        <div className="error-container">
          <Heart size={64} />
          <h1>Link Not Found</h1>
          <p>This crush calculator link doesn't exist.</p>
          <Link to="/" className="primary-btn">
            Create Your Own
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="calculator-page">
      <div className="calculator-container">
        <div className="floating-elements">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="floating-heart"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${8 + Math.random() * 4}s`,
              }}
            >
              <Heart size={6 + Math.random() * 8} />
            </div>
          ))}
        </div>

        <div className="calculator-attribution">
          <p>This is <strong>{username}</strong>'s crush calculator</p>
        </div>

        <div className="main-calculator">
          <div className="header-section">
            <h1 className="calculator-title">
              💕 Crush Calculator 💕
            </h1>
            <p className="calculator-subtitle">
              Find out your love compatibility! 
            </p>
          </div>

          <div className="input-section">
            <div className="input-container">
              <input
                type="text"
                placeholder="Your name"
                value={name1}
                onChange={(e) => setName1(e.target.value)}
                className="name-input"
                disabled={isCalculating}
              />
            </div>

            <div className="plus-icon">
              <Plus size={32} />
            </div>

            <div className="input-container">
              <input
                type="text"
                placeholder="Crush's name"
                value={name2}
                onChange={(e) => setName2(e.target.value)}
                className="name-input"
                disabled={isCalculating}
              />
            </div>
          </div>

          <div className="heart-section">
            <div className={`calculator-heart ${isCalculating ? 'beating' : ''}`}>
              <Heart 
                size={80} 
                className="heart-icon" 
                fill="currentColor"
              />
              
              {sparkles.map((sparkle) => (
                <div
                  key={sparkle.id}
                  className="sparkle"
                  style={{
                    left: `${sparkle.x}%`,
                    top: `${sparkle.y}%`,
                    transform: `rotate(${sparkle.rotation}deg)`,
                  }}
                >
                  <Sparkles size={16} />
                </div>
              ))}
            </div>
          </div>

          {!showResult && !isCalculating && (
            <button 
              onClick={calculateLove}
              className="calculate-btn"
              disabled={!name1.trim() || !name2.trim()}
            >
              Calculate Love 💖
            </button>
          )}

          {isCalculating && (
            <div className="calculating-state">
              <div className="loading-spinner"></div>
              <p className="calculating-text">Calculating your love... ✨</p>
            </div>
          )}

          {showResult && !showPrank && (
            <div className="result-section">
              <div className="percentage-display">
                <span className="percentage-number">{percentage}%</span>
                <p className="result-message">{getResultMessage(percentage)}</p>
              </div>
            </div>
          )}

          {showPrank && (
            <div className="prank-reveal">
              <div className="prank-content">
                <div className="prank-icon">
                  <Eye size={40} />
                </div>
                <h2 className="prank-title">GOTCHA! 😈</h2>
                <p className="prank-message">
                  You've been pranked! <br/>
                  <strong>{username}</strong> now knows that <br/>
                  <span className="names-reveal">{name1} likes {name2}</span> 👀
                </p>
                <div className="prank-actions">
                  <button onClick={resetCalculator} className="reset-btn">
                    Try Again 🔄
                  </button>
                  <Link to="/" className="create-own-btn">
                    Create Your Own
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="calculator-footer">
          <Link to="/" className="footer-link">
            Create your own crush calculator
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CrushCalculator;