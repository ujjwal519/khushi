import React, { useState, useCallback } from 'react';
import content from '../content.js';
import './OpenWhenMessages.css';

// Subtle distinctive tilts between -2deg and 2deg
const ROTATIONS = [-1.8, 1.5, -1.2, 1.9];

export default function OpenWhenMessages() {
  const [openEnvelopes, setOpenEnvelopes] = useState({});

  const messages = content.openWhenMessages || [];
  const heading =
    content.openWhenHeading || 'For the moments when you need a little something.';
  const recipient = content.herName || 'Khushi';

  const toggleEnvelope = useCallback((index) => {
    setOpenEnvelopes((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  }, []);

  const handleReseal = useCallback((index, e) => {
    e.stopPropagation();
    setOpenEnvelopes((prev) => ({
      ...prev,
      [index]: false,
    }));
  }, []);

  if (!messages.length) return null;

  return (
    <section className="open-when-section" aria-label="Open When Letters">
      <div className="ow-container">
        {/* Header */}
        <div className="ow-header">
          <span className="ow-badge" aria-hidden="true">
            💌 Little Keepsakes
          </span>
          <h2 className="ow-title">{heading}</h2>
          <p className="ow-subtitle">
            A small collection of sealed letters. Whenever your heart needs comfort, smiles, or courage — unseal the one meant for right now.
          </p>
        </div>

        {/* Responsive Grid: 1 col mobile, 2 cols tablet & desktop */}
        <div className="ow-grid">
          {messages.map((item, index) => {
            const isOpen = Boolean(openEnvelopes[index]);
            const rotationDeg = ROTATIONS[index % ROTATIONS.length];

            return (
              <div
                key={index}
                className={`ow-envelope-wrapper ${isOpen ? 'is-open' : 'is-sealed'}`}
                style={{
                  '--env-rotation': `${rotationDeg}deg`,
                }}
              >
                <div
                  className="ow-envelope-card"
                  onClick={() => !isOpen && toggleEnvelope(index)}
                  onKeyDown={(e) => {
                    if ((e.key === 'Enter' || e.key === ' ') && !isOpen) {
                      e.preventDefault();
                      toggleEnvelope(index);
                    }
                  }}
                  role={isOpen ? 'region' : 'button'}
                  tabIndex={isOpen ? -1 : 0}
                  aria-expanded={isOpen}
                  aria-label={`${item.title}. ${
                    isOpen ? 'Letter opened.' : 'Click to unseal and read.'
                  }`}
                >
                  {/* Flap that lifts upward on open */}
                  <div className="ow-flap-wrapper" aria-hidden="true">
                    <div className="ow-flap-triangle"></div>
                    <div className="ow-flap-seal">
                      <span className="ow-seal-icon">✦</span>
                    </div>
                  </div>

                  {/* SEALED VIEW: Envelope Exterior */}
                  <div className="ow-sealed-face">
                    <div className="ow-postmark-tag" aria-hidden="true">
                      <span>SPECIAL DELIVERY</span>
                    </div>

                    <div className="ow-envelope-plaque">
                      <span className="ow-plaque-pin" aria-hidden="true">
                        📍
                      </span>
                      <h3 className="ow-envelope-title">{item.title}</h3>
                      <span className="ow-click-hint">
                        <span>Tap to unseal</span>
                        <span className="ow-hint-icon" aria-hidden="true">
                          ✉️
                        </span>
                      </span>
                    </div>

                    <div className="ow-envelope-creases" aria-hidden="true">
                      <div className="crease-line left"></div>
                      <div className="crease-line right"></div>
                    </div>
                  </div>

                  {/* REVEALED VIEW: Letter slides out of pocket */}
                  <div
                    className="ow-letter-content"
                    aria-hidden={!isOpen}
                  >
                    <div className="ow-letter-header">
                      <span className="ow-letter-stamp" aria-hidden="true">
                        💌 To {recipient}
                      </span>
                      <button
                        type="button"
                        className="ow-close-icon-btn"
                        onClick={(e) => handleReseal(index, e)}
                        aria-label={`Re-seal envelope for: ${item.title}`}
                        title="Re-seal envelope"
                      >
                        ✕
                      </button>
                    </div>

                    <h4 className="ow-revealed-title">{item.title}</h4>

                    <div className="ow-letter-body">
                      <p className="ow-message-text">{item.message}</p>
                    </div>

                    <div className="ow-letter-footer">
                      <button
                        type="button"
                        className="ow-reseal-btn"
                        onClick={(e) => handleReseal(index, e)}
                      >
                        <span>Re-seal envelope ✉️</span>
                      </button>
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
