import { useState, useMemo, useCallback } from 'react';
import content from '../content.js';
import './WelcomeScreen.css';

export default function WelcomeScreen({ onEnter }) {
  const [isOpening, setIsOpening] = useState(false);

  // Generate ~50 twinkling stars with stable, organic distribution
  const stars = useMemo(() => {
    const starList = [];
    for (let i = 0; i < 52; i++) {
      const top = ((i * 19 + 7) % 96) + (i % 3);
      const left = ((i * 29 + 13) % 96) + (i % 4);
      const size = i % 5 === 0 ? 3 : i % 3 === 0 ? 2 : 1.5;
      const duration = 2.2 + ((i * 7) % 35) / 10;
      const delay = ((i * 11) % 40) / 10;
      starList.push({ id: i, top, left, size, duration, delay });
    }
    return starList;
  }, []);

  // Subtle romantic floating hearts in the background
  const hearts = useMemo(
    () => [
      { id: 1, left: 10, size: 16, duration: 18, delay: 0 },
      { id: 2, left: 24, size: 20, duration: 22, delay: 4 },
      { id: 3, left: 42, size: 14, duration: 16, delay: 8 },
      { id: 4, left: 58, size: 22, duration: 24, delay: 2 },
      { id: 5, left: 74, size: 16, duration: 19, delay: 6 },
      { id: 6, left: 88, size: 18, duration: 21, delay: 10 },
      { id: 7, left: 34, size: 15, duration: 20, delay: 13 },
    ],
    []
  );

  // Gentle stardust particles floating in the night sky
  const particles = useMemo(() => {
    const particleList = [];
    for (let i = 0; i < 18; i++) {
      const top = ((i * 23 + 11) % 85) + 6;
      const left = ((i * 37 + 5) % 90) + 5;
      const size = i % 3 === 0 ? 3.5 : 2;
      const duration = 4.5 + (i % 4);
      const delay = (i % 6) * 0.7;
      particleList.push({ id: i, top, left, size, duration, delay });
    }
    return particleList;
  }, []);

  // Heart-opening click handler
  const handleHeartClick = useCallback(() => {
    if (isOpening) return;
    setIsOpening(true);

    // After heart-opening animation completes, reveal website
    setTimeout(() => {
      if (typeof onEnter === 'function') {
        onEnter();
      }
    }, 950);
  }, [isOpening, onEnter]);

  return (
    <div
      className={`welcome-screen ${isOpening ? 'is-opening' : ''}`}
      role="region"
      aria-label="Welcome universe"
    >
      {/* Soft Moon & Ethereal Glow in Top-Right */}
      <div className="welcome-moon-container" aria-hidden="true">
        <div className="welcome-moon-halo" />
        <div className="welcome-moon-crescent" />
      </div>

      {/* 50+ Twinkling Stars */}
      <div className="welcome-stars" aria-hidden="true">
        {stars.map((star) => (
          <span
            key={star.id}
            className="welcome-star"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Floating Particles (Stardust) */}
      <div className="welcome-particles" aria-hidden="true">
        {particles.map((p) => (
          <span
            key={p.id}
            className="welcome-particle"
            style={{
              top: `${p.top}%`,
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Subtle Floating Background Hearts */}
      <div className="welcome-hearts" aria-hidden="true">
        {hearts.map((h) => (
          <div
            key={h.id}
            className="welcome-heart"
            style={{
              left: `${h.left}%`,
              width: `${h.size}px`,
              height: `${h.size}px`,
              animationDuration: `${h.duration}s`,
              animationDelay: `${h.delay}s`,
            }}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <main className="welcome-content">
        <div className="welcome-badge">
          <span>✦</span>
          <span>A gift from the heart</span>
          <span>✦</span>
        </div>

        {/* Required Tagline */}
        <h1 className="welcome-tagline">
          {content.openingTagline ||
            'A little universe, made just for you, Khushi ❤️'}
        </h1>

        {/* Central Glowing Interactive Heart Stage */}
        <div className="welcome-heart-stage">
          {/* Radiant pulse aura rings */}
          <div className="heart-aura-ring ring-1" aria-hidden="true" />
          <div className="heart-aura-ring ring-2" aria-hidden="true" />
          <div className="heart-aura-ring ring-3" aria-hidden="true" />

          {/* Glowing central heart button */}
          <button
            type="button"
            className="glowing-heart-btn"
            onClick={handleHeartClick}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleHeartClick();
              }
            }}
            aria-label="Tap the glowing heart to begin your birthday surprise"
          >
            {/* SVG Glowing Heart */}
            <div className="glowing-heart-svg-wrap">
              <svg
                viewBox="0 0 100 100"
                className="glowing-heart-svg"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff758c" />
                    <stop offset="50%" stopColor="#ff4b6e" />
                    <stop offset="100%" stopColor="#d81b60" />
                  </linearGradient>
                  <filter id="heartGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Outer Glow Path */}
                <path
                  d="M50,88.5 C48.5,87 12,56.5 12,32 C12,18.5 23,8 36,8 C43.5,8 48,12 50,15 C52,12 56.5,8 64,8 C77,8 88,18.5 88,32 C88,56.5 51.5,87 50,88.5 Z"
                  fill="url(#heartGradient)"
                  filter="url(#heartGlow)"
                  className="heart-base-shape"
                />

                {/* Inner Highlight Detail */}
                <path
                  d="M36,14 C27,14 18,22 18,33 C18,46 36,66 50,78 C42,66 26,48 26,35 C26,26 31,20 36,18 Z"
                  fill="rgba(255, 255, 255, 0.45)"
                  className="heart-highlight"
                />
              </svg>

              {/* Sparkle stars around heart */}
              <span className="heart-sparkle sparkle-tl" aria-hidden="true">✨</span>
              <span className="heart-sparkle sparkle-tr" aria-hidden="true">✦</span>
              <span className="heart-sparkle sparkle-br" aria-hidden="true">✨</span>
              <span className="heart-sparkle sparkle-bl" aria-hidden="true">✦</span>
            </div>
          </button>
        </div>

        {/* Required Subtext prompt under the heart */}
        <p className="welcome-subtext heart-prompt">
          <span className="prompt-arrow">👇</span>
          <span>{content.openingSubtext || 'Tap the heart to begin.'}</span>
          <span className="prompt-sparkle">✨</span>
        </p>
      </main>

      {/* Heart-opening burst light flash overlay */}
      {isOpening && (
        <div className="heart-opening-burst" aria-hidden="true">
          <div className="burst-flash" />
          <div className="burst-rays" />
        </div>
      )}
    </div>
  );
}
