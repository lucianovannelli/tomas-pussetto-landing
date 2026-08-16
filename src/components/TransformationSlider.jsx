import React, { useState } from 'react';
import { ShieldCheck, Quote, ChevronLeft, ChevronRight, XCircle, CheckCircle2, Eye, Lock, Grid, Layers } from 'lucide-react';

const STORIES = [
  {
    id: 1,
    name: "Caso #1 • Natalia M.",
    age: "41 años",
    role: "Escribana & Madre",
    location: "Coaching Online",
    image: "/casos_exito/caso1.jpeg",
    highlight: "De vivir inflamada y con dietas strictly a perder 9 kg de grasa sosteniendo 3 días/semana.",
    quote: "Tenía dos jornadas superpuestas (trabajo + hijos) y vivía cansada, deshinchada a base de café y picoteando por ansiedad. Tomás me armó un plan de fuerza de 3 días que se adapta a mi caos. Eliminé la ansiedad y volví a ponerme la ropa que tenía guardada con total seguridad.",
    metrics: [
      { label: "Grasa & Inflamación", value: "-9 kg" },
      { label: "Ansiedad Picoteo", value: "Eliminada" },
      { label: "Frecuencia", value: "3 Días/Sem" }
    ],
    before: {
      status: "Antes (Ciclo de Culpa)",
      desc: "Hacía dietas de hambre y cardio agotador. A las 3 semanas la carga laboral la desbordaba, comía por ansiedad y abandonaba."
    },
    after: {
      status: "Hoy (Adherencia & Fuerza)",
      desc: "Entrena 3 sesiones semanales de 50 minutos adaptadas a su agenda cambiante. Recuperó tono muscular e imagen profesional."
    }
  },
  {
    id: 2,
    name: "Caso #2 • Dra. Andrea L.",
    age: "47 años",
    role: "Bioquímica & Directora",
    location: "Coaching Online",
    image: "/casos_exito/caso2.jpeg",
    highlight: "Superó el miedo a lesionarse y logró abdomen plano y energía total.",
    quote: "Le tenía miedo a las pesas por temor a lesionarme la espalda. Tomás me enseñó la técnica segura de cada ejercicio paso a paso. Se me fue la inflamación constante, gané fuerza real y volví a sentirme atractiva y con postura erguida en mi trabajo.",
    metrics: [
      { label: "Miedo a Pesas", value: "Superado" },
      { label: "Inflamación", value: "Cero" },
      { label: "Energía Diaria", value: "100% Vital" }
    ],
    before: {
      status: "Antes (Cansancio Constant)",
      desc: "Le daba vergüenza ir al gimnasio por no saber qué hacer. Vivía contracturada por el estrés profesional."
    },
    after: {
      status: "Hoy (Tono & Postura)",
      desc: "Entrena fuerza estructurada y simple. Logró tonicidad muscular, eliminó la hinchazón y proyecta máxima seguridad."
    }
  },
  {
    id: 3,
    name: "Caso #3 • Carolina V.",
    age: "36 años",
    role: "Arquitecta & Emprendedora",
    location: "Coaching Online",
    image: "/casos_exito/caso3.jpeg",
    highlight: "Transformó su relación con el cuerpo y la fuerza personal.",
    quote: "El gimnasio siempre fue para mí un castigo para 'quemar calorías' por culpa. Con Tomás entendí que es el lugar donde voy a cumplirme la palabra a mí misma. Hoy tengo más energía que a los 25 años.",
    metrics: [
      { label: "Hábito", value: "100% Sostenible" },
      { label: "Fuerza Peso Muerto", value: "+35 kg" },
      { label: "Nivel de Estrés", value: "-60%" }
    ],
    before: {
      status: "Antes (Cardio Excesivo)",
      desc: "Hacía rutinas infinitas de cardio agotador. No lograba masa muscular ni fuerza, y vivía con miedo a la comida."
    },
    after: {
      status: "Hoy (Adherencia Real)",
      desc: "Entrena fuerza simple y estructurada. Come de forma equilibrada sin culpa y ve el entrenamiento como su desconexión."
    }
  },
  {
    id: 4,
    name: "Caso #4 • Luciana S.",
    age: "44 años",
    role: "Abogada & Ejecutiva",
    location: "Coaching Online",
    image: "/casos_exito/caso4.jpeg",
    highlight: "Redujo 10 cm de cintura y eliminó la inflamación crónica.",
    quote: "Viajaba constantemente por trabajo y comía lo que encontraba. El programa de 90 Días me dio orden, sencillez y acompañamiento diario para sostener el hábito en hoteles o en casa.",
    metrics: [
      { label: "Cintura", value: "-10 cm" },
      { label: "Pesadez Abdominal", value: "Eliminada" },
      { label: "Adherencia", value: "Constante" }
    ],
    before: {
      status: "Antes (Desorden por Viajes)",
      desc: "Vivía en constante desorden alimentario por viajes de trabajo. Sentía pesadez digestiva y falta de tono."
    },
    after: {
      status: "Hoy (Organización Total)",
      desc: "Logró hábitos claros adaptables a viajes. Recuperó su postura, abdomen desinflamado y alta energía diaria."
    }
  },
  {
    id: 5,
    name: "Caso #5 • Mariana R.",
    age: "39 años",
    role: "Contadora & Consultora",
    location: "Coaching Online",
    beforeImage: "/casos_exito/caso5.jpeg",
    afterImage: "/casos_exito/caso5.2.jpeg",
    hasPrivacyMask: true,
    highlight: "Cambio radical de composición corporal en 90 Días (Privacidad Protegida).",
    quote: "Probé todas las dietas de moda y entrenamientos agotadores. Con Tomás aprendí que la clave es la fuerza progresiva y la constancia de 3 hs por semana.",
    metrics: [
      { label: "Grasa Corporal", value: "-8.5 kg" },
      { label: "Tono Muscular", value: "+2.5 kg" },
      { label: "Resultado", value: "Garantizado" }
    ],
    before: {
      status: "Antes (Efecto Rebote)",
      desc: "Subía y bajaba de peso constantemente debido a dietas ultra restrictivas y rutinas de cardio sin fuerza."
    },
    after: {
      status: "Hoy (Transformación Definitiva)",
      desc: "Consiguió una figura fuerte, tonificada y un metabolismo activo que mantiene comiendo de todo sin culpa."
    }
  }
];

export default function TransformationSlider() {
  const [viewMode, setViewMode] = useState('GRID'); // GRID (Desktop Multi-Card) or SINGLE
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? STORIES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === STORIES.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="stories-slider-wrapper">
      {/* View Toggle Bar for Desktop */}
      <div className="slider-controls-bar">
        <div className="view-toggle-buttons">
          <button 
            onClick={() => setViewMode('GRID')} 
            className={`toggle-btn ${viewMode === 'GRID' ? 'active' : ''}`}
          >
            <Grid size={16} />
            <span>Ver Todos los Casos</span>
          </button>
          <button 
            onClick={() => setViewMode('SINGLE')} 
            className={`toggle-btn ${viewMode === 'SINGLE' ? 'active' : ''}`}
          >
            <Layers size={16} />
            <span>Ver Detalle Individual</span>
          </button>
        </div>

        {viewMode === 'SINGLE' && (
          <div className="story-controls">
            <button onClick={handlePrev} className="control-btn" aria-label="Anterior">
              <ChevronLeft size={20} />
            </button>
            <span className="control-counter">{activeIndex + 1} de {STORIES.length}</span>
            <button onClick={handleNext} className="control-btn" aria-label="Siguiente">
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      {viewMode === 'GRID' ? (
        /* MULTI-CARD GRID VIEW (Optimized for Desktop Mobile-Format Photos) */
        <div className="stories-multi-grid">
          {STORIES.map((story) => (
            <div key={story.id} className="grid-story-card brand-card-light">
              <div className="card-top-header">
                <div className="user-meta-compact">
                  <div className="user-avatar-sm">{story.name.split('•')[1]?.trim()[0] || 'C'}</div>
                  <div>
                    <h3 className="user-name-sm">{story.name}</h3>
                    <span className="user-role-sm">{story.role}</span>
                  </div>
                </div>
                <span className="location-chip">{story.location}</span>
              </div>

              {/* Image Frame with Mobile Aspect Ratio */}
              <div className="grid-image-container">
                {story.beforeImage && story.afterImage ? (
                  <div className="split-grid-images">
                    <div className="split-grid-item">
                      <span className="split-label label-before">ANTES</span>
                      {story.hasPrivacyMask && (
                        <div className="face-privacy-mask">
                          <Lock size={12} />
                          <span>Privacidad</span>
                        </div>
                      )}
                      <img src={story.beforeImage} alt={`${story.name} - Antes`} className="mobile-fit-photo" />
                    </div>
                    <div className="split-grid-item">
                      <span className="split-label label-after">DESPUÉS</span>
                      {story.hasPrivacyMask && (
                        <div className="face-privacy-mask">
                          <Lock size={12} />
                          <span>Privacidad</span>
                        </div>
                      )}
                      <img src={story.afterImage} alt={`${story.name} - Después`} className="mobile-fit-photo" />
                    </div>
                  </div>
                ) : (
                  <div className="single-grid-image">
                    {story.hasPrivacyMask && (
                      <div className="face-privacy-mask">
                        <Lock size={12} />
                        <span>Privacidad Protegida</span>
                      </div>
                    )}
                    <img src={story.image} alt={story.name} className="mobile-fit-photo" />
                    <div className="image-overlay-badge-sm">
                      <Eye size={13} />
                      <span>Antes y Después</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid-highlight">
                <ShieldCheck size={16} color="#26160D" />
                <span>{story.highlight}</span>
              </div>

              <p className="grid-quote">"{story.quote}"</p>

              <div className="grid-metrics">
                {story.metrics.map((m, idx) => (
                  <div key={idx} className="metric-chip">
                    <span className="m-chip-val">{m.value}</span>
                    <span className="m-chip-lbl">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* SINGLE DETAILED VIEW */
        <div>
          {/* Selector Tabs */}
          <div className="story-tabs">
            {STORIES.map((story, idx) => (
              <button
                key={story.id}
                onClick={() => setActiveIndex(idx)}
                className={`story-tab-btn ${idx === activeIndex ? 'active' : ''}`}
              >
                <span className="tab-name">{story.name}</span>
                <span className="tab-role">{story.role}</span>
              </button>
            ))}
          </div>

          <div className="story-main-card brand-card-light">
            <div className="story-header">
              <div className="user-meta">
                <div className="user-avatar">{STORIES[activeIndex].name.split('•')[1]?.trim()[0] || 'C'}</div>
                <div>
                  <h3 className="user-name">{STORIES[activeIndex].name}</h3>
                  <span className="user-info">{STORIES[activeIndex].age} • {STORIES[activeIndex].role} • {STORIES[activeIndex].location}</span>
                </div>
              </div>
            </div>

            <div className="story-highlight-badge">
              <ShieldCheck size={18} color="#26160D" />
              <span>{STORIES[activeIndex].highlight}</span>
            </div>

            <div className="transformation-image-container">
              {STORIES[activeIndex].beforeImage && STORIES[activeIndex].afterImage ? (
                <div className="split-images-grid">
                  <div className="image-frame split-frame">
                    <span className="split-label label-before">ANTES</span>
                    {STORIES[activeIndex].hasPrivacyMask && (
                      <div className="face-privacy-mask">
                        <Lock size={14} />
                        <span>Privacidad Protegida</span>
                      </div>
                    )}
                    <img 
                      src={STORIES[activeIndex].beforeImage} 
                      alt={`Caso 5 - Antes - ${STORIES[activeIndex].name}`}
                      className="transformation-photo split-photo"
                    />
                  </div>
                  <div className="image-frame split-frame">
                    <span className="split-label label-after">DESPUÉS</span>
                    {STORIES[activeIndex].hasPrivacyMask && (
                      <div className="face-privacy-mask">
                        <Lock size={14} />
                        <span>Privacidad Protegida</span>
                      </div>
                    )}
                    <img 
                      src={STORIES[activeIndex].afterImage} 
                      alt={`Caso 5 - Después - ${STORIES[activeIndex].name}`}
                      className="transformation-photo split-photo"
                    />
                  </div>
                </div>
              ) : (
                <div className="image-frame">
                  {STORIES[activeIndex].hasPrivacyMask && (
                    <div className="face-privacy-mask">
                      <Lock size={14} />
                      <span>Privacidad Protegida</span>
                    </div>
                  )}
                  <img 
                    src={STORIES[activeIndex].image} 
                    alt={`Transformación Antes y Después - ${STORIES[activeIndex].name}`}
                    className="transformation-photo"
                  />
                  <div className="image-overlay-badge">
                    <Eye size={15} />
                    <span>Registro Real 100% Auténtico</span>
                  </div>
                </div>
              )}
            </div>

            <blockquote className="story-quote">
              <Quote size={28} className="quote-icon" />
              <p>"{STORIES[activeIndex].quote}"</p>
            </blockquote>

            <div className="comparison-grid">
              <div className="comp-box comp-before">
                <span className="comp-tag tag-before">
                  <XCircle size={15} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                  {STORIES[activeIndex].before.status}
                </span>
                <p>{STORIES[activeIndex].before.desc}</p>
              </div>
              <div className="comp-box comp-after">
                <span className="comp-tag tag-after">
                  <CheckCircle2 size={15} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                  {STORIES[activeIndex].after.status}
                </span>
                <p>{STORIES[activeIndex].after.desc}</p>
              </div>
            </div>

            <div className="metrics-row">
              {STORIES[activeIndex].metrics.map((m, idx) => (
                <div key={idx} className="metric-badge">
                  <span className="m-val">{m.value}</span>
                  <span className="m-lbl">{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .stories-slider-wrapper {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        /* Controls & View Toggle */
        .slider-controls-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .view-toggle-buttons {
          display: flex;
          gap: 0.5rem;
          background: var(--color-creme-dark);
          padding: 0.3rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-light);
        }

        .toggle-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.45rem 1rem;
          border-radius: var(--radius-full);
          border: none;
          background: transparent;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--color-espresso);
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
        }

        .toggle-btn.active {
          background: #FFFFFF;
          color: var(--color-obsidian);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        /* Multi Card Grid (Desktop Optimization) */
        .stories-multi-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }

        .grid-story-card {
          background: #FFFFFF;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-lg);
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          box-shadow: 0 12px 30px rgba(38, 22, 13, 0.05);
        }

        .card-top-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
        }

        .user-meta-compact {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .user-avatar-sm {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--color-espresso);
          color: var(--color-creme);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 1rem;
        }

        .user-name-sm {
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--color-obsidian);
        }

        .user-role-sm {
          font-size: 0.78rem;
          color: var(--color-creme-muted);
        }

        .location-chip {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--color-espresso);
          background: var(--color-creme);
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-light);
        }

        /* Mobile Fit Image Container in Grid */
        .grid-image-container {
          width: 100%;
          border-radius: var(--radius-md);
          overflow: hidden;
          background: #1C1A17;
          margin-bottom: 1.25rem;
          border: 1px solid var(--border-light);
        }

        .single-grid-image {
          position: relative;
          width: 100%;
          max-height: 380px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #000000;
        }

        .split-grid-images {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 4px;
          background: #000000;
        }

        .split-grid-item {
          position: relative;
          aspect-ratio: 9 / 14;
        }

        .mobile-fit-photo {
          width: 100%;
          height: 100%;
          object-fit: contain;
          max-height: 380px;
          display: block;
        }

        /* Frosted Glass Face Blur Overlay */
        .face-privacy-mask {
          position: absolute;
          top: 3%;
          left: 50%;
          transform: translateX(-50%);
          width: 48%;
          height: 18%;
          background: rgba(245, 240, 232, 0.35);
          backdrop-filter: blur(28px) saturate(180%) brightness(1.1);
          -webkit-backdrop-filter: blur(28px) saturate(180%) brightness(1.1);
          border: 1.5px solid rgba(255, 255, 255, 0.7);
          border-radius: var(--radius-full);
          color: var(--color-obsidian);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
          font-size: 0.72rem;
          font-weight: 800;
          z-index: 5;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
        }

        .grid-highlight {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--color-espresso);
          background: var(--color-creme-dark);
          padding: 0.5rem 0.85rem;
          border-radius: var(--radius-md);
          margin-bottom: 1rem;
        }

        .grid-quote {
          font-size: 0.92rem;
          font-style: italic;
          color: var(--color-obsidian);
          line-height: 1.5;
          margin-bottom: 1.25rem;
        }

        .grid-metrics {
          display: flex;
          gap: 0.5rem;
          margin-top: auto;
          padding-top: 1rem;
          border-top: 1px solid var(--border-light);
        }

        .metric-chip {
          flex: 1;
          background: var(--color-creme);
          padding: 0.5rem;
          border-radius: var(--radius-sm);
          text-align: center;
          display: flex;
          flex-direction: column;
        }

        .m-chip-val {
          font-size: 0.95rem;
          font-weight: 800;
          color: var(--color-espresso);
        }

        .m-chip-lbl {
          font-size: 0.7rem;
          color: var(--color-creme-muted);
        }

        /* Single View Styles */
        .story-tabs {
          display: flex;
          gap: 0.75rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
          margin-bottom: 1.25rem;
        }

        .story-tab-btn {
          flex: 1;
          min-width: 160px;
          padding: 0.85rem 1rem;
          background: #FFFFFF;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          cursor: pointer;
          font-family: inherit;
        }

        .story-tab-btn.active {
          background: var(--color-espresso);
          color: var(--color-creme);
        }

        .story-main-card {
          padding: 2.5rem;
          background: #FFFFFF;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-lg);
        }

        .story-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .user-meta {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .user-avatar {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: var(--color-espresso);
          color: var(--color-creme);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 1.3rem;
        }

        .user-name {
          font-size: 1.3rem;
          font-weight: 800;
          color: var(--color-obsidian);
        }

        .user-info {
          font-size: 0.85rem;
          color: var(--color-creme-muted);
        }

        .story-controls {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .control-counter {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--color-espresso);
        }

        .control-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--color-creme-light);
          border: 1px solid var(--border-light);
          color: var(--color-obsidian);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .story-highlight-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.5rem 1rem;
          background: var(--color-creme-dark);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-full);
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--color-espresso);
          margin-bottom: 1.5rem;
        }

        .transformation-image-container {
          margin-bottom: 2rem;
        }

        .split-images-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .image-frame {
          position: relative;
          width: 100%;
          overflow: hidden;
          border-radius: var(--radius-md);
          background: #000000;
          border: 1px solid var(--border-light);
        }

        .transformation-photo {
          width: 100%;
          height: auto;
          max-height: 480px;
          object-fit: contain;
          display: block;
        }

        .split-label {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
          padding: 0.3rem 0.75rem;
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 800;
          z-index: 2;
        }

        .label-before { background: rgba(220, 38, 38, 0.9); color: #FFF; }
        .label-after { background: rgba(22, 163, 74, 0.9); color: #FFF; }

        .image-overlay-badge, .image-overlay-badge-sm {
          position: absolute;
          bottom: 0.75rem;
          right: 0.75rem;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(245, 240, 232, 0.92);
          backdrop-filter: blur(10px);
          color: var(--color-obsidian);
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-full);
          font-size: 0.78rem;
          font-weight: 700;
        }

        .story-quote {
          position: relative;
          font-size: 1.1rem;
          font-style: italic;
          color: var(--color-obsidian);
          line-height: 1.6;
          margin-bottom: 2rem;
          padding-left: 2.2rem;
        }

        .quote-icon {
          position: absolute;
          left: 0;
          top: 0;
          color: var(--color-creme-muted);
          opacity: 0.5;
        }

        .comparison-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
          margin-bottom: 2rem;
        }

        .comp-box {
          padding: 1.25rem;
          border-radius: var(--radius-md);
          font-size: 0.92rem;
          line-height: 1.5;
        }

        .comp-before {
          background: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.2);
        }

        .comp-after {
          background: var(--color-creme);
          border: 1px solid var(--border-light);
        }

        .comp-tag {
          display: block;
          font-size: 0.8rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .tag-before { color: #DC2626; }
        .tag-after { color: var(--color-espresso); }

        .metrics-row {
          display: flex;
          gap: 1rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border-light);
        }

        .metric-badge {
          flex: 1;
          padding: 0.85rem;
          background: var(--color-creme);
          border-radius: var(--radius-sm);
          text-align: center;
          display: flex;
          flex-direction: column;
        }

        .m-val { font-size: 1.1rem; font-weight: 800; color: var(--color-espresso); }
        .m-lbl { font-size: 0.75rem; color: var(--color-creme-muted); }

        @media (max-width: 900px) {
          .stories-multi-grid {
            grid-template-columns: 1fr;
          }
          .slider-controls-bar {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}} />
    </div>
  );
}
