import React, { useState, useEffect, useRef } from 'react';
import { VolumeX, X, ArrowRight, MessageCircle, PlayCircle, ShieldCheck } from 'lucide-react';

export default function VSLModalOverlay() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    // Autoplay when mounted
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Autoplay interrupted:", err);
      });
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="vsl-backdrop">
      <div className="vsl-modal-container">
        
        {/* Header Bar with Close Button */}
        <div className="vsl-modal-header">
          <div className="vsl-modal-badge">
            <PlayCircle size={15} />
            <span>Video Explicativo</span>
          </div>
          <button onClick={handleClose} className="vsl-close-btn" aria-label="Cerrar video">
            <X size={24} />
          </button>
        </div>

        {/* Video Player Frame */}
        <div className="vsl-video-frame">
          <video
            ref={videoRef}
            src="/vsl-tomas-pussetto.mp4"
            autoPlay
            muted={isMuted}
            loop
            playsInline
            controls
            className="vsl-video-player-modal"
          />

          {/* Sound Overlay Button */}
          {isMuted && (
            <button onClick={toggleMute} className="vsl-sound-overlay-btn">
              <VolumeX size={20} />
              <span>Tocar para activar sonido</span>
            </button>
          )}
        </div>

        {/* Content & CTAs below Video */}
        <div className="vsl-modal-body">
          <h2 className="vsl-modal-title">
            Bajá entre 8 y 10 kg de grasa y recuperá tu energía en 90 Días
          </h2>
          <p className="vsl-modal-sub">
            Programa de Coaching 1 a 1 de Fuerza & Hábitos exclusivo para Mujeres Profesionales.
          </p>

          <div className="vsl-modal-actions">
            <a 
              href="#quiz" 
              onClick={handleClose} 
              className="btn btn-primary btn-lg vsl-modal-cta"
            >
              <span>Hacer Test de Adherencia (1 min)</span>
              <ArrowRight size={20} />
            </a>
            
            <a 
              href="https://wa.me/5493410000000?text=Hola!%20Vi%20el%20video%20y%20quiero%20información%20sobre%20el%20Programa%20de%2090%20Días" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-secondary vsl-modal-wa"
            >
              <MessageCircle size={18} />
              <span>Postular por WhatsApp</span>
            </a>
          </div>

          <div className="vsl-modal-footer-note">
            <ShieldCheck size={16} />
            <span>Garantía de Resultado en 90 Días • O lográs tu meta o trabajamos GRATIS</span>
          </div>

          <button onClick={handleClose} className="vsl-continue-link">
            Continuar al sitio web →
          </button>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .vsl-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 9999;
          background: rgba(0, 0, 0, 0.94);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          overflow-y: auto;
          animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }

        .vsl-modal-container {
          width: 100%;
          max-width: 640px;
          background: #1C1A17;
          border: 1px solid var(--border-dark);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.85);
          display: flex;
          flex-direction: column;
          max-height: 94vh;
        }

        .vsl-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.9rem 1.25rem;
          background: #141210;
          border-bottom: 1px solid var(--border-dark);
        }

        .vsl-modal-badge {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--color-creme);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .vsl-close-btn {
          background: transparent;
          border: none;
          color: var(--color-creme-muted);
          cursor: pointer;
          padding: 0.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.2s ease;
        }

        .vsl-close-btn:hover {
          color: #FFFFFF;
        }

        /* Video Frame */
        .vsl-video-frame {
          position: relative;
          width: 100%;
          background: #000000;
          aspect-ratio: 16 / 9;
        }

        .vsl-video-player-modal {
          width: 100%;
          height: 100%;
          object-fit: contain;
          outline: none;
        }

        .vsl-sound-overlay-btn {
          position: absolute;
          top: 1rem;
          left: 50%;
          transform: translateX(-50%);
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.2rem;
          background: rgba(38, 22, 13, 0.92);
          border: 1px solid rgba(245, 240, 232, 0.3);
          border-radius: var(--radius-full);
          color: #FFFFFF;
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
          animation: pulseSound 2s infinite;
          z-index: 10;
        }

        @keyframes pulseSound {
          0%, 100% { transform: translateX(-50%) scale(1); }
          50% { transform: translateX(-50%) scale(1.05); }
        }

        /* Body & Actions */
        .vsl-modal-body {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          overflow-y: auto;
        }

        .vsl-modal-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--color-creme);
          line-height: 1.25;
          margin-bottom: 0.5rem;
        }

        .vsl-modal-sub {
          font-size: 0.92rem;
          color: var(--color-creme-muted);
          margin-bottom: 1.25rem;
        }

        .vsl-modal-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          width: 100%;
          margin-bottom: 1rem;
        }

        .vsl-modal-cta {
          width: 100%;
          justify-content: center;
          padding: 1rem;
          font-size: 1.05rem;
        }

        .vsl-modal-wa {
          width: 100%;
          justify-content: center;
          padding: 0.85rem;
          font-size: 0.95rem;
        }

        .vsl-modal-footer-note {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          color: var(--color-creme-muted);
          margin-bottom: 0.75rem;
        }

        .vsl-continue-link {
          background: transparent;
          border: none;
          color: var(--color-creme-muted);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          text-decoration: underline;
          padding: 0.25rem;
        }

        .vsl-continue-link:hover {
          color: var(--color-creme);
        }

        @media (max-width: 640px) {
          .vsl-modal-container {
            max-height: 96vh;
          }
          .vsl-modal-body {
            padding: 1.15rem;
          }
          .vsl-modal-title {
            font-size: 1.18rem;
          }
        }
      `}} />
    </div>
  );
}
