import React, { useState } from 'react';
import { Heart, Plus, Sparkles, Eye } from 'lucide-react';
import { mockCalculations } from '../data/mock';

const CrushCalculator = () => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [percentage, setPercentage] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [showPrank, setShowPrank] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [sparkles, setSparkles] = useState([]);

  const calculateLove = () => {
    if (!name1.trim() || !name2.trim()) return;
    
    setIsCalculating(true);
    setShowResult(false);
    setShowPrank(false);
    
    // Generate sparkles
    const newSparkles = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: Math.random() * 360,
    }));
    setSparkles(newSparkles);
    
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

  return (
    <div className="calculator-page">
      <div className="calculator-container">
        <div className="floating-elements">
          {Array.from({ length: 12 }).map((_, i) => (
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
                  You've been fooled! <br/>
                  <strong>Biswa</strong> now knows that <br/>
                  <span className="names-reveal">{name1} likes {name2}</span> 👀
                </p>
                <button onClick={resetCalculator} className="reset-btn">
                  Try Again 🔄
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CrushCalculator;