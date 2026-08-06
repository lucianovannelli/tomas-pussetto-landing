import React, { useState, useEffect, useRef } from 'react';
import { X, Volume2, VolumeX, Play, Pause, ArrowRight } from 'lucide-react';

export default function VideoModal({ autoOpen = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    // Check if path is /video or URL params contain video=true or v=1
    const pathIsVideo = window.location.pathname.startsWith('/video');
    const urlParams = new URLSearchParams(window.location.search);
    const paramIsVideo = urlParams.has('video') || urlParams.has('v');

    if (autoOpen || pathIsVideo || paramIsVideo) {
      setIsOpen(true);
    }
  }, [autoOpen]);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      // Attempt autoplay muted (required by mobile browsers)
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.log("Autoplay prevented:", err);
        setIsPlaying(false);
      });
    }
  }, [isOpen]);

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsOpen(false);
    
    // Clean URL without reloading page
    if (window.history.pushState) {
      window.history.pushState({}, '', '/');
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 1;
    setProgress((current / duration) * 100);
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    // Smoothly close and transition to main page
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="video-modal-overlay">
      <div className="video-modal-container">
        {/* Top Header Bar */}
        <div className="video-modal-header">
          <div className="video-brand-tag">
            <span className="dot-live"></span>
            <span>Tomás Pussetto • Mensaje</span>
          </div>
          <button onClick={handleClose} className="video-close-btn" aria-label="Cerrar video">
            <X size={22} />
          </button>
        </div>

        {/* 9:16 Vertical Video Frame */}
        <div className="video-frame-wrapper" onClick={togglePlay}>
          <video
            ref={videoRef}
            src="/tomas-video.mp4"
            poster="/logo-signature-creme.png"
            playsInline
            muted={isMuted}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleVideoEnded}
            className="vertical-video-player"
          />

          {/* Floating Controls */}
          <div className="video-controls-overlay" onClick={(e) => e.stopPropagation()}>
            <button onClick={toggleMute} className="video-control-btn sound-btn">
              {isMuted ? (
                <>
                  <VolumeX size={18} />
                  <span>Activar Sonido</span>
                </>
              ) : (
                <>
                  <Volume2 size={18} />
                  <span>Silenciar</span>
                </>
              )}
            </button>

            <button onClick={togglePlay} className="video-control-btn play-btn" aria-label="Play/Pausa">
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>
          </div>

          {/* Video Progress Bar */}
          <div className="video-progress-bar">
            <div className="video-progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Action CTA Bar */}
        <div className="video-modal-footer">
          <button onClick={handleClose} className="btn btn-primary btn-lg btn-video-continue">
            <span>Continuar a la Web de Tomás</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .video-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 9999;
          background: rgba(20, 18, 16, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }

        .video-modal-container {
          width: 100%;
          max-width: 420px;
          height: 90vh;
          max-height: 780px;
          background: #26160D;
          border: 1px solid rgba(245, 240, 232, 0.2);
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.8);
        }

        .video-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          background: rgba(28, 26, 23, 0.8);
          border-bottom: 1px solid rgba(245, 240, 232, 0.1);
          z-index: 10;
        }

        .video-brand-tag {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--color-creme);
        }

        .dot-live {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10B981;
          box-shadow: 0 0 8px #10B981;
        }

        .video-close-btn {
          background: rgba(245, 240, 232, 0.1);
          border: none;
          color: var(--color-creme);
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .video-close-btn:hover {
          background: rgba(245, 240, 232, 0.25);
        }

        .video-frame-wrapper {
          flex: 1;
          position: relative;
          background: #141210;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          cursor: pointer;
        }

        .vertical-video-player {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .video-controls-overlay {
          position: absolute;
          bottom: 1.5rem;
          left: 1rem;
          right: 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 5;
          pointer-events: auto;
        }

        .video-control-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(28, 26, 23, 0.85);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(245, 240, 232, 0.2);
          color: var(--color-creme);
          padding: 0.5rem 0.9rem;
          border-radius: 999px;
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .video-control-btn:hover {
          background: var(--color-creme);
          color: var(--color-obsidian);
        }

        .play-btn {
          width: 36px;
          height: 36px;
          padding: 0;
          justify-content: center;
          border-radius: 50%;
        }

        .video-progress-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: rgba(245, 240, 232, 0.2);
        }

        .video-progress-fill {
          height: 100%;
          background: var(--color-creme);
          transition: width 0.1s linear;
        }

        .video-modal-footer {
          padding: 1.25rem;
          background: #1C1A17;
          border-top: 1px solid rgba(245, 240, 232, 0.1);
        }

        .btn-video-continue {
          width: 100%;
          justify-content: center;
          padding: 1rem 1.5rem;
          font-size: 1rem;
        }
      `}} />
    </div>
  );
}
