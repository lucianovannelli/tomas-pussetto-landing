import React, { useState } from 'react';
import { CheckCircle, RotateCcw, MessageCircle, Sparkles } from 'lucide-react';

const QUESTIONS = [
  {
    id: 1,
    title: "¿Cuál ha sido tu principal obstáculo al intentar entrenar?",
    options: [
      { label: "Empiezo motivado pero a las 3 o 4 semanas el trabajo o los compromisos me desbordan y dejo.", value: "abandono_frecuente" },
      { label: "Voy al gimnasio pero no sé bien qué hacer ni cómo progresar en los ejercicios de fuerza.", value: "falta_estructura" },
      { label: "Siento culpa cada vez que me salteo una sesión y eso me lleva a abandonar por completo.", value: "ciclo_culpa" }
    ]
  },
  {
    id: 2,
    title: "¿Cuántas veces iniciaste y abandonaste en los últimos 2 años?",
    options: [
      { label: "Entre 1 y 2 veces.", value: "pocas_veces" },
      { label: "Entre 3 y 5 veces (vivo en el ciclo de empezar y dejar).", value: "ciclo_constante" },
      { label: "Perdí la cuenta, me cuesta muchísimo sostener la continuidad.", value: "alta_frustracion" }
    ]
  },
  {
    id: 3,
    title: "¿De cuánto tiempo semanal dispones de forma realista?",
    options: [
      { label: "2 a 3 días por semana (45 a 60 minutos por sesión).", value: "tiempo_medio" },
      { label: "3 a 4 días por semana.", value: "tiempo_optimo" },
      { label: "Tengo una agenda impredecible y necesito flexibilidad total.", value: "tiempo_flexible" }
    ]
  },
  {
    id: 4,
    title: "¿Qué significaría para vos 'cumplirte la palabra' en los próximos 6 meses?",
    options: [
      { label: "Convertir la fuerza en un hábito natural que disfrute y no abandone nunca más.", value: "habito_definitivo" },
      { label: "Ganar fuerza real, energía y sentirme en paz con mi cuerpo sin dietas extremas.", value: "fuerza_equilibrio" },
      { label: "Dejar de sentir culpa y construir disciplina sostenible para la vida.", value: "disciplina_vida" }
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
      `Hola Tomás! Realicé el Test de Adherencia en tu web.\nMis respuestas:\n- Obstáculo: ${answers[1] || ''}\n- Reintentos: ${answers[2] || ''}\n- Tiempo: ${answers[3] || ''}\n- Meta: ${answers[4] || ''}\nQuiero coordinar una charla para empezar mi plan.`
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
              Estás listo para romper el ciclo y construir <span>Adherencia Real</span>
            </h3>

            <p className="result-desc">
              Tu perfil encaja perfectamente con el método de <strong>Tomás Pussetto</strong>. Tu problema no es la falta de voluntad, sino haber intentado seguir programas rígidos que no contemplan tu rutina diaria.
            </p>

            <div className="result-box">
              <h4>Lo que vamos a trabajar juntos:</h4>
              <ul>
                <li>✓ Un plan de fuerza ajustado a tus horarios reales sin sobrecargas.</li>
                <li>✓ Eliminación del sentimiento de culpa si surge una semana complicada.</li>
                <li>✓ Estrategias de psicología del hábito para sostener la constancia todo el año.</li>
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
