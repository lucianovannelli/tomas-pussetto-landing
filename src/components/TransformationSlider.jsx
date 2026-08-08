import React, { useState } from 'react';
import { HeartHandshake, ShieldCheck, Quote, ChevronLeft, ChevronRight, XCircle, CheckCircle2, Eye } from 'lucide-react';

const STORIES = [
  {
    id: 1,
    name: "Martín R.",
    age: "42 años",
    role: "Abogado & Padre de 2 hijos",
    location: "Rosario",
    image: "/caso-1-transformacion.jpg",
    highlight: "De abandonar cada 3 meses a entrenar 3 días/semana sin saltearse durante 1 año.",
    quote: "No buscaba abdominales marcados. Solo quería volver a jugar con mis hijos sin quedarme sin aire y dejar de sentirme culpable por abandonar el gimnasio. Tomás me enseñó a adaptar el entrenamiento a mi vida real.",
    metrics: [
      { label: "Continuidad", value: "+12 Meses" },
      { label: "Sensación", value: "Cero Culpa" },
      { label: "Frecuencia", value: "3 Días/Sem" }
    ],
    before: {
      status: "Antes (Ciclo de Culpa)",
      desc: "Arrancaba 5 días por semana con dietas estrictas. A la tercera semana se le complicaba el estudio de abogados, faltaba 2 días seguidos, sentía culpa y abandonaba 4 meses."
    },
    after: {
      status: "Hoy (Adherencia Real)",
      desc: "Entrena 3 sesiones semanales de 50 minutos con foco en ejercicios de fuerza básicos. Si un día laboral se satura, ajustamos sin culpa y retomamos al día siguiente."
    }
  },
  {
    id: 2,
    name: "Carolina V.",
    age: "36 años",
    role: "Arquitecta & Emprendedora",
    location: "Coaching Online",
    image: "/caso-2-transformacion.jpg",
    highlight: "Transformó su relación con el cuerpo y la fuerza personal.",
    quote: "El gimnasio siempre fue para mí un castigo para 'quemar calorías'. Con Tomás entendí que es el lugar donde voy a cumplirme la palabra a mí misma. Hoy tengo más energía que a los 25 años.",
    metrics: [
      { label: "Hábito", value: "100% Sostenible" },
      { label: "Fuerza Peso Muerto", value: "+35 kg" },
      { label: "Nivel de Estrés", value: "-60%" }
    ],
    before: {
      status: "Antes (Ciclo de Culpa)",
      desc: "Hacía rutinas infinitas de cardio agotador. No lograba masa muscular ni fuerza, y vivía con miedo a los carbohidratos."
    },
    after: {
      status: "Hoy (Adherencia Real)",
      desc: "Entrena fuerza simple y estructurada. Come de forma equilibrada sin culpa y ve el entrenamiento como su momento inviolable de desconexión."
    }
  },
  {
    id: 3,
    name: "Gonzalo S.",
    age: "48 años",
    role: "Director Comercial",
    location: "Rosario",
    image: "/caso-3-transformacion.jpg",
    highlight: "De vivir contracturado por el estrés a sentirse fuerte y vital.",
    quote: "Por mi trabajo viajo constantemente. Tomás me diseñó una estructura que puedo hacer en cualquier gimnasio de hotel o en mi casa en 40 minutos. La constancia es total.",
    metrics: [
      { label: "Viajes de trabajo", value: "Adaptados" },
      { label: "Dolor lumbar", value: "Eliminado" },
      { label: "Adherencia", value: "14 Meses" }
    ],
    before: {
      status: "Antes (Ciclo de Culpa)",
      desc: "Consideraba que si no entrenaba 2 horas diarias no valía la pena. Como no tenía ese tiempo, terminaba no haciendo nada."
    },
    after: {
      status: "Hoy (Adherencia Real)",
      desc: "Entrena con estímulos cortos y efectivos de fuerza. Entendió que 40 minutos constantes valen más que 2 horas esporádicas."
    }
  }
];

export default function TransformationSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = STORIES[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? STORIES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === STORIES.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="stories-slider-wrapper">
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

      {/* Active Story Card */}
      <div className="story-main-card">
        <div className="story-header">
          <div className="user-meta">
            <div className="user-avatar">{current.name[0]}</div>
            <div>
              <h3 className="user-name">{current.name}</h3>
              <span className="user-info">{current.age} • {current.role} • {current.location}</span>
            </div>
          </div>

          <div className="story-controls">
            <button onClick={handlePrev} className="control-btn" aria-label="Anterior">
              <ChevronLeft size={20} />
            </button>
            <button onClick={handleNext} className="control-btn" aria-label="Siguiente">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="story-highlight-badge">
          <ShieldCheck size={18} color="#26160D" />
          <span>{current.highlight}</span>
        </div>

        {/* Before / After Photo Feature */}
        <div className="transformation-image-container">
          <div className="image-frame">
            <img 
              src={current.image} 
              alt={`Transformación Antes y Después - ${current.name}`}
              className="transformation-photo"
            />
            <div className="image-overlay-badge">
              <Eye size={15} />
              <span>Registro Real de Proceso</span>
            </div>
          </div>
        </div>

        <blockquote className="story-quote">
          <Quote size={28} className="quote-icon" />
          <p>"{current.quote}"</p>
        </blockquote>

        {/* Before & After Detailed Breakdown */}
        <div className="comparison-grid">
          <div className="comp-box comp-before">
            <span className="comp-tag tag-before">
              <XCircle size={15} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
              {current.before.status}
            </span>
            <p>{current.before.desc}</p>
          </div>
          <div className="comp-box comp-after">
            <span className="comp-tag tag-after">
              <CheckCircle2 size={15} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
              {current.after.status}
            </span>
            <p>{current.after.desc}</p>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="metrics-row">
          {current.metrics.map((m, idx) => (
            <div key={idx} className="metric-badge">
              <span className="m-val">{m.value}</span>
              <span className="m-lbl">{m.label}</span>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .stories-slider-wrapper {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .story-tabs {
          display: flex;
          gap: 1rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
        }

        .story-tab-btn {
          flex: 1;
          min-width: 200px;
          padding: 1rem 1.25rem;
          background: #FFFFFF;
          border: 1px solid rgba(38, 22, 13, 0.12);
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          cursor: pointer;
          transition: all 0.25s ease;
          color: var(--color-creme-muted);
          font-family: inherit;
        }

        .story-tab-btn:hover {
          background: var(--color-creme-dark);
          border-color: var(--color-espresso);
        }

        .story-tab-btn.active {
          background: var(--color-espresso);
          border-color: var(--color-espresso);
          color: var(--color-creme);
        }

        .tab-name {
          font-weight: 700;
          font-size: 1.05rem;
        }

        .tab-role {
          font-size: 0.78rem;
          opacity: 0.85;
          margin-top: 2px;
        }

        /* Main Card */
        .story-main-card {
          padding: 2.5rem;
          background: #FFFFFF;
          border: 1px solid rgba(38, 22, 13, 0.12);
          border-radius: var(--radius-lg);
          box-shadow: 0 15px 35px rgba(38, 22, 13, 0.06);
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
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 1.3rem;
          color: var(--color-creme);
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
          gap: 0.5rem;
        }

        .control-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--color-creme-light);
          border: 1px solid rgba(38, 22, 13, 0.15);
          color: var(--color-obsidian);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .control-btn:hover {
          background: var(--color-espresso);
          color: var(--color-creme);
        }

        .story-highlight-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.5rem 1rem;
          background: var(--color-creme-dark);
          border: 1px solid rgba(38, 22, 13, 0.12);
          border-radius: var(--radius-full);
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--color-espresso);
          margin-bottom: 1.5rem;
        }

        /* Transformation Image Styling */
        .transformation-image-container {
          margin-bottom: 2rem;
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(38, 22, 13, 0.1);
        }

        .image-frame {
          position: relative;
          width: 100%;
          overflow: hidden;
          border-radius: var(--radius-md);
          border: 1px solid rgba(38, 22, 13, 0.12);
        }

        .transformation-photo {
          width: 100%;
          height: auto;
          max-height: 420px;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }

        .transformation-photo:hover {
          transform: scale(1.02);
        }

        .image-overlay-badge {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(245, 240, 232, 0.92);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(38, 22, 13, 0.15);
          color: var(--color-obsidian);
          padding: 0.4rem 0.85rem;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 700;
        }

        .story-quote {
          position: relative;
          font-size: 1.15rem;
          font-style: italic;
          color: var(--color-obsidian);
          line-height: 1.6;
          margin-bottom: 2rem;
          padding-left: 2.5rem;
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
          color: #1C1A17;
        }

        .comp-after {
          background: var(--color-creme);
          border: 1px solid rgba(38, 22, 13, 0.15);
          color: var(--color-obsidian);
        }

        .comp-tag {
          display: block;
          font-size: 0.8rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .tag-before {
          color: #DC2626;
        }

        .tag-after {
          color: var(--color-espresso);
        }

        .metrics-row {
          display: flex;
          gap: 1rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(38, 22, 13, 0.1);
        }

        .metric-badge {
          flex: 1;
          padding: 0.85rem;
          background: var(--color-creme-light);
          border: 1px solid rgba(38, 22, 13, 0.08);
          border-radius: var(--radius-sm);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .m-val {
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--color-espresso);
        }

        .m-lbl {
          font-size: 0.75rem;
          color: var(--color-creme-muted);
          margin-top: 2px;
        }

        @media (max-width: 768px) {
          .comparison-grid {
            grid-template-columns: 1fr;
          }
          .metrics-row {
            flex-wrap: wrap;
          }
          .metric-badge {
            min-width: 45%;
          }
        }
      `}} />
    </div>
  );
}
