import React, { useState } from 'react';
import { ShieldCheck, Quote, ChevronLeft, ChevronRight, XCircle, CheckCircle2, Eye } from 'lucide-react';

const STORIES = [
  {
    id: 1,
    name: "Caso #1 • Natalia M.",
    age: "41 años",
    role: "Escribana & Madre",
    location: "Coaching Online",
    image: "/casos_exito/caso1.jpeg",
    highlight: "De vivir inflamada y con dietas estrictas a perder 9 kg de grasa sosteniendo 3 días/semana.",
    quote: "Tenía dos jornadas superpuestas (trabajo + hijos) y vivía cansada, deshinchada a base de café y picoteando por ansiedad. Tomás me armó un plan de fuerza de 3 días que se adapta a mi caos. Eliminé la ansiedad y volví a ponerme la ropa que tenía guardada con total seguridad.",
    metrics: [
      { label: "Grasa & Inflamación", value: "-9 kg" },
      { label: "Ansiedad Picoteo", value: "Eliminada" },
      { label: "Frecuencia", value: "3 Días/Sem" }
    ],
    before: {
      status: "Antes (Ciclo de Culpa & Restricción)",
      desc: "Hacía dietas de hambre y cardio agotador. A las 3 semanas la carga laboral la desbordaba, sentía culpa por no cumplir, comía por ansiedad de noche y abandonaba 4 meses."
    },
    after: {
      status: "Hoy (Adherencia & Fuerza)",
      desc: "Entrena 3 sesiones semanales de 50 minutos adaptadas a su agenda cambiante. Come de forma equilibrada sin culpa y recuperó su tono muscular, postura e imagen profesional."
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
      status: "Antes (Ciclo de Culpa & Restricción)",
      desc: "Le daba vergüenza ir al gimnasio por no saber qué hacer. Vivía contracturada por el estrés profesional y con desgano constante."
    },
    after: {
      status: "Hoy (Adherencia & Fuerza)",
      desc: "Entrena fuerza estructurada y simple. Logró tonicidad muscular, eliminó la hinchazón y proyecta máxima seguridad en sus reuniones laborales."
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
      status: "Antes (Ciclo de Culpa & Restricción)",
      desc: "Hacía rutinas infinitas de cardio agotador. No lograba masa muscular ni fuerza, y vivía con miedo a los carbohidratos."
    },
    after: {
      status: "Hoy (Adherencia & Fuerza)",
      desc: "Entrena fuerza simple y estructurada. Come de forma equilibrada sin culpa y ve el entrenamiento como su momento inviolable de desconexión."
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
      status: "Antes (Cansancio & Desorden)",
      desc: "Vivía en constante desorden alimentario por viajes de trabajo. Sentía pesadez digestiva y falta de tono corporal."
    },
    after: {
      status: "Hoy (Organización & Tono)",
      desc: "Logró hábitos claros adaptables a viajes y trabajo. Recuperó su postura, abdomen desinflamado y vitalidad."
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
    highlight: "Cambio radical de composición corporal en 90 Días (Antes y Después).",
    quote: "Probé todas las dietas de moda y entrenamientos agotadores. Con Tomás aprendí que la clave es la fuerza progresiva y la constancia de 3 hs por semana.",
    metrics: [
      { label: "Grasa Corporal", value: "-8.5 kg" },
      { label: "Tono Muscular", value: "+2.5 kg" },
      { label: "Garantía Cumplida", value: "100% Exitoso" }
    ],
    before: {
      status: "Antes (Efecto Rebote)",
      desc: "Subía y bajaba de peso constantemente debido a dietas ultra restrictivas y rutinas de cardio sin estructura de fuerza."
    },
    after: {
      status: "Hoy (Transformación Definitiva)",
      desc: "Consiguió una figura fuerte, tonificada y un metabolismo activo que mantiene comiendo de todo sin culpa."
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
            <div className="user-avatar">{current.name.split('•')[1]?.trim()[0] || 'C'}</div>
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

        {/* Before / After Photo Display */}
        <div className="transformation-image-container">
          {current.beforeImage && current.afterImage ? (
            /* Split Before/After layout for Case 5 */
            <div className="split-images-grid">
              <div className="image-frame split-frame">
                <span className="split-label label-before">ANTES</span>
                <img 
                  src={current.beforeImage} 
                  alt={`Caso 5 - Antes - ${current.name}`}
                  className="transformation-photo split-photo"
                />
              </div>
              <div className="image-frame split-frame">
                <span className="split-label label-after">DESPUÉS</span>
                <img 
                  src={current.afterImage} 
                  alt={`Caso 5 - Después - ${current.name}`}
                  className="transformation-photo split-photo"
                />
              </div>
            </div>
          ) : (
            /* Single combined image for Cases 1 to 4 */
            <div className="image-frame">
              <img 
                src={current.image} 
                alt={`Transformación Antes y Después - ${current.name}`}
                className="transformation-photo"
              />
              <div className="image-overlay-badge">
                <Eye size={15} />
                <span>Registro Real de Proceso 100% Auténtico</span>
              </div>
            </div>
          )}
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
          gap: 0.75rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
        }

        .story-tab-btn {
          flex: 1;
          min-width: 170px;
          padding: 0.9rem 1.1rem;
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
          font-size: 0.95rem;
        }

        .tab-role {
          font-size: 0.75rem;
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
          border: 1px solid rgba(38, 22, 13, 0.12);
          background: var(--color-creme);
        }

        .split-frame {
          aspect-ratio: 4 / 5;
        }

        .transformation-photo {
          width: 100%;
          height: auto;
          max-height: 480px;
          object-fit: contain;
          background: #000000;
          display: block;
          transition: transform 0.4s ease;
        }

        .split-photo {
          height: 100%;
          max-height: 100%;
          object-fit: cover;
        }

        .split-label {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
          padding: 0.3rem 0.75rem;
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          z-index: 2;
        }

        .label-before {
          background: rgba(220, 38, 38, 0.9);
          color: #FFFFFF;
        }

        .label-after {
          background: rgba(22, 163, 74, 0.9);
          color: #FFFFFF;
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
          .split-images-grid {
            grid-template-columns: 1fr;
          }
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
