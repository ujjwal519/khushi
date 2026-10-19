import { useState, useEffect, useMemo, useCallback } from 'react';
import content from '../content.js';
import './BirthdaySection.css';

export default function BirthdaySection() {
  // 5 interactive candles: true = lit, false = blown out
  const [candles, setCandles] = useState([true, true, true, true, true]);
  const [smokeActive, setSmokeActive] = useState([false, false, false, false, false]);

  // Wish counter & confetti state
  const [wishCount, setWishCount] = useState(0);
  const [confettiList, setConfettiList] = useState([]);

  // Calculate real-time countdown to target birthday date
  const getTargetTime = useCallback(() => {
    const dateStr = content.birthdayDate || '2026-10-20';
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, (month || 10) - 1, day || 20, 0, 0, 0).getTime();
  }, []);

  const [timeLeft, setTimeLeft] = useState(() => {
    const target = getTargetTime();
    const diff = target - Date.now();
    return {
      diff,
      days: Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24))),
      hours: Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24)),
      minutes: Math.max(0, Math.floor((diff / (1000 * 60)) % 60)),
      seconds: Math.max(0, Math.floor((diff / 1000) % 60)),
      isPast: diff <= 0,
    };
  });

  useEffect(() => {
    const updateCountdown = () => {
      const target = getTargetTime();
      const diff = target - Date.now();
      setTimeLeft({
        diff,
        days: Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24))),
        hours: Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24)),
        minutes: Math.max(0, Math.floor((diff / (1000 * 60)) % 60)),
        seconds: Math.max(0, Math.floor((diff / 1000) % 60)),
        isPast: diff <= 0,
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [getTargetTime]);

  // Subtle floating background hearts
  const bgHearts = useMemo(
    () => [
      { id: 1, left: 6, size: 20, duration: 22, delay: 0 },
      { id: 2, left: 22, size: 26, duration: 28, delay: 4 },
      { id: 3, left: 42, size: 16, duration: 20, delay: 2 },
      { id: 4, left: 64, size: 28, duration: 25, delay: 7 },
      { id: 5, left: 82, size: 22, duration: 23, delay: 3 },
      { id: 6, left: 93, size: 18, duration: 21, delay: 9 },
    ],
    []
  );

  // Toggle single candle on tap/click
  const handleCandleClick = useCallback((index) => {
    setCandles((prev) => {
      const updated = [...prev];
      const willBeBlownOut = updated[index];
      updated[index] = !updated[index];

      // Trigger smoke puff if blowing out
      if (willBeBlownOut) {
        setSmokeActive((sPrev) => {
          const sUpdated = [...sPrev];
          sUpdated[index] = true;
          return sUpdated;
        });
        setTimeout(() => {
          setSmokeActive((sPrev) => {
            const sUpdated = [...sPrev];
            sUpdated[index] = false;
            return sUpdated;
          });
        }, 1200);
      }

      return updated;
    });
  }, []);

  // Relight all candles
  const handleRelightAll = useCallback(() => {
    setCandles([true, true, true, true, true]);
    setSmokeActive([false, false, false, false, false]);
  }, []);

  const litCount = candles.filter(Boolean).length;
  const allBlownOut = litCount === 0;

  // Make a Wish with pure CSS confetti
  const handleMakeAWish = useCallback(() => {
    setWishCount((prev) => prev + 1);
    const colors = [
      '#e85d75',
      '#d4a853',
      '#e8c4c4',
      '#faf3e8',
      '#b8a9c9',
      '#ff85a1',
      '#f9bec7',
      '#f4d35e',
    ];

    const pieces = [];
    const count = 55;
    for (let i = 0; i < count; i++) {
      const left = Math.floor(Math.random() * 98) + 1;
      const duration = (2.4 + Math.random() * 2.2).toFixed(2);
      const delay = (Math.random() * 0.7).toFixed(2);
      const size = Math.floor(6 + Math.random() * 8);
      const color = colors[Math.floor(Math.random() * colors.length)];
      const shapeType = i % 3 === 0 ? 'square' : i % 3 === 1 ? 'ribbon' : 'dot';
      pieces.push({
        id: `${Date.now()}-${i}`,
        left,
        duration,
        delay,
        size,
        color,
        shapeType,
      });
    }

    setConfettiList(pieces);

    setTimeout(() => {
      setConfettiList([]);
    }, 4800);
  }, []);

  return (
    <section className="birthday-section" aria-label="Birthday celebration section">
      {/* Background Floating Hearts */}
      <div className="birthday-hearts-bg" aria-hidden="true">
        {bgHearts.map((h) => (
          <div
            key={h.id}
            className="birthday-bg-heart"
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

      {/* Confetti Overlay */}
      {confettiList.length > 0 && (
        <div className="confetti-overlay" aria-hidden="true">
          {confettiList.map((c) => (
            <span
              key={c.id}
              className={`confetti-dot ${c.shapeType}`}
              style={{
                left: `${c.left}%`,
                width: `${c.size}px`,
                height: c.shapeType === 'ribbon' ? `${c.size * 2}px` : `${c.size}px`,
                backgroundColor: c.color,
                animationDuration: `${c.duration}s`,
                animationDelay: `${c.delay}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="birthday-container">
        {/* Decorative Badge */}
        <div className="birthday-tag">
          <span>🎂</span>
          <span>A Special Celebration</span>
          <span>✨</span>
        </div>

        {/* Heading & Subheading */}
        <h2 className="birthday-heading">
          {content.birthdayHeading || 'Happy Birthday, Khushi ❤️'}
        </h2>

        <p className="birthday-subheading">
          {content.birthdaySubheading || '20 October 2026 — your day, your little universe.'}
        </p>

        {/* Real-time Countdown OR Keepsake Banner */}
        {!timeLeft.isPast ? (
          <div className="countdown-wrapper">
            <div className="countdown-note">Counting down to your special day ✨</div>
            <div className="countdown-grid" role="timer" aria-label="Countdown to birthday">
              <div className="countdown-box">
                <span className="countdown-number">{timeLeft.days}</span>
                <span className="countdown-label">Days</span>
              </div>
              <div className="countdown-box">
                <span className="countdown-number">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="countdown-label">Hours</span>
              </div>
              <div className="countdown-box">
                <span className="countdown-number">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="countdown-label">Minutes</span>
              </div>
              <div className="countdown-box">
                <span className="countdown-number">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="countdown-label">Seconds</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="keepsake-wrapper" role="region" aria-label="Birthday celebration keepsake">
            <span className="keepsake-title">✨ Today is Your Day! Happy Birthday! ✨</span>
            <p className="keepsake-text">
              A permanent keepsake to celebrate you, today and every single day that follows.
            </p>
          </div>
        )}

        {/* Pure CSS Animated Birthday Cake */}
        <div className="cake-stage" aria-label="Interactive birthday cake">
          {/* Hint / Relight Button */}
          {!allBlownOut ? (
            <div className="cake-hint" aria-live="polite">
              <span>🕯️</span>
              <span>
                Tap candles to blow them out ({litCount}/5 lit)
              </span>
            </div>
          ) : (
            <button
              type="button"
              className="cake-relight-btn"
              onClick={handleRelightAll}
              aria-label="All candles blown out. Click to relight all candles"
            >
              <span>✨</span>
              <span>All wishes made! Tap to relight 🕯️</span>
            </button>
          )}

          {/* Row of 5 Interactive Candles */}
          <div className="cake-candles" role="group" aria-label="5 Birthday candles">
            {candles.map((isLit, i) => (
              <button
                key={i}
                type="button"
                className="cake-candle-wrapper"
                onClick={() => handleCandleClick(i)}
                aria-label={`Candle ${i + 1}: ${isLit ? 'Lit. Tap to blow out' : 'Blown out. Tap to relight'}`}
              >
                <div className="candle-flame-container">
                  <div
                    className={`candle-flame ${!isLit ? 'blown-out' : ''}`}
                    aria-hidden="true"
                  />
                  <div
                    className={`candle-smoke ${smokeActive[i] ? 'active' : ''}`}
                    aria-hidden="true"
                  />
                </div>
                <div className="candle-wick" aria-hidden="true" />
                <div className="candle-body" aria-hidden="true" />
              </button>
            ))}
          </div>

          {/* Top Cake Tier */}
          <div className="cake-tier-top" aria-hidden="true">
            <div className="cake-cream-dots">
              <span className="cream-dot" />
              <span className="cream-dot" />
              <span className="cream-dot" />
              <span className="cream-dot" />
              <span className="cream-dot" />
            </div>
          </div>

          {/* Bottom Cake Tier */}
          <div className="cake-tier-bottom" aria-hidden="true">
            <div className="cake-drips-bottom">
              <span className="drip" />
              <span className="drip" />
              <span className="drip" />
              <span className="drip" />
              <span className="drip" />
              <span className="drip" />
              <span className="drip" />
            </div>
            <div className="cake-tier-bottom-filling" />
          </div>

          {/* Plate & Pedestal */}
          <div className="cake-plate" aria-hidden="true" />
          <div className="cake-plate-pedestal" aria-hidden="true" />
        </div>

        {/* 'Make a Wish' Action Button */}
        <div className="wish-button-container">
          <button
            type="button"
            className="make-wish-btn"
            onClick={handleMakeAWish}
            aria-label="Make a wish and release confetti"
          >
            <span className="make-wish-btn-shimmer" aria-hidden="true" />
            <span>Make a Wish ✨</span>
          </button>

          {wishCount > 0 && (
            <div className="wish-counter-badge" aria-live="polite">
              <span>🌟</span>
              <span>
                {wishCount === 1
                  ? '1 wish sent up to the stars!'
                  : `${wishCount} wishes sent up to the stars!`}
              </span>
            </div>
          )}
        </div>

        {/* Birthday Message Keepsake Card */}
        <div className="birthday-card">
          <div className="birthday-card-ornament" aria-hidden="true">
            ✦ ✦ ✦
          </div>

          <p className="birthday-card-message">
            {content.birthdayMessage ||
              `Another year of being the kind of person who makes the world a little warmer just by being in it.

I hope this year treats you the way you deserve — with kindness, with beautiful surprises, and with countless little moments that make you smile.

Happy Birthday. 🎂`}
          </p>

          <div className="birthday-card-seal">
            <span>❤️</span>
            <span>Always made with love for {content.herNickname || content.herName || 'you'}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
