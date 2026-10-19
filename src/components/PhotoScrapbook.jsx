
import React, { useState, useEffect, useCallback } from 'react';
import content from '../content.js';
import './PhotoScrapbook.css';

export default function PhotoScrapbook() {
  // Load the permanent photos from content.js
  const [photos] = useState(() => content?.photos || []);

  const [activePhotoIndex, setActivePhotoIndex] = useState(null);
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (id) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  const openLightbox = (index) => {
    setActivePhotoIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setActivePhotoIndex(null);
  }, []);

  const goToPrev = useCallback(() => {
    setActivePhotoIndex((prev) =>
      prev > 0 ? prev - 1 : photos.length - 1
    );
  }, [photos.length]);

  const goToNext = useCallback(() => {
    setActivePhotoIndex((prev) =>
      prev < photos.length - 1 ? prev + 1 : 0
    );
  }, [photos.length]);

  // Keyboard navigation and body scroll lock
  useEffect(() => {
    if (activePhotoIndex === null) return;

    document.body.classList.add('no-scroll');

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('no-scroll');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activePhotoIndex, closeLightbox, goToNext, goToPrev]);

  // Polaroid card rotations
  const getRotationClass = (index) => {
    const rotations = [
      'rot-neg-2',
      'rot-pos-2',
      'rot-neg-3',
      'rot-pos-3',
      'rot-neg-1',
      'rot-pos-1',
    ];

    return rotations[index % rotations.length];
  };

  const currentPhoto =
    activePhotoIndex !== null ? photos[activePhotoIndex] : null;

  return (
    <section
      className="scrapbook-section"
      aria-label="Photo Scrapbook"
    >
      <div className="scrapbook-container">
        {/* Scrapbook heading */}
        <header className="scrapbook-header">
          <h2 className="scrapbook-heading">
            {content.scrapbookHeading}
          </h2>

          <p className="scrapbook-subtext">
            Tap any moment to take a closer look ✨
          </p>
        </header>

        {/* Polaroid Scrapbook Grid */}
        <div className="scrapbook-grid">
          {photos.map((photo, index) => {
            const hasError = imageErrors[photo.id];
            const rotationClass = getRotationClass(index);

            return (
              <div
                key={photo.id || index}
                className={`polaroid-card ${rotationClass}`}
                onClick={() => openLightbox(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(index);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`View photo: ${
                  photo.caption || 'Memory'
                }`}
              >
                {/* Decorative washi tape */}
                <div
                  className={`washi-tape ${
                    index % 2 === 0
                      ? 'tape-blush'
                      : 'tape-lavender'
                  }`}
                  aria-hidden="true"
                />

                {/* Photo frame */}
                <div className="polaroid-img-wrapper">
                  {hasError || !photo.src ? (
                    <div className="photo-placeholder">
                      <span
                        className="placeholder-icon"
                        role="img"
                        aria-label="camera"
                      >
                        📷
                      </span>

                      <span className="placeholder-text">
                        Photo coming soon
                      </span>

                      <span className="placeholder-subtext">
                        A lovely memory will be here
                      </span>
                    </div>
                  ) : (
                    <img
                      src={photo.src}
                      alt={photo.caption || 'Scrapbook memory'}
                      className="polaroid-img"
                      loading="lazy"
                      onError={() => handleImageError(photo.id)}
                    />
                  )}
                </div>

                {/* Caption and date */}
                <div className="polaroid-caption-area">
                  <p className="polaroid-caption">
                    {photo.caption}
                  </p>

                  {photo.date ? (
                    <span className="polaroid-date">
                      {photo.date}
                    </span>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Enlarged Photo Lightbox */}
      {activePhotoIndex !== null && currentPhoto && (
        <div
          className="lightbox-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Photo details"
          onClick={closeLightbox}
        >
          <div className="lightbox-backdrop" />

          {/* Close button */}
          <button
            type="button"
            className="lightbox-close-btn"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Previous photo button */}
          {photos.length > 1 && (
            <button
              type="button"
              className="lightbox-nav-btn lightbox-prev-btn"
              onClick={(e) => {
                e.stopPropagation();
                goToPrev();
              }}
              aria-label="Previous photo"
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}

          {/* Enlarged photo content */}
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="lightbox-polaroid">
              <div className="lightbox-img-wrapper">
                {imageErrors[currentPhoto.id] ||
                !currentPhoto.src ? (
                  <div className="photo-placeholder lightbox-placeholder">
                    <span
                      className="placeholder-icon"
                      role="img"
                      aria-label="camera"
                    >
                      📷
                    </span>

                    <span className="placeholder-text">
                      Photo coming soon
                    </span>
                  </div>
                ) : (
                  <img
                    src={currentPhoto.src}
                    alt={
                      currentPhoto.caption ||
                      'Enlarged scrapbook photo'
                    }
                    className="lightbox-img"
                  />
                )}
              </div>

              {/* Enlarged photo caption */}
              <div className="lightbox-meta">
                <p className="lightbox-caption">
                  {currentPhoto.caption}
                </p>

                {currentPhoto.date && (
                  <span className="lightbox-date">
                    {currentPhoto.date}
                  </span>
                )}

                <span className="lightbox-counter">
                  {activePhotoIndex + 1} of {photos.length}
                </span>
              </div>
            </div>
          </div>

          {/* Next photo button */}
          {photos.length > 1 && (
            <button
              type="button"
              className="lightbox-nav-btn lightbox-next-btn"
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              aria-label="Next photo"
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          )}
        </div>
      )}
    </section>
  );
}
