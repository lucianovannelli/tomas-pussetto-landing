import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, MessageCircle, Sparkles, ShieldCheck, ArrowRight, User, Phone } from 'lucide-react';
import { evaluateLeadQualification, saveQuizLead } from '../utils/leadStorage';

const QUESTIONS = [
  {
    id: 1,
    key: 'duracion',
    title: "¿Cuánto tiempo hace que venís queriendo bajar esos kilos que te molestan y no podés lograrlo?",
    options: [
      { label: "Hace algunos meses", value: "algunos_meses", text: "Hace algunos meses" },
      { label: "Hace más de un año", value: "mas_de_un_ano", text: "Hace más de un año" },
      { label: "Hace más de 3 años", value: "mas_de_tres_anos", text: "Hace más de 3 años" }
    ]
  },
  {
    id: 2,
    key: 'urgencia',
    title: "¿Qué importancia tiene para vos bajar esos kg de grasa y sentirte mejor con tu cuerpo actualmente?",
    options: [
      { 
        label: "Es un objetivo impostergable, realmente necesito resolverlo AHORA.", 
        value: "impostergable", 
        text: "Es un objetivo impostergable (Alta Urgencia)",
        isDisqualifying: false 
      },
      { 
        label: "Es algo que me gustaría lograr, pero no es mi prioridad principal actualmente.", 
        value: "no_prioridad", 
        text: "No es mi prioridad actualmente",
        isDisqualifying: true 
      },
      { 
        label: "Pienso en hacerlo cuando esté algo más liberada de mis obligaciones profesionales y personales.", 
        value: "mas_adelante", 
        text: "Pienso hacerlo más adelante",
        isDisqualifying: true 
      }
    ]
  },
  {
    id: 3,
    key: 'tiempo',
    title: "¿De cuánto tiempo disponés de forma realista en tu rutina para entrenar y cumplir con el plan?",
    options: [
      { 
        label: "Dispongo de 3 hs semanales (45 a 50 min/sesión) para dedicarle a mi transformación personal.", 
        value: "dispongo_3hs", 
        text: "Dispongo de 3 hs semanales",
        isDisqualifying: false 
      },
      { 
        label: "Creo que puedo organizar mi rutina y obligaciones para entrenar 2/3 hs semanales y cumplir con el plan.", 
        value: "puedo_organizar", 
        text: "Puedo organizar 2/3 hs semanales",
        isDisqualifying: false 
      },
      { 
        label: "No dispongo en este momento del tiempo necesario para hacerlo.", 
        value: "sin_tiempo", 
        text: "No dispongo del tiempo en este momento",
        isDisqualifying: true 
      }
    ]
  },
  {
    id: 4,
    key: 'inversion',
    title: "El programa de Tomás Pussetto es una Asesoría 1 a 1 de Alto Valor (Coaching diario 24/7, Nutricionista y Garantía). ¿Estás dispuesta a invertir en un servicio profesional personalizado para asegurar tu resultado?",
    options: [
      { 
        label: "Sí, estoy lista para invertir en mí misma y tener el acompañamiento profesional adecuado.", 
        value: "lista_para_invertir", 
        text: "Lista para invertir en acompañamiento profesional",
        isDisqualifying: false 
      },
      { 
        label: "Si el programa se adapta a mi vida y me garantiza resultados, sí puedo invertir en el plan.", 
        value: "invertir_con_garantia", 
        text: "Puedo invertir si me garantiza resultados",
        isDisqualifying: false 
      },
      { 
        label: "No dispongo de presupuesto para invertir en un programa profesional por el momento.", 
        value: "sin_presupuesto", 
        text: "No dispongo de presupuesto por el momento",
        isDisqualifying: true 
      }
    ]
  }
];

export default function QuizInteractive() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [qualification, setQualification] = useState(null);

  const handleSelectOption = (optionValue) => {
    const nextAnswers = { ...answers, [QUESTIONS[currentStep].id]: optionValue };
    setAnswers(nextAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Move to Contact step (Step 4 -> Contact)
      setCurrentStep(QUESTIONS.length);
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactName.trim() || !contactPhone.trim()) return;

    // Evaluate qualification criteria
    const qualResult = evaluateLeadQualification(answers);
    setQualification(qualResult);

    // Get readable option text for storage
    const getOptionText = (qId) => {
      const q = QUESTIONS.find(item => item.id === qId);
      const opt = q?.options.find(o => o.value === answers[qId]);
      return opt ? opt.text : answers[qId];
    };

    const leadPayload = {
      name: contactName,
      phone: contactPhone,
      isQualified: qualResult.isQualified,
      reason: qualResult.reason,
      badgeText: qualResult.badgeText,
      answers: {
        duracion: getOptionText(1),
        urgencia: getOptionText(2),
        tiempo: getOptionText(3),
        inversion: getOptionText(4)
      },
      rawAnswers: answers
    };

    // Save lead to Database / Storage
    saveQuizLead(leadPayload);
    setIsCompleted(true);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setContactName('');
    setContactPhone('');
    setIsCompleted(false);
    setQualification(null);
  };

  const getWhatsAppMessage = () => {
    const getOptionText = (qId) => {
      const q = QUESTIONS.find(item => item.id === qId);
      const opt = q?.options.find(o => o.value === answers[qId]);
      return opt ? opt.text : answers[qId];
    };

    const text = encodeURIComponent(
      `Hola Tomás! Mi nombre es ${contactName}.\nRealicé el Test de Calificación en tu web:\n\n- Antigüedad: ${getOptionText(1)}\n- Prioridad / Urgencia: ${getOptionText(2)}\n- Disponibilidad Tiempo: ${getOptionText(3)}\n- Disposición Inversión: ${getOptionText(4)}\n\nMi perfil fue Calificado como APTO y quiero consultar disponibilidad de cupo.`
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
                style={{ width: `${((currentStep + 1) / (QUESTIONS.length + 1)) * 100}%` }}
              />
            </div>

            {currentStep < QUESTIONS.length ? (
              /* Question Step */
              <div>
                <div className="quiz-header">
                  <span className="quiz-badge">
                    <Sparkles size={14} />
                    Paso {currentStep + 1} de {QUESTIONS.length + 1}
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
              /* Contact Step */
              <form onSubmit={handleContactSubmit} className="quiz-contact-step">
                <div className="quiz-header">
                  <span className="quiz-badge">
                    <Sparkles size={14} />
                    Último Paso • Contacto Directo
                  </span>
                  <h3 className="quiz-question">Ingresá tus datos para procesar tu diagnóstico</h3>
                  <p className="quiz-contact-sub">
                    Analizaremos tus respuestas para evaluar la compatibilidad de tu perfil con el Programa de 90 Días.
                  </p>
                </div>

                <div className="contact-form-grid">
                  <div className="form-group">
                    <label>Nombre y Apellido *</label>
                    <div className="input-icon-wrapper">
                      <User size={18} className="input-icon" />
                      <input 
                        type="text" 
                        required
                        placeholder="Ej: Natalia Martinez"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>WhatsApp de contacto *</label>
                    <div className="input-icon-wrapper">
                      <Phone size={18} className="input-icon" />
                      <input 
                        type="tel" 
                        required
                        placeholder="Ej: +54 9 341 1234567"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg btn-submit-quiz">
                    <span>Ver Resultado de mi Diagnóstico</span>
                    <ArrowRight size={20} />
                  </button>

                  <button 
                    type="button"
                    onClick={() => setCurrentStep(QUESTIONS.length - 1)}
                    className="quiz-back-btn"
                  >
                    ← Modificar mis respuestas
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* Result Screen */
          <div>
            {qualification?.isQualified ? (
              /* QUALIFIED SCREEN */
              <div className="quiz-result result-qualified">
                <div className="result-badge badge-success">
                  <CheckCircle size={28} color="#26160D" />
                  <span>Perfil Calificado • Apto y Prioritario</span>
                </div>

                <h3 className="result-title">
                  ¡Felicitaciones, <span>{contactName}</span>! Estás lista para el Programa de 90 Días
                </h3>

                <p className="result-desc">
                  Hemos verificado tus respuestas. Cumplís con el nivel de <strong>urgencia, tiempo disponible y compromiso de inversión</strong> necesario para acceder al acompañamiento 1 a 1 de Tomás Pussetto.
                </p>

                <div className="result-box">
                  <h4>Resumen de tu diagnóstico:</h4>
                  <ul>
                    <li>✓ Prioridad Alta: Lista para resolver tu cambio sin procrastinar.</li>
                    <li>✓ Disponibilidad: Horarios organizados para 3 hs semanales de fuerza.</li>
                    <li>✓ Inversión: Comprometida con un servicio profesional con garantía.</li>
                  </ul>
                </div>

                <div className="result-actions">
                  <a 
                    href={getWhatsAppMessage()} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-lg btn-whatsapp-quiz"
                  >
                    <MessageCircle size={22} />
                    <span>Enviar mi diagnóstico a Tomás por WhatsApp</span>
                  </a>

                  <button onClick={handleReset} className="quiz-reset-btn">
                    <RotateCcw size={16} />
                    <span>Reiniciar Test</span>
                  </button>
                </div>
              </div>
            ) : (
              /* DISQUALIFIED SCREEN (No Apto por el Momento) */
              <div className="quiz-result result-disqualified">
                <div className="result-badge badge-warning">
                  <XCircle size={28} color="#DC2626" />
                  <span>Perfil No Apto por el Momento</span>
                </div>

                <h3 className="result-title text-disqualified">
                  Gracias por tu interés, <span>{contactName}</span>
                </h3>

                <p className="result-desc">
                  Según tus respuestas actuales (<strong>{qualification?.reason}</strong>), entendemos que en este momento no contás con el nivel de urgencia, tiempo o presupuesto indispensable para el Programa 1 a 1.
                </p>

                <div className="result-box box-disqualified">
                  <h4>¿Por qué realizamos este filtro?</h4>
                  <p className="text-disqualified-sub">
                    Tomás Pussetto trabaja con un cupo reducido de alumnas para garantizar un seguimiento diario 24/7 de máxima calidad. Para asegurar que tengas éxito, el programa exige que el entrenamiento sea una prioridad real e impostergable en tu vida.
                  </p>
                </div>

                <div className="result-actions">
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-lg"
                  >
                    <span>Seguir a Tomás en Instagram (Contenido Gratuito)</span>
                  </a>

                  <button onClick={handleReset} className="quiz-reset-btn">
                    <RotateCcw size={16} />
                    <span>Volver a intentar el Test</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .quiz-container {
          max-width: 780px;
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
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--color-obsidian);
          line-height: 1.3;
        }

        .quiz-contact-sub {
          font-size: 0.95rem;
          color: var(--color-creme-muted);
          margin-top: 0.5rem;
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
          font-size: 0.98rem;
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

        /* Form Controls */
        .contact-form-grid {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          text-align: left;
        }

        .form-group label {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--color-obsidian);
        }

        .input-icon-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 1rem;
          color: var(--color-creme-muted);
        }

        .form-input {
          width: 100%;
          padding: 0.9rem 1rem 0.9rem 2.8rem;
          background: var(--color-creme-light);
          border: 1px solid rgba(38, 22, 13, 0.18);
          border-radius: var(--radius-md);
          font-size: 1rem;
          font-family: inherit;
          color: var(--color-obsidian);
          outline: none;
          transition: border-color 0.2s ease;
        }

        .form-input:focus {
          border-color: var(--color-espresso);
          background: #FFFFFF;
        }

        .btn-submit-quiz {
          width: 100%;
          margin-top: 0.5rem;
        }

        .quiz-back-btn {
          margin-top: 1.5rem;
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
          font-size: 0.95rem;
          font-weight: 700;
          padding: 0.4rem 1rem;
          border-radius: 999px;
          margin-bottom: 1.25rem;
        }

        .badge-success {
          background: var(--color-creme-dark);
          color: var(--color-espresso);
          border: 1px solid rgba(38, 22, 13, 0.15);
        }

        .badge-warning {
          background: rgba(220, 38, 38, 0.08);
          color: #DC2626;
          border: 1px solid rgba(220, 38, 38, 0.2);
        }

        .result-title {
          font-size: 1.75rem;
          font-weight: 800;
          margin-bottom: 1rem;
          color: var(--color-obsidian);
          line-height: 1.25;
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

        .box-disqualified {
          background: rgba(220, 38, 38, 0.04);
          border-color: rgba(220, 38, 38, 0.15);
        }

        .text-disqualified-sub {
          font-size: 0.92rem;
          color: var(--color-creme-muted);
          line-height: 1.55;
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
            font-size: 1.2rem;
          }
        }
      `}} />
    </div>
  );
}
