import React, { useState, useEffect, useRef, useCallback } from 'react';
import content from '../content.js';
import './PersonalLetter.css';

export default function PersonalLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const [displayedLength, setDisplayedLength] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const letterContainerRef = useRef(null);
  const timerRef = useRef(null);

  const fullText = content.letter || '';
  const heading = content.letterHeading || 'A little letter for you 💌';
  const signoff = content.letterSignoff || 'Made with love, just for you. ❤️';
  const fromName = content.letterFrom || '— Ujjwal';
  const recipient = content.herName || 'Khushi';

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Open the envelope and start reading
  const handleOpen = useCallback(() => {
    if (isOpen) return;
    setIsOpen(true);

    if (prefersReducedMotion) {
      setDisplayedLength(fullText.length);
      setIsTyping(false);
    } else {
      setDisplayedLength(0);
      setIsTyping(true);
    }
  }, [isOpen, fullText.length, prefersReducedMotion]);

  // Close letter and fold back into envelope
  const handleClose = useCallback((e) => {
    if (e) e.stopPropagation();
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsOpen(false);
    setIsTyping(false);
    setDisplayedLength(0);
  }, []);

  // Instantly reveal the full letter
  const handleSkipTypewriter = useCallback((e) => {
    if (e) e.stopPropagation();
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setDisplayedLength(fullText.length);
    setIsTyping(false);
  }, [fullText.length]);

  // Keyboard accessibility: Escape to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  // Typewriter effect ticker (~20ms per character)
  useEffect(() => {
    if (!isOpen || !isTyping) return;

    if (displayedLength >= fullText.length) {
      setIsTyping(false);
      return;
    }

    timerRef.current = setInterval(() => {
      setDisplayedLength((prev) => {
        const next = prev + 1;
        if (next >= fullText.length) {
          if (timerRef.current) clearInterval(timerRef.current);
          setIsTyping(false);
          return fullText.length;
        }
        return next;
      });
    }, 20);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isOpen, isTyping, displayedLength, fullText.length]);

  // Auto-scroll gently into view when opened on mobile
  useEffect(() => {
    if (isOpen && letterContainerRef.current) {
      const rect = letterContainerRef.current.getBoundingClientRect();
      if (rect.top < 0 || rect.bottom > window.innerHeight) {
        letterContainerRef.current.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'center',
        });
      }
    }
  }, [isOpen, prefersReducedMotion]);

  const displayedText = fullText.slice(0, displayedLength);

  return (
    <section className="personal-letter-section" aria-label="Personal Letter">
      <div className="pl-container" ref={letterContainerRef}>
        {/* Section Heading above envelope / letter */}
        <div className="pl-section-header">
          <span className="pl-sparkle-badge" aria-hidden="true">
            ✨ From the Heart
          </span>
          <h2 className="pl-main-title">{heading}</h2>
          {!isOpen && (
            <p className="pl-sub-hint">
              A private letter written just for {recipient}. Tap the envelope to unseal it.
            </p>
          )}
        </div>

        {/* Envelope & Letter Wrapper */}
        <div className={`pl-stage ${isOpen ? 'stage-opened' : 'stage-sealed'}`}>
          {/* ========================================================= */}
          {/* 1. CLOSED SEALED ENVELOPE (Visible when !isOpen)          */}
          {/* ========================================================= */}
          {!isOpen && (
            <div
              className="pl-envelope-card"
              onClick={handleOpen}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOpen();
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`Open letter for ${recipient}`}
              aria-expanded="false"
            >
              {/* Corner floral decorations */}
              <span className="pl-flower-corner top-left" aria-hidden="true">
                🌸
              </span>
              <span className="pl-flower-corner top-right" aria-hidden="true">
                🌿
              </span>
              <span className="pl-flower-corner bottom-left" aria-hidden="true">
                🌿
              </span>
              <span className="pl-flower-corner bottom-right" aria-hidden="true">
                🌸
              </span>

              {/* Envelope flap decoration */}
              <div className="pl-envelope-flap-top" aria-hidden="true">
                <svg
                  className="pl-flap-svg"
                  viewBox="0 0 500 160"
                  preserveAspectRatio="none"
                >
                  <polygon points="0,0 500,0 250,160" className="pl-flap-polygon" />
                  <path
                    d="M 0,0 L 250,158 L 500,0"
                    fill="none"
                    stroke="rgba(212, 168, 83, 0.45)"
                    strokeWidth="2"
                  />
                </svg>
              </div>

              {/* Envelope Body Details */}
              <div className="pl-envelope-body">
                {/* Postage Stamp */}
                <div className="pl-postage-stamp" aria-hidden="true">
                  <div className="pl-stamp-inner">
                    <span className="pl-stamp-icon">🌹</span>
                    <span className="pl-stamp-text">LOVE</span>
                  </div>
                  <div className="pl-postmark-lines">
                    <div className="pm-line"></div>
                    <div className="pm-line"></div>
                    <div className="pm-line"></div>
                  </div>
                </div>

                {/* Recipient Handwritten Address */}
                <div className="pl-address-area">
                  <span className="pl-airmail-tag" aria-hidden="true">
                    ★ SPECIAL DELIVERY ★
                  </span>
                  <div className="pl-recipient-name">For: {recipient} ❤️</div>
                  <div className="pl-recipient-note">With all my heart</div>
                </div>

                {/* Decorative Wax Seal (Centered on flap tip) */}
                <div className="pl-wax-seal" aria-hidden="true">
                  <div className="pl-wax-seal-inner">
                    <span className="pl-wax-seal-heart">❤️</span>
                  </div>
                </div>

                {/* Floating "Tap to Open" callout */}
                <div className="pl-open-prompt">
                  <span className="pl-prompt-text">Tap to open letter ✨</span>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 2. OPEN UNFOLDED LETTER (Visible when isOpen)             */}
          {/* ========================================================= */}
          {isOpen && (
            <div
              className="pl-letter-sheet"
              role="region"
              aria-label="Opened Personal Letter"
            >
              {/* Top Action Bar with Close button */}
              <div className="pl-sheet-topbar">
                <div className="pl-sheet-badge">
                  <span>💌 Personal Keepsake</span>
                </div>

                <div className="pl-sheet-actions">
                  {isTyping && (
                    <button
                      type="button"
                      className="pl-quick-read-btn"
                      onClick={handleSkipTypewriter}
                      title="Reveal all text immediately"
                      aria-label="Read the whole letter without typewriter animation"
                    >
                      ⚡ Read the whole letter
                    </button>
                  )}
                  <button
                    type="button"
                    className="pl-icon-close-btn"
                    onClick={handleClose}
                    title="Fold letter back into envelope"
                    aria-label="Close letter"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Stationery Letter Content */}
              <div className="pl-sheet-parchment">
                {/* Decorative botanical header */}
                <div className="pl-parchment-header" aria-hidden="true">
                  <span className="pl-floral-deco">🌸</span>
                  <span className="pl-floral-divider">~ ❦ ~</span>
                  <span className="pl-floral-deco">🌸</span>
                </div>

                {/* Handwritten Heading */}
                <h3 className="pl-parchment-heading">{heading}</h3>

                <div className="pl-parchment-greeting">
                  Dear {recipient},
                </div>

                {/* Letter Body Text with Typewriter */}
                <div className="pl-parchment-body">
                  <p className="pl-text-content">
                    {displayedText}
                    {isTyping && (
                      <span className="pl-typewriter-caret" aria-hidden="true">
                        |
                      </span>
                    )}
                  </p>
                </div>

                {/* Quick Skip button at bottom if still typing */}
                {isTyping && (
                  <div className="pl-typing-status">
                    <span className="pl-typing-indicator">
                      Writing for you<span className="dot-1">.</span>
                      <span className="dot-2">.</span>
                      <span className="dot-3">.</span>
                    </span>
                    <button
                      type="button"
                      className="pl-skip-inline-btn"
                      onClick={handleSkipTypewriter}
                    >
                      Read whole letter now
                    </button>
                  </div>
                )}

                {/* Signoff and Sender */}
                <div className="pl-parchment-signoff">
                  <p className="pl-signoff-line">{signoff}</p>
                  <p className="pl-sender-name">{fromName}</p>
                </div>

                {/* Bottom Fold / Close button */}
                <div className="pl-parchment-footer">
                  <button
                    type="button"
                    className="pl-fold-back-btn"
                    onClick={handleClose}
                  >
                    <span>Fold letter back into envelope ✉️</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
