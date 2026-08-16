// Storage engine & lead qualification logic for Tomás Pussetto Quiz

const LEADS_STORAGE_KEY = 'tomas_pussetto_quiz_leads_v1';

export function evaluateLeadQualification(answers) {
  // answers object keys: 1 (duracion), 2 (urgencia), 3 (tiempo), 4 (inversion), 5 (contacto)
  const q2_urgencia = answers[2];
  const q3_tiempo = answers[3];
  const q4_inversion = answers[4];

  // Disqualification criteria
  if (q2_urgencia === 'no_prioridad' || q2_urgencia === 'mas_adelante') {
    return {
      isQualified: false,
      reason: 'Falta de Urgencia / Procrastinación',
      badgeText: 'No Apto por Urgencia'
    };
  }

  if (q3_tiempo === 'sin_tiempo') {
    return {
      isQualified: false,
      reason: 'Sin Disponibilidad de Tiempo',
      badgeText: 'No Apto por Tiempo'
    };
  }

  if (q4_inversion === 'sin_presupuesto') {
    return {
      isQualified: false,
      reason: 'Sin Presupuesto para Inversión',
      badgeText: 'No Apto por Presupuesto'
    };
  }

  return {
    isQualified: true,
    reason: 'Lead Calificado (Alta Urgencia + Tiempo + Presupuesto)',
    badgeText: 'Calificado - Apto y Prioritario'
  };
}

export function saveQuizLead(leadData) {
  try {
    const existing = getStoredLeads();
    const newLead = {
      id: 'lead_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      createdAt: new Date().toISOString(),
      ...leadData
    };

    const updated = [newLead, ...existing];
    if (typeof window !== 'undefined') {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
    }

    // Try optional remote API submission if server endpoint is present
    fetch('/api/submit-quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newLead)
    }).catch(() => {
      // Silently ignore if offline or purely static
    });

    return newLead;
  } catch (err) {
    console.error('Error saving quiz lead:', err);
    return null;
  }
}

export function getStoredLeads() {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(LEADS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

export function clearStoredLeads() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(LEADS_STORAGE_KEY);
  }
}
