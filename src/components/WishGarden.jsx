import React, { useState } from 'react';
import content from '../content.js';
import './WishGarden.css';

// 8 distinct flower themes corresponding to the 8 wishes
const FLOWER_THEMES = [
  { id: 'rose-1', type: 'rose', name: 'Dusty Rose', petalColor: '#e27a92', petalShadow: '#c9a0a0', centerColor: '#f7d377' },
  { id: 'lav-1', type: 'lavender', name: 'Lavender Mist', petalColor: '#b8a9c9', petalShadow: '#957eb5', centerColor: '#f9de8d' },
  { id: 'pink-1', type: 'pink', name: 'Blush Blossom', petalColor: '#f7a8b8', petalShadow: '#e48fa2', centerColor: '#ffe49e' },
  { id: 'gold-1', type: 'gold', name: 'Golden Glow', petalColor: '#f3c461', petalShadow: '#d4a853', centerColor: '#fff0b8' },
  { id: 'rose-2', type: 'rose-deep', name: 'Velvet Petal', petalColor: '#db6885', petalShadow: '#ba4d6a', centerColor: '#fce49a' },
  { id: 'lav-2', type: 'lavender-soft', name: 'Twilight Lilac', petalColor: '#c8b6dc', petalShadow: '#a690c4', centerColor: '#f7d780' },
  { id: 'pink-2', type: 'peach-pink', name: 'Peach Bloom', petalColor: '#fca393', petalShadow: '#e68c7a', centerColor: '#ffebad' },
  { id: 'gold-2', type: 'gold-warm', name: 'Amber Sun', petalColor: '#edb853', petalShadow: '#cb9836', centerColor: '#fff3c2' },
];

// Staggered stem variations for natural garden layout
const STEM_VARIATIONS = [
  { height: 165, curve: -4, leafPos: 45 },
  { height: 135, curve: 3, leafPos: 35 },
  { height: 175, curve: -2, leafPos: 50 },
  { height: 145, curve: 5, leafPos: 40 },
  { height: 160, curve: -5, leafPos: 48 },
  { height: 130, curve: 2, leafPos: 32 },
  { height: 170, curve: -3, leafPos: 42 },
  { height: 150, curve: 4, leafPos: 38 },
];

export default function WishGarden() {
  const [bloomedIds, setBloomedIds] = useState(() => new Set());
  const [activeWishIndex, setActiveWishIndex] = useState(null);

  const wishes = content?.wishes || [];
  const totalWishes = Math.min(wishes.length, 8);
  const allBloomed = bloomedIds.size >= totalWishes && totalWishes > 0;

  const handleFlowerClick = (index) => {
    // Mark as bloomed
    setBloomedIds((prev) => {
      const next = new Set(prev);
      next.add(index);
      return next;
    });

    // Toggle wish message
    if (activeWishIndex === index) {
      setActiveWishIndex(null);
    } else {
      setActiveWishIndex(index);
    }
  };

  const closeWishCard = () => {
    setActiveWishIndex(null);
  };

  return (
    <section className="wish-garden-section" id="garden" aria-label="Wish Garden">
      {/* Background stars */}
      <div className="garden-stars" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={`star-${i}`}
            className={`garden-star star-${(i % 5) + 1}`}
            style={{
              top: `${(i * 19) % 65}%`,
              left: `${(i * 23) % 95}%`,
              animationDelay: `${(i * 0.45) % 3}s`,
            }}
          />
        ))}
      </div>

      {/* Floating fireflies */}
      <div className="garden-fireflies" aria-hidden="true">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`firefly-${i}`}
            className={`garden-firefly firefly-${i + 1}`}
            style={{
              animationDelay: `${i * 0.7}s`,
            }}
          />
        ))}
      </div>

      <div className="garden-container">
        {/* Garden Header */}
        <header className="garden-header">
          <h2 className="garden-heading">{content.gardenHeading}</h2>
          <p className="garden-subtext">
            {allBloomed ? (
              <span className="all-bloomed-badge">🌸 All 8 wishes have bloomed into the night sky! 🌸</span>
            ) : (
              `Tap each flower bud to watch it bloom and reveal a wish (${bloomedIds.size}/${totalWishes} bloomed)`
            )}
          </p>
        </header>

        {/* Active Wish Message Spotlight Card */}
        {activeWishIndex !== null && (
          <div className="active-wish-modal" role="region" aria-live="polite">
            <div className="wish-card-glow" />
            <div className="wish-card-body">
              <div className="wish-card-header">
                <span className="wish-number-tag">
                  Wish #{activeWishIndex + 1} of {totalWishes}
                </span>
                <button
                  type="button"
                  className="wish-close-btn"
                  onClick={closeWishCard}
                  aria-label="Close wish card"
                >
                  ✕
                </button>
              </div>
              <p className="wish-card-text">{wishes[activeWishIndex]}</p>
              <div className="wish-card-footer">
                <span className="wish-flower-name">
                  🌸 {FLOWER_THEMES[activeWishIndex]?.name || 'Bloom'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Completion Celebration Banner (when all 8 are opened) */}
        {allBloomed && (
          <div className="garden-completion-banner" role="status">
            <div className="completion-content">
              <span className="completion-icon">🌸✨</span>
              <div className="completion-text-wrap">
                <h3 className="completion-title">All wishes bloomed 🌸</h3>
                <p className="completion-desc">
                  May each of these eight wishes surround you with warmth, peace, and endless joy this year.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Garden Bed Layout with Flowers */}
        <div className={`garden-bed ${allBloomed ? 'garden-bloomed-all' : ''}`}>
          {Array.from({ length: totalWishes }).map((_, index) => {
            const isBloomed = bloomedIds.has(index);
            const isActive = activeWishIndex === index;
            const theme = FLOWER_THEMES[index % FLOWER_THEMES.length];
            const variation = STEM_VARIATIONS[index % STEM_VARIATIONS.length];

            return (
              <div
                key={`flower-${index}`}
                className={`flower-spot spot-${index + 1} ${isBloomed ? 'is-bloomed' : 'is-bud'} ${isActive ? 'is-active' : ''}`}
                style={{
                  '--stem-height': `${variation.height}px`,
                  '--stem-curve': `${variation.curve}deg`,
                  '--theme-petal': theme.petalColor,
                  '--theme-shadow': theme.petalShadow,
                  '--theme-center': theme.centerColor,
                }}
              >
                {/* Flower Interactive Button */}
                <button
                  type="button"
                  className="flower-trigger-btn"
                  onClick={() => handleFlowerClick(index)}
                  aria-label={`Wish ${index + 1}: ${isBloomed ? 'Bloomed' : 'Bud'}. ${theme.name}. Tap to ${isBloomed ? (isActive ? 'hide wish' : 'view wish') : 'bloom'}.`}
                  aria-expanded={isActive}
                >
                  {/* Flower Head */}
                  <div className="flower-head">
                    {/* Petals (6 radial petals) */}
                    <div className="petals-cluster">
                      <div className="petal petal-1" />
                      <div className="petal petal-2" />
                      <div className="petal petal-3" />
                      <div className="petal petal-4" />
                      <div className="petal petal-5" />
                      <div className="petal petal-6" />
                    </div>

                    {/* Flower Center Core */}
                    <div className="flower-center" />

                    {/* Bud Sepals (cover the bud when closed, fold back when bloomed) */}
                    <div className="sepal sepal-left" />
                    <div className="sepal sepal-right" />
                  </div>

                  {/* Stem & Leaves */}
                  <div className="flower-stem-wrap">
                    <div className="flower-stem" />
                    <div
                      className="flower-leaf leaf-left"
                      style={{ bottom: `${variation.leafPos}%` }}
                    />
                    <div
                      className="flower-leaf leaf-right"
                      style={{ bottom: `${variation.leafPos + 18}%` }}
                    />
                  </div>

                  {/* Gentle Flower Label/Number */}
                  <div className="flower-badge">
                    <span>{isBloomed ? '🌸' : '🌱'} #{index + 1}</span>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Layered Grass Foreground */}
      <div className="garden-grass-layer" aria-hidden="true">
        {/* Rear Grass Wave */}
        <div className="grass-wave grass-wave-back" />

        {/* Front Grass Wave with Tufts */}
        <div className="grass-wave grass-wave-front">
          <div className="grass-tufts">
            {Array.from({ length: 14 }).map((_, i) => (
              <span key={`tuft-${i}`} className={`tuft tuft-${(i % 4) + 1}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
