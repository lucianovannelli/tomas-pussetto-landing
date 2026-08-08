import React, { useState } from 'react';
import { CheckCircle, RotateCcw, MessageCircle, Sparkles } from 'lucide-react';

const QUESTIONS = [
  {
    id: 1,
    title: "¿Cuál es tu mayor obstáculo actualmente con tu cuerpo y energía?",
    options: [
      { label: "Siento agotamiento, inflamación constante y la ansiedad me lleva al picoteo de tarde/noche.", value: "ansiedad_inflamacion" },
      { label: "Mi jornada laboral y familiar es caótica; empiezo motivada pero a las semanas abandono por falta de tiempo.", value: "agenda_caotica" },
      { label: "Tengo miedo a lastimarme en el gimnasio o no saber cómo entrenar fuerza correctamente.", value: "miedo_lesiones" }
    ]
  },
  {
    id: 2,
    title: "¿Cómo afecta tu rutina actual a cómo te ves y te sientes?",
    options: [
      { label: "La ropa no me entra cómodamente y evito exponerme en eventos o sacar fotos.", value: "inseguridad_ropa" },
      { label: "Siento que el cansancio y el peso me restan seguridad en mi ámbito profesional.", value: "seguridad_laboral" },
      { label: "Vivo en un sube y baja de peso debido a dietas estrictas con efecto rebote.", value: "efecto_rebote" }
    ]
  },
  {
    id: 3,
    title: "¿De cuánto tiempo semanal dispones de forma realista para entrenar?",
    options: [
      { label: "2 a 3 días por semana (45 a 50 minutos por sesión).", value: "tiempo_medio" },
      { label: "3 a 4 días por semana.", value: "tiempo_optimo" },
      { label: "Mi agenda profesional cambia día a día y necesito máxima flexibilidad.", value: "agenda_impredecible" }
    ]
  },
  {
    id: 4,
    title: "¿Cuál es tu deseo principal de transformación para los próximos 6 meses?",
    options: [
      { label: "Perder grasa/inflamación, ganar tono muscular y sentirme fuerte y atractiva como antes.", value: "deshinchazon_fuerza" },
      { label: "Eliminar la ansiedad con la comida y construir hábitos sostenibles sin pasar hambre.", value: "habito_sin_dieta" },
      { label: "Volver a sentirme orgullosa, segura y proyectar vitalidad en mi trabajo y familia.", value: "autoestima_energia" }
    ]
  }
];

export default function QuizInteractive() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSelectOption = (optionValue) => {
    const nextAnswers = { ...answers, [QUESTIONS[currentStep].id]: optionValue };
    setAnswers(nextAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setIsCompleted(false);
  };

  const getWhatsAppMessage = () => {
    const text = encodeURIComponent(
      `Hola Tomás! Completé el Test de Adherencia en tu web.\nMis respuestas:\n- Desafío principal: ${answers[1] || ''}\n- Impacto actual: ${answers[2] || ''}\n- Disponibilidad: ${answers[3] || ''}\n- Meta de transformación: ${answers[4] || ''}\nQuiero consultar disponibilidad para mi plan personalizado.`
    );
    return `https://wa.me/5493410000000?text=${text}`;
  };

  return (
    <div id="quiz" className="quiz-container">
      <div className="quiz-card brand-card-light">
        {!isCompleted ? (
          <div>
            <div className="quiz-progress-bar">
              <div 
                className="quiz-progress-fill" 
                style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>

            <div className="quiz-header">
              <span className="quiz-badge">
                <Sparkles size={14} />
                Paso {currentStep + 1} de {QUESTIONS.length}
              </span>
              <h3 className="quiz-question">{QUESTIONS[currentStep].title}</h3>
            </div>

            <div className="quiz-options-list">
              {QUESTIONS[currentStep].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt.value)}
                  className="quiz-option-btn"
                >
                  <div className="option-radio" />
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>

            {currentStep > 0 && (
              <button 
                onClick={() => setCurrentStep(currentStep - 1)}
                className="quiz-back-btn"
              >
                ← Volver a la pregunta anterior
              </button>
            )}
          </div>
        ) : (
          <div className="quiz-result">
            <div className="result-badge">
              <CheckCircle size={28} color="#26160D" />
              <span>Diagnóstico Completado</span>
            </div>

            <h3 className="result-title">
              Estás lista para construir <span>Adherencia Real & Salud Hormonal</span>
            </h3>

            <p className="result-desc">
              Tu perfil coincide exactamente con las mujeres profesionales que asesora <strong>Tomás Pussetto</strong>. Tu problema no es la falta de voluntad, sino haber intentado encajar en dietas restrictivas y rutinas rígidas que no se adaptan a tu ritmo de vida real.
            </p>

            <div className="result-box">
              <h4>Lo que vamos a lograr juntas en tu plan:</h4>
              <ul>
                <li>✓ Plan de fuerza seguro (2 o 3 días/semana) adaptado a tus horarios.</li>
                <li>✓ Eliminación de la ansiedad por picoteo y desinflamación progresiva.</li>
                <li>✓ Estrategia para ganar tono muscular y recuperar tu seguridad y ropa favorita.</li>
              </ul>
            </div>

            <div className="result-actions">
              <a 
                href={getWhatsAppMessage()} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg btn-whatsapp-quiz"
              >
                <MessageCircle size={20} />
                <span>Enviar mi diagnóstico a Tomás por WhatsApp</span>
              </a>

              <button onClick={handleReset} className="quiz-reset-btn">
                <RotateCcw size={16} />
                <span>Reiniciar Test</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .quiz-container {
          max-width: 760px;
          margin: 0 auto;
        }

        .quiz-card {
          padding: 3rem;
          background: #FFFFFF;
          border: 1px solid rgba(38, 22, 13, 0.12);
          border-radius: var(--radius-lg);
          position: relative;
          box-shadow: 0 15px 35px rgba(38, 22, 13, 0.06);
        }

        .quiz-progress-bar {
          width: 100%;
          height: 6px;
          background: rgba(38, 22, 13, 0.08);
          border-radius: 999px;
          overflow: hidden;
          margin-bottom: 2rem;
        }

        .quiz-progress-fill {
          height: 100%;
          background: var(--color-espresso);
          transition: width 0.35s ease;
        }

        .quiz-header {
          margin-bottom: 2rem;
        }

        .quiz-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--color-espresso);
          background: var(--color-creme-dark);
          padding: 0.35rem 0.85rem;
          border-radius: 999px;
          margin-bottom: 0.75rem;
          border: 1px solid rgba(38, 22, 13, 0.1);
        }

        .quiz-question {
          font-size: 1.45rem;
          font-weight: 800;
          color: var(--color-obsidian);
          line-height: 1.3;
        }

        .quiz-options-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .quiz-option-btn {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.15rem 1.35rem;
          background: var(--color-creme-light);
          border: 1px solid rgba(38, 22, 13, 0.12);
          border-radius: var(--radius-md);
          color: var(--color-obsidian);
          font-size: 1rem;
          font-weight: 600;
          text-align: left;
          cursor: pointer;
          transition: all 0.25s ease;
          font-family: inherit;
        }

        .quiz-option-btn:hover {
          background: var(--color-creme-dark);
          border-color: var(--color-espresso);
          transform: translateX(4px);
        }

        .option-radio {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid rgba(38, 22, 13, 0.3);
          flex-shrink: 0;
          transition: all 0.2s ease;
        }

        .quiz-option-btn:hover .option-radio {
          border-color: var(--color-espresso);
          background: var(--color-espresso);
        }

        .quiz-back-btn {
          margin-top: 1.75rem;
          background: transparent;
          border: none;
          color: var(--color-creme-muted);
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .quiz-back-btn:hover {
          color: var(--color-obsidian);
        }

        /* Result Styles */
        .quiz-result {
          text-align: center;
        }

        .result-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 1rem;
          font-weight: 700;
          color: var(--color-espresso);
          margin-bottom: 1rem;
        }

        .result-title {
          font-size: 1.85rem;
          font-weight: 800;
          margin-bottom: 1rem;
          color: var(--color-obsidian);
        }

        .result-desc {
          font-size: 1.05rem;
          color: var(--color-creme-muted);
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .result-box {
          background: var(--color-creme);
          border: 1px solid rgba(38, 22, 13, 0.12);
          border-radius: var(--radius-md);
          padding: 1.5rem;
          text-align: left;
          margin-bottom: 2rem;
        }

        .result-box h4 {
          font-size: 1.05rem;
          color: var(--color-obsidian);
          margin-bottom: 0.85rem;
          font-weight: 800;
        }

        .result-box ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .result-box li {
          font-size: 0.95rem;
          color: var(--color-obsidian);
          font-weight: 500;
        }

        .result-actions {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: center;
        }

        .btn-whatsapp-quiz {
          width: 100%;
        }

        .quiz-reset-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: transparent;
          border: none;
          color: var(--color-creme-muted);
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
        }

        @media (max-width: 640px) {
          .quiz-card {
            padding: 1.75rem;
          }
          .quiz-question {
            font-size: 1.25rem;
          }
        }
      `}} />
    </div>
  );
}
