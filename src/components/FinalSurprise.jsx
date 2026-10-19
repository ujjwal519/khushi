import React, { useState } from 'react';
import content from '../content.js';
import './FinalSurprise.css';

// Pre-configured confetti and heart particle definitions
const PARTICLES = [
  { id: 1, type: 'char', char: '❤️', x: -65, y: -130, rot: -25, delay: 0.05, size: 22 },
  { id: 2, type: 'char', char: '💖', x: 60, y: -145, rot: 25, delay: 0.12, size: 24 },
  { id: 3, type: 'char', char: '✨', x: -115, y: -95, rot: 40, delay: 0.18, size: 20 },
  { id: 4, type: 'char', char: '🌸', x: 105, y: -115, rot: -30, delay: 0.08, size: 22 },
  { id: 5, type: 'char', char: '✨', x: -35, y: -170, rot: 15, delay: 0.22, size: 22 },
  { id: 6, type: 'char', char: '💕', x: 75, y: -160, rot: -20, delay: 0.26, size: 24 },
  { id: 7, type: 'confetti', color: '#d4a853', x: -85, y: -135, rot: 75, delay: 0.1, size: 10 },
  { id: 8, type: 'confetti', color: '#e85d75', x: 85, y: -135, rot: -60, delay: 0.14, size: 12 },
  { id: 9, type: 'confetti', color: '#faf3e8', x: -45, y: -180, rot: 40, delay: 0.2, size: 10 },
  { id: 10, type: 'confetti', color: '#b8a9c9', x: 35, y: -175, rot: -45, delay: 0.24, size: 11 },
  { id: 11, type: 'confetti', color: '#c9a0a0', x: -100, y: -85, rot: 90, delay: 0.16, size: 12 },
  { id: 12, type: 'confetti', color: '#ffd56b', x: 110, y: -95, rot: -80, delay: 0.18, size: 10 },
  { id: 13, type: 'char', char: '❤️', x: 0, y: -190, rot: 10, delay: 0.12, size: 26 },
  { id: 14, type: 'char', char: '✨', x: -75, y: -160, rot: -35, delay: 0.3, size: 20 },
  { id: 15, type: 'confetti', color: '#e85d75', x: 65, y: -185, rot: 55, delay: 0.22, size: 12 },
  { id: 16, type: 'char', char: '💖', x: -125, y: -115, rot: -15, delay: 0.25, size: 22 },
];

export default function FinalSurprise({ onRestart }) {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpen = () => {
    if (!isOpened) {
      setIsOpened(true);
    }
  };

  const handleRestartClick = () => {
    if (typeof onRestart === 'function') {
      onRestart();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section className="surprise-section" id="final-surprise" aria-label="Final Birthday Surprise">
      {/* Background glow effects */}
      <div className="surprise-ambient-glow" aria-hidden="true" />

      <div className="surprise-container">
        {/* Section Heading */}
        <header className="surprise-header">
          <h2 className="surprise-heading">{content.finalSurpriseHeading}</h2>
          <p className="surprise-subtext">
            {isOpened ? 'A little secret saved just for this moment ✨' : 'A special gift wrapped with love. Tap to open it.'}
          </p>
        </header>

        {/* Gift Box Interaction Area */}
        <div className="gift-stage">
          <div
            className={`gift-box-wrapper ${isOpened ? 'is-opened' : 'is-closed'}`}
            onClick={handleOpen}
            onKeyDown={(e) => {
              if ((e.key === 'Enter' || e.key === ' ') && !isOpened) {
                e.preventDefault();
                handleOpen();
              }
            }}
            role="button"
            tabIndex={isOpened ? -1 : 0}
            aria-label={isOpened ? 'Gift opened' : 'Birthday gift box. Tap to open.'}
            aria-expanded={isOpened}
          >
            {/* Confetti & Hearts Burst (Active on Open) */}
            {isOpened && (
              <div className="burst-container" aria-hidden="true">
                {PARTICLES.map((p) => (
                  <span
                    key={`particle-${p.id}`}
                    className={`burst-particle particle-${p.type}`}
                    style={{
                      '--target-x': `${p.x}px`,
                      '--target-y': `${p.y}px`,
                      '--target-rot': `${p.rot}deg`,
                      '--particle-delay': `${p.delay}s`,
                      '--particle-color': p.color || 'transparent',
                      '--particle-size': `${p.size}px`,
                    }}
                  >
                    {p.type === 'char' ? p.char : ''}
                  </span>
                ))}
              </div>
            )}

            {/* Glowing Message Card (rises from inside the box) */}
            <div className={`message-card-envelope ${isOpened ? 'card-revealed' : ''}`}>
              <div className="message-card">
                <div className="message-card-shimmer" />
                <div className="message-card-inner">
                  <div className="message-card-stamp">💌</div>
                  <p className="message-card-body">{content.finalMessage}</p>
                  <div className="message-card-signature">
                    <span>With all my heart,</span>
                    <strong className="signature-name">{content.myName || 'Ujjwal'} ❤️</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Gift Box Lid */}
            <div className="gift-lid">
              <div className="lid-lip" />
              <div className="lid-ribbon-horizontal" />
              {/* Ribbon Bow */}
              <div className="ribbon-bow">
                <div className="bow-loop bow-loop-left" />
                <div className="bow-knot" />
                <div className="bow-loop bow-loop-right" />
                <div className="bow-tail bow-tail-left" />
                <div className="bow-tail bow-tail-right" />
              </div>
            </div>

            {/* Gift Box Body */}
            <div className="gift-body">
              {/* Vertical Ribbon */}
              <div className="ribbon-vertical" />
              {/* Horizontal Ribbon */}
              <div className="ribbon-horizontal" />
              {/* Soft Front Shading */}
              <div className="box-highlight" />
            </div>

            {/* Tap instruction badge (visible only when closed) */}
            {!isOpened && (
              <div className="tap-hint-badge">
                <span className="tap-hint-pulse" />
                <span>Tap to open 🎁</span>
              </div>
            )}
          </div>
        </div>

        {/* Revealed Keepsake & Explore Again CTA */}
        <div className={`reveal-footer ${isOpened ? 'footer-visible' : ''}`}>
          <p className="final-keepsake-text">{content.finalKeepsake}</p>

          <button
            type="button"
            className="explore-again-btn"
            onClick={handleRestartClick}
            aria-label="Revisit from the beginning"
          >
            <span className="btn-glow" />
            <span className="btn-text">{content.exploreAgainButton || 'Explore again ↺'}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
