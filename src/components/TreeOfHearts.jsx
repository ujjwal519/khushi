import React, { useState, useEffect, useCallback, useMemo } from 'react';
import content from '../content.js';
import './TreeOfHearts.css';

// 12 Coordinates for pink/red hearts distributed across the tree canopy (percentages)
const HEART_COORDINATES = [
  { id: 1, x: 22, y: 38, sway: 'sway-1', delay: 0 },
  { id: 2, x: 34, y: 24, sway: 'sway-2', delay: 0.6 },
  { id: 3, x: 18, y: 56, sway: 'sway-3', delay: 1.2 },
  { id: 4, x: 28, y: 46, sway: 'sway-1', delay: 1.8 },
  { id: 5, x: 42, y: 35, sway: 'sway-2', delay: 0.4 },
  { id: 6, x: 38, y: 16, sway: 'sway-3', delay: 2.1 },
  { id: 7, x: 62, y: 18, sway: 'sway-1', delay: 0.9 },
  { id: 8, x: 74, y: 28, sway: 'sway-2', delay: 1.5 },
  { id: 9, x: 58, y: 36, sway: 'sway-3', delay: 0.3 },
  { id: 10, x: 80, y: 44, sway: 'sway-1', delay: 2.4 },
  { id: 11, x: 70, y: 52, sway: 'sway-2', delay: 1.1 },
  { id: 12, x: 84, y: 60, sway: 'sway-3', delay: 1.7 },
];

// Special Golden Heart positioned near the sacred crown/center of the tree
const GOLDEN_COORDINATE = { id: 'golden', x: 50, y: 22, sway: 'sway-gold', delay: 0.8 };

export default function TreeOfHearts() {
  const [activeHeart, setActiveHeart] = useState(null);
  const [exploredIds, setExploredIds] = useState(() => new Set());

  const treeHearts = content.treeHearts || [];
  const goldenHeart = content.goldenHeart || {
    id: 'golden',
    title: 'The Golden Heart — My Deepest Wish for You ✨',
    badge: 'Special Golden Heart 💛',
    color: '#d4a853',
    message: `Khushi, having you in my life is something I cherish with all my heart.\n\nMay this year bring you every blessing, gentle peace, and endless joy.\n\nHappy Birthday, Khushi. ❤️`,
    signoff: '— Ujjwal',
  };

  const totalHearts = treeHearts.length + 1; // 12 pink/red + 1 golden = 13
  const exploredCount = exploredIds.size;
  const allExplored = exploredCount >= totalHearts;

  // Open heart detail card
  const handleOpenHeart = useCallback((heartData, isGolden = false) => {
    const fullData = { ...heartData, isGolden };
    setActiveHeart(fullData);
    setExploredIds((prev) => {
      const next = new Set(prev);
      next.add(isGolden ? 'golden' : heartData.id);
      return next;
    });
  }, []);

  // Close modal
  const handleCloseModal = useCallback(() => {
    setActiveHeart(null);
  }, []);

  // Keyboard navigation: Escape closes modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeHeart) {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeHeart, handleCloseModal]);

  return (
    <section className="tree-section" id="treeOfHearts" aria-label="Interactive Tree of Hearts">
      {/* Background stardust particles */}
      <div className="tree-ambient-bg" aria-hidden="true">
        <div className="tree-ambient-glow" />
        {Array.from({ length: 16 }).map((_, i) => (
          <span
            key={`stardust-${i}`}
            className="tree-stardust"
            style={{
              top: `${(i * 17) % 90 + 5}%`,
              left: `${(i * 23) % 92 + 4}%`,
              animationDelay: `${(i * 0.4) % 3}s`,
            }}
          />
        ))}
      </div>

      <div className="tree-container">
        {/* Section Header */}
        <header className="tree-header">
          <div className="tree-badge">
            <span>🌳</span>
            <span>Where Love Blooms</span>
            <span>❤️</span>
          </div>

          <h2 className="tree-heading">
            {content.treeHeading || 'The Tree of Hearts 🌳❤️'}
          </h2>

          <p className="tree-subheading">
            {content.treeSubheading ||
              'Every heart on this tree carries a little thought, feeling, or memory for you. Tap the hearts to explore.'}
          </p>

          {/* Exploration Progress Pill */}
          <div className="tree-progress-wrap" aria-live="polite">
            <div className="tree-progress-bar">
              <div
                className="tree-progress-fill"
                style={{ width: `${Math.min(100, (exploredCount / totalHearts) * 100)}%` }}
              />
            </div>
            <span className="tree-progress-text">
              {allExplored
                ? '🌸 All 13 hearts discovered!'
                : `Explored ${exploredCount} of ${totalHearts} hearts ✨`}
            </span>
          </div>

          {/* All Hearts Explored Celebration Banner */}
          {allExplored && (
            <div className="tree-completion-banner" role="status">
              <span className="completion-hearts-icon">💖✨🌳</span>
              <p className="completion-hearts-text">
                You've discovered every single heart on this tree. Every thought, wish, and memory belongs to you, Khushi. ❤️
              </p>
            </div>
          )}
        </header>

        {/* Tree Stage with SVG Tree & Hanging Interactive Hearts */}
        <div className="tree-stage">
          {/* Detailed Romantic Tree SVG */}
          <svg
            viewBox="0 0 1000 780"
            className="tree-svg"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <defs>
              {/* Trunk Gradient */}
              <linearGradient id="trunkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4a1525" />
                <stop offset="50%" stopColor="#311220" />
                <stop offset="100%" stopColor="#200a15" />
              </linearGradient>

              {/* Foliage Canopy Radial Glows */}
              <radialGradient id="foliageGlow1" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f7c8d0" stopOpacity="0.45" />
                <stop offset="60%" stopColor="#e85d75" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#4a1525" stopOpacity="0" />
              </radialGradient>

              <radialGradient id="foliageGlow2" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffd56b" stopOpacity="0.35" />
                <stop offset="70%" stopColor="#d4a853" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#200a15" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Tree Canopy Soft Glow Backdrops */}
            <circle cx="500" cy="280" r="240" fill="url(#foliageGlow1)" />
            <circle cx="340" cy="320" r="190" fill="url(#foliageGlow1)" />
            <circle cx="660" cy="320" r="190" fill="url(#foliageGlow1)" />
            <circle cx="500" cy="220" r="140" fill="url(#foliageGlow2)" />

            {/* Tree Root Base / Ground Mound */}
            <path
              d="M 220 720 Q 500 680 780 720 Q 500 770 220 720 Z"
              fill="#2a0d18"
              opacity="0.85"
            />
            <path
              d="M 320 710 Q 500 685 680 710 Q 500 740 320 710 Z"
              fill="#4a1525"
              opacity="0.9"
            />

            {/* Trunk and Main Branches */}
            <path
              d="M 470 710 
                 C 475 620, 465 520, 455 450
                 C 440 380, 360 340, 260 320
                 C 250 318, 230 325, 210 320
                 C 235 330, 275 336, 330 355
                 C 410 390, 445 440, 470 510
                 C 475 580, 480 650, 480 710 Z"
              fill="url(#trunkGrad)"
            />

            <path
              d="M 530 710 
                 C 525 620, 535 520, 545 450
                 C 560 380, 640 340, 740 320
                 C 750 318, 770 325, 790 320
                 C 765 330, 725 336, 670 355
                 C 590 390, 555 440, 530 510
                 C 525 580, 520 650, 520 710 Z"
              fill="url(#trunkGrad)"
            />

            {/* Central Trunk Body */}
            <path
              d="M 470 710 
                 C 475 590, 485 490, 490 400
                 C 492 340, 450 260, 390 190
                 C 405 205, 450 270, 498 320
                 C 505 320, 550 270, 595 205
                 C 610 190, 550 260, 508 400
                 C 515 490, 525 590, 530 710 Z"
              fill="url(#trunkGrad)"
            />

            {/* Secondary Upper Branches */}
            <path
              d="M 490 360 C 470 300, 400 240, 320 220 C 350 230, 420 270, 478 335 Z"
              fill="url(#trunkGrad)"
            />
            <path
              d="M 510 360 C 530 300, 600 240, 680 220 C 650 230, 580 270, 522 335 Z"
              fill="url(#trunkGrad)"
            />
            <path
              d="M 495 310 C 492 250, 485 180, 450 140 C 465 160, 498 220, 502 290 Z"
              fill="url(#trunkGrad)"
            />
            <path
              d="M 505 310 C 508 250, 515 180, 550 140 C 535 160, 502 220, 498 290 Z"
              fill="url(#trunkGrad)"
            />

            {/* Graceful Canopy Leaf Sprays & Flower Dots */}
            <g opacity="0.65" fill="#f7a8b8">
              <circle cx="280" cy="280" r="18" />
              <circle cx="340" cy="220" r="22" />
              <circle cx="420" cy="170" r="24" />
              <circle cx="580" cy="170" r="24" />
              <circle cx="660" cy="220" r="22" />
              <circle cx="720" cy="280" r="18" />
              <circle cx="370" cy="380" r="16" />
              <circle cx="630" cy="380" r="16" />
              <circle cx="500" cy="150" r="28" />
            </g>

            <g opacity="0.45" fill="#ffd56b">
              <circle cx="310" cy="250" r="6" />
              <circle cx="450" cy="200" r="8" />
              <circle cx="550" cy="200" r="8" />
              <circle cx="690" cy="250" r="6" />
              <circle cx="500" cy="170" r="7" />
            </g>
          </svg>

          {/* -------------------------------------------------------- */}
          {/* Interactive Hearts Layer (Positioned over branches)     */}
          {/* -------------------------------------------------------- */}
          <div className="tree-hearts-overlay">
            {/* The 12 Pink & Red Hearts */}
            {treeHearts.map((heart, idx) => {
              const coord = HEART_COORDINATES[idx % HEART_COORDINATES.length];
              const isExplored = exploredIds.has(heart.id);

              return (
                <div
                  key={`tree-heart-${heart.id || idx}`}
                  className={`tree-heart-node ${coord.sway} ${isExplored ? 'is-explored' : ''}`}
                  style={{
                    left: `${coord.x}%`,
                    top: `${coord.y}%`,
                    animationDelay: `${coord.delay}s`,
                    '--heart-accent': heart.color || '#e85d75',
                  }}
                >
                  {/* Stem/Vine connecting heart to branch */}
                  <span className="heart-vine" aria-hidden="true" />

                  <button
                    type="button"
                    className="tree-heart-btn"
                    onClick={() => handleOpenHeart(heart, false)}
                    aria-label={`Heart ${idx + 1}: ${heart.title}. ${
                      isExplored ? 'Already explored.' : 'Tap to reveal secret message.'
                    }`}
                  >
                    <svg viewBox="0 0 24 24" className="tree-heart-icon" aria-hidden="true">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>

                    <span className="heart-number-badge">{idx + 1}</span>

                    {/* Explored checkmark indicator */}
                    {isExplored && (
                      <span className="heart-explored-sparkle" aria-hidden="true">
                        ✓
                      </span>
                    )}
                  </button>
                </div>
              );
            })}

            {/* ------------------------------------------------------ */}
            {/* The Special 13th Golden Heart                          */}
            {/* ------------------------------------------------------ */}
            <div
              className={`tree-heart-node golden-heart-node ${GOLDEN_COORDINATE.sway} ${
                exploredIds.has('golden') ? 'is-explored' : ''
              }`}
              style={{
                left: `${GOLDEN_COORDINATE.x}%`,
                top: `${GOLDEN_COORDINATE.y}%`,
                animationDelay: `${GOLDEN_COORDINATE.delay}s`,
              }}
            >
              {/* Golden hanging ribbon */}
              <span className="heart-vine golden-vine" aria-hidden="true" />

              <button
                type="button"
                className="tree-heart-btn golden-btn"
                onClick={() => handleOpenHeart(goldenHeart, true)}
                aria-label="Special Golden Heart. Tap to reveal Ujjwal's deepest emotional message."
              >
                {/* Radiant golden halo */}
                <div className="golden-aura-glow" aria-hidden="true" />

                <svg viewBox="0 0 24 24" className="tree-heart-icon golden-icon" aria-hidden="true">
                  <defs>
                    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fff3b0" />
                      <stop offset="50%" stopColor="#f3c461" />
                      <stop offset="100%" stopColor="#d4a853" />
                    </linearGradient>
                  </defs>
                  <path
                    fill="url(#goldGradient)"
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  />
                </svg>

                <span className="golden-crown-tag" aria-hidden="true">
                  👑
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------ */}
      {/* Interactive Modal: Reveals the clicked heart message        */}
      {/* ------------------------------------------------------------ */}
      {activeHeart && (
        <div
          className={`heart-modal-overlay ${activeHeart.isGolden ? 'modal-golden' : ''}`}
          onClick={handleCloseModal}
          role="dialog"
          aria-modal="true"
          aria-label={activeHeart.title}
        >
          <div className="heart-modal-backdrop" />

          <div
            className="heart-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Card Header & Badge */}
            <div className="modal-top-bar">
              <span className={`modal-badge ${activeHeart.isGolden ? 'badge-gold' : ''}`}>
                {activeHeart.isGolden ? (
                  <span>👑 Special Golden Heart 💛</span>
                ) : (
                  <span>❤️ Heart Note</span>
                )}
              </span>

              <button
                type="button"
                className="modal-close-btn"
                onClick={handleCloseModal}
                aria-label="Close message"
                title="Close"
              >
                ✕
              </button>
            </div>

            {/* Floral / Gold Corner Ornaments */}
            <div className="modal-corner ornament-tl" aria-hidden="true">🌸</div>
            <div className="modal-corner ornament-tr" aria-hidden="true">🌿</div>
            <div className="modal-corner ornament-br" aria-hidden="true">🌸</div>
            <div className="modal-corner ornament-bl" aria-hidden="true">🌿</div>

            {/* Heart Title */}
            <h3 className={`modal-heart-title ${activeHeart.isGolden ? 'title-gold' : ''}`}>
              {activeHeart.title}
            </h3>

            {/* Message Body */}
            <div className="modal-message-body">
              <p className="modal-message-text">{activeHeart.message}</p>
            </div>

            {/* Special Signoff for Golden Heart or standard signoff */}
            {activeHeart.signoff && (
              <div className="modal-signoff">
                <span className="modal-signoff-line">{activeHeart.signoff}</span>
              </div>
            )}

            {/* Bottom Close Button */}
            <div className="modal-footer">
              <button
                type="button"
                className={`modal-confirm-btn ${activeHeart.isGolden ? 'btn-gold' : ''}`}
                onClick={handleCloseModal}
              >
                <span>{activeHeart.isGolden ? 'Keep this promise close 💛' : 'Keep close to heart ❤️'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
