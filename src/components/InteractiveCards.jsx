import React, { useState, useCallback } from 'react';
import content from '../content.js';
import './InteractiveCards.css';

// Gentle decorative icons for the cards in case of variety
const CARD_ICONS = ['✨', '🌙', '💗', '🌷', '🌸', '🫶'];

export default function InteractiveCards() {
  const [flippedCards, setFlippedCards] = useState({});

  const cards = content.cards || [];
  const heading = content.cardsHeading || 'Little things that make you, you.';

  const toggleCard = useCallback((index) => {
    setFlippedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  }, []);

  const handleCloseCard = useCallback((index, e) => {
    e.stopPropagation();
    setFlippedCards((prev) => ({
      ...prev,
      [index]: false,
    }));
  }, []);

  if (!cards.length) return null;

  return (
    <section className="interactive-cards-section" aria-label="Interactive Cards">
      <div className="ic-container">
        {/* Section Header */}
        <div className="ic-header">
          <span className="ic-badge" aria-hidden="true">
            🌷 Beautiful Details
          </span>
          <h2 className="ic-title">{heading}</h2>
          <p className="ic-subtitle">
            Every little thing that makes you so effortlessly special. Tap any card to reveal.
          </p>
        </div>

        {/* Responsive Cards Grid: 2 columns on mobile, 3 on desktop */}
        <div className="ic-grid">
          {cards.map((card, index) => {
            const isFlipped = Boolean(flippedCards[index]);
            const icon = CARD_ICONS[index % CARD_ICONS.length];
            const cardNum = String(index + 1).padStart(2, '0');

            return (
              <div
                key={index}
                className="ic-card-perspective"
                onClick={() => toggleCard(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleCard(index);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-expanded={isFlipped}
                aria-label={`Card ${index + 1}: ${card.title}. ${
                  isFlipped ? 'Message revealed. Click to flip back.' : 'Click to flip and reveal message.'
                }`}
              >
                <div className={`ic-card-inner ${isFlipped ? 'is-flipped' : ''}`}>
                  {/* FRONT FACE */}
                  <div className="ic-card-front" aria-hidden={isFlipped}>
                    <div className="ic-card-front-top">
                      <span className="ic-card-number">{cardNum}</span>
                      <span className="ic-card-icon" aria-hidden="true">
                        {icon}
                      </span>
                    </div>

                    <div className="ic-card-front-content">
                      <h3 className="ic-card-title">{card.title}</h3>
                    </div>

                    <div className="ic-card-front-bottom">
                      <span className="ic-flip-hint">
                        <span>Tap to reveal</span>
                        <span className="ic-hint-arrow" aria-hidden="true">
                          →
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* BACK FACE */}
                  <div className="ic-card-back" aria-hidden={!isFlipped}>
                    <div className="ic-card-back-top">
                      <span className="ic-card-back-number">{cardNum}</span>
                      <button
                        type="button"
                        className="ic-close-btn"
                        onClick={(e) => handleCloseCard(index, e)}
                        aria-label="Flip card back"
                        title="Flip back"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="ic-card-back-content">
                      <h4 className="ic-back-title">{card.title}</h4>
                      <p className="ic-card-message">{card.message}</p>
                    </div>

                    <div className="ic-card-back-bottom">
                      <span className="ic-flip-back-hint">
                        <span aria-hidden="true">↺</span> Tap to flip back
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
