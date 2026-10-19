
import { useState, useEffect } from 'react';
import content from '../content';

let globalAudio = null;

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const startTime = content.musicStartTime ?? 25;
  const endTime = content.musicEndTime ?? 205;

  useEffect(() => {
    if (!content.musicEnabled || !content.musicSrc) return;

    if (!globalAudio) {
      globalAudio = new Audio(content.musicSrc);
      globalAudio.volume = 0.3;
      globalAudio.loop = false;

      globalAudio.addEventListener('timeupdate', handleTimeUpdate);
      globalAudio.addEventListener('ended', handleEnded);
    }

    function handleTimeUpdate() {
      if (!globalAudio) return;

      if (globalAudio.currentTime >= endTime) {
        globalAudio.currentTime = startTime;
        setCurrentTime(startTime);
      } else {
        setCurrentTime(globalAudio.currentTime);
      }
    }

    function handleEnded() {
      if (!globalAudio) return;

      globalAudio.currentTime = startTime;
      setCurrentTime(startTime);

      globalAudio.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }

    return () => {
      if (globalAudio) {
        globalAudio.pause();
        globalAudio.removeEventListener('timeupdate', handleTimeUpdate);
        globalAudio.removeEventListener('ended', handleEnded);
        globalAudio = null;
      }
    };
  }, [startTime, endTime]);

  if (!content.musicEnabled) return null;

  const togglePlay = () => {
    if (!globalAudio) return;

    if (isPlaying) {
      globalAudio.pause();
      setIsPlaying(false);
    } else {
      if (
        globalAudio.currentTime < startTime ||
        globalAudio.currentTime >= endTime
      ) {
        globalAudio.currentTime = startTime;
      }

      globalAudio.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error('Audio playback failed:', err));
    }
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);

    if (globalAudio) {
      globalAudio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (secs) => {
    if (isNaN(secs)) return '0:00';

    const relativeSecs = Math.max(0, secs - startTime);
    const minutes = Math.floor(relativeSecs / 60);
    const seconds = Math.floor(relativeSecs % 60);

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div
      className="spotify-player"
      style={{
        pointerEvents: 'auto',
        zIndex: 9999,
        position: 'relative',
      }}
    >
      <div className="song-info">
        <div className="song-title">
          {content.songTitle || 'Khushi Song'}
        </div>
        <div className="artist-name">
          {content.artistName || 'Soundtrack'}
        </div>
      </div>

      <div className="progress-container">
        <span className="time">{formatTime(currentTime)}</span>

        <input
          type="range"
          className="progress-bar"
          min={startTime}
          max={endTime}
          value={Math.max(startTime, Math.min(currentTime, endTime))}
          onChange={handleSeek}
        />

        <span className="time">{formatTime(endTime)}</span>
      </div>

      <div className="player-controls">
        <button className="control-btn secondary" aria-label="Shuffle">
          🔀
        </button>

        <button className="control-btn secondary" aria-label="Previous">
          ⏮
        </button>

        <button
          className="control-btn primary-play"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          style={{ cursor: 'pointer', pointerEvents: 'auto' }}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>

        <button className="control-btn secondary" aria-label="Next">
          ⏭
        </button>

        <button className="control-btn secondary" aria-label="Loop">
          🔁
        </button>
      </div>
    </div>
  );
}
