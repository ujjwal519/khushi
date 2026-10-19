import React, { useState, useEffect, useCallback } from 'react';
import content from '../content.js';
import './PhotoScrapbook.css';

export default function PhotoScrapbook() {
  // Load photos from content.js or localStorage preview
  const [photos, setPhotos] = useState(() => {
    try {
      const saved = localStorage.getItem('khushi_custom_photos');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return content?.photos || [];
  });

  const [activePhotoIndex, setActivePhotoIndex] = useState(null);
  const [imageErrors, setImageErrors] = useState({});
  const [showManager, setShowManager] = useState(false);

  // Sync to localStorage preview whenever photos change
  const updatePhotos = (newPhotos) => {
    setPhotos(newPhotos);
    try {
      localStorage.setItem('khushi_custom_photos', JSON.stringify(newPhotos));
    } catch {
      // Ignore storage errors (e.g. large base64)
    }
  };

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
    setActivePhotoIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
  }, [photos.length]);

  const goToNext = useCallback(() => {
    setActivePhotoIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
  }, [photos.length]);

  // Keyboard navigation & lock body scroll
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

  // Rotations for Polaroid cards (-3deg to 3deg, alternating)
  const getRotationClass = (index) => {
    const rotations = ['rot-neg-2', 'rot-pos-2', 'rot-neg-3', 'rot-pos-3', 'rot-neg-1', 'rot-pos-1'];
    return rotations[index % rotations.length];
  };

  // Photo management actions (Upload preview, edit caption/date, remove, add)
  const handleFileUpload = (index, e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result;
      const updated = [...photos];
      updated[index] = {
        ...updated[index],
        src: dataUrl,
      };
      // Reset any error state for this photo
      setImageErrors((prev) => ({ ...prev, [updated[index].id]: false }));
      updatePhotos(updated);
    };
    reader.readAsDataURL(file);
  };

  const handleCaptionChange = (index, newCaption) => {
    const updated = [...photos];
    updated[index] = { ...updated[index], caption: newCaption };
    updatePhotos(updated);
  };

  const handleDateChange = (index, newDate) => {
    const updated = [...photos];
    updated[index] = { ...updated[index], date: newDate };
    updatePhotos(updated);
  };

  const handleRemovePhoto = (index) => {
    if (photos.length <= 1) {
      alert('You need at least one photo in the scrapbook.');
      return;
    }
    const updated = photos.filter((_, i) => i !== index);
    updatePhotos(updated);
  };

  const handleAddPhoto = () => {
    const newId = Date.now();
    const newEntry = {
      id: newId,
      src: `/photos/placeholder-${(photos.length % 6) + 1}.svg`,
      caption: 'A new moment together ✨',
      date: '',
    };
    updatePhotos([...photos, newEntry]);
  };

  const handleResetToDefault = () => {
    if (window.confirm('Reset scrapbook to default photos from content.js?')) {
      localStorage.removeItem('khushi_custom_photos');
      setPhotos(content?.photos || []);
      setImageErrors({});
    }
  };

  const currentPhoto = activePhotoIndex !== null ? photos[activePhotoIndex] : null;

  return (
    <section className="scrapbook-section" aria-label="Photo Scrapbook">
      <div className="scrapbook-container">
        <header className="scrapbook-header">
          <h2 className="scrapbook-heading">{content.scrapbookHeading}</h2>
          <p className="scrapbook-subtext">Tap any moment to take a closer look ✨</p>

          {/* Toggle for Photo Customization & Upload Preview */}
          <div className="scrapbook-controls">
            <button
              type="button"
              className="scrapbook-manage-btn"
              onClick={() => setShowManager(!showManager)}
              aria-expanded={showManager}
            >
              {showManager ? '✕ Close Photo Customiser' : '📸 Personalise / Preview Photos'}
            </button>
          </div>
        </header>

        {/* In-Browser Photo Customizer & Upload Preview Drawer */}
        {showManager && (
          <div className="photo-manager-drawer" role="region" aria-label="Photo customization tool">
            <div className="manager-header">
              <h3 className="manager-title">📸 Photo Customiser & Live Preview</h3>
              <p className="manager-desc">
                Upload your real photos to test and preview them right here in the scrapbook!
              </p>
            </div>

            <div className="manager-instruction-box">
              <p className="instruction-heading">💡 How to make your photos permanent for the website:</p>
              <ol className="instruction-list">
                <li>Place your photos into the <code>public/photos/</code> folder (e.g. <code>trip.jpg</code>).</li>
                <li>Edit <code>src/content.js</code> and update the <code>src</code> path (e.g. <code>src: '/photos/trip.jpg'</code>).</li>
                <li>The browser preview below lets you see how your photos look right now without editing files first!</li>
              </ol>
            </div>

            <div className="manager-items-grid">
              {photos.map((item, idx) => (
                <div key={item.id || idx} className="manager-item-card">
                  <div className="manager-item-thumb">
                    <img
                      src={item.src}
                      alt={item.caption || 'Thumbnail'}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <span className="manager-item-index">#{idx + 1}</span>
                  </div>

                  <div className="manager-item-fields">
                    <label className="manager-field-label">
                      <span>Replace Photo:</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="manager-file-input"
                        onChange={(e) => handleFileUpload(idx, e)}
                      />
                    </label>

                    <label className="manager-field-label">
                      <span>Caption:</span>
                      <input
                        type="text"
                        value={item.caption || ''}
                        placeholder="Caption for this memory"
                        className="manager-text-input"
                        onChange={(e) => handleCaptionChange(idx, e.target.value)}
                      />
                    </label>

                    <label className="manager-field-label">
                      <span>Date (optional):</span>
                      <input
                        type="text"
                        value={item.date || ''}
                        placeholder="e.g. October 2025"
                        className="manager-text-input"
                        onChange={(e) => handleDateChange(idx, e.target.value)}
                      />
                    </label>
                  </div>

                  <button
                    type="button"
                    className="manager-remove-btn"
                    onClick={() => handleRemovePhoto(idx)}
                    title="Remove this photo"
                    aria-label={`Remove photo ${idx + 1}`}
                  >
                    🗑️ Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="manager-actions-row">
              <button
                type="button"
                className="manager-add-btn"
                onClick={handleAddPhoto}
              >
                ➕ Add Another Photo Slot
              </button>
              <button
                type="button"
                className="manager-reset-btn"
                onClick={handleResetToDefault}
              >
                ↺ Reset to content.js Default
              </button>
            </div>
          </div>
        )}

        {/* The Polaroid Scrapbook Grid */}
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
                aria-label={`View photo: ${photo.caption || 'Memory'}`}
              >
                {/* Washi tape decoration */}
                <div className={`washi-tape ${index % 2 === 0 ? 'tape-blush' : 'tape-lavender'}`} aria-hidden="true" />

                {/* Photo frame */}
                <div className="polaroid-img-wrapper">
                  {hasError || !photo.src ? (
                    <div className="photo-placeholder">
                      <span className="placeholder-icon" role="img" aria-label="camera">
                        📷
                      </span>
                      <span className="placeholder-text">Photo coming soon</span>
                      <span className="placeholder-subtext">A lovely memory will be here</span>
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

                {/* Caption area */}
                <div className="polaroid-caption-area">
                  <p className="polaroid-caption">{photo.caption}</p>
                  {photo.date ? <span className="polaroid-date">{photo.date}</span> : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Prev button */}
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
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}

          {/* Main content */}
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="lightbox-polaroid">
              <div className="lightbox-img-wrapper">
                {imageErrors[currentPhoto.id] || !currentPhoto.src ? (
                  <div className="photo-placeholder lightbox-placeholder">
                    <span className="placeholder-icon" role="img" aria-label="camera">
                      📷
                    </span>
                    <span className="placeholder-text">Photo coming soon</span>
                  </div>
                ) : (
                  <img
                    src={currentPhoto.src}
                    alt={currentPhoto.caption || 'Enlarged scrapbook photo'}
                    className="lightbox-img"
                  />
                )}
              </div>

              <div className="lightbox-meta">
                <p className="lightbox-caption">{currentPhoto.caption}</p>
                {currentPhoto.date && (
                  <span className="lightbox-date">{currentPhoto.date}</span>
                )}
                <span className="lightbox-counter">
                  {activePhotoIndex + 1} of {photos.length}
                </span>
              </div>
            </div>
          </div>

          {/* Next button */}
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
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          )}
        </div>
      )}
    </section>
  );
}
