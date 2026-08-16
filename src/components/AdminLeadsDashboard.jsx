import React, { useState, useEffect } from 'react';
import { getStoredLeads, clearStoredLeads } from '../utils/leadStorage';
import { 
  Users, CheckCircle2, XCircle, MessageCircle, Lock, Download, 
  Trash2, Filter, Search, Calendar, ShieldCheck, Clock, Award
} from 'lucide-react';

const ADMIN_PIN = 'pussetto2026';

export default function AdminLeadsDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  
  const [leads, setLeads] = useState([]);
  const [filter, setFilter] = useState('ALL'); // ALL, QUALIFIED, DISQUALIFIED
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Check if session pin is stored
    if (typeof window !== 'undefined') {
      const savedPin = sessionStorage.getItem('admin_pin_authenticated');
      if (savedPin === 'true') {
        setIsAuthenticated(true);
        loadLeads();
      }
    }
  }, []);

  const loadLeads = () => {
    const data = getStoredLeads();
    setLeads(data);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (pinInput.trim() === ADMIN_PIN) {
      setIsAuthenticated(true);
      setPinError(false);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('admin_pin_authenticated', 'true');
      }
      loadLeads();
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('admin_pin_authenticated');
    }
  };

  const handleClearAll = () => {
    if (confirm('¿Estás seguro de borrar todo el historial de respuestas? Esta acción no se puede deshacer.')) {
      clearStoredLeads();
      setLeads([]);
    }
  };

  const handleExportCSV = () => {
    if (leads.length === 0) return;

    const headers = ['ID', 'Fecha', 'Nombre', 'Telefono', 'Estado', 'Razon', 'Duracion', 'Urgencia', 'Tiempo', 'Inversion'];
    const rows = leads.map(l => [
      l.id,
      new Date(l.createdAt).toLocaleString(),
      `"${l.name || ''}"`,
      `"${l.phone || ''}"`,
      l.isQualified ? 'CALIFICADO' : 'DESCALIFICADO',
      `"${l.reason || ''}"`,
      `"${l.answers?.duracion || ''}"`,
      `"${l.answers?.urgencia || ''}"`,
      `"${l.answers?.tiempo || ''}"`,
      `"${l.answers?.inversion || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `leads_tomas_pussetto_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered leads
  const filteredLeads = leads.filter(l => {
    const matchesFilter = 
      filter === 'ALL' ? true :
      filter === 'QUALIFIED' ? l.isQualified :
      !l.isQualified;

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      (l.name && l.name.toLowerCase().includes(query)) ||
      (l.phone && l.phone.toLowerCase().includes(query)) ||
      (l.reason && l.reason.toLowerCase().includes(query));

    return matchesFilter && matchesSearch;
  });

  const totalLeads = leads.length;
  const qualifiedCount = leads.filter(l => l.isQualified).length;
  const disqualifiedCount = totalLeads - qualifiedCount;
  const qualPercentage = totalLeads > 0 ? Math.round((qualifiedCount / totalLeads) * 100) : 0;

  if (!isAuthenticated) {
    return (
      <div className="admin-login-wrapper">
        <div className="admin-login-card brand-card-light">
          <div className="login-icon-box">
            <Lock size={28} />
          </div>
          <h2 className="login-title">Acceso Panel de Respuestas</h2>
          <p className="login-sub">Ingresá el PIN de administrador de Tomás Pussetto</p>

          <form onSubmit={handleLogin} className="login-form">
            <input 
              type="password" 
              placeholder="PIN de acceso"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              className={`form-input ${pinError ? 'input-error' : ''}`}
            />
            {pinError && <p className="error-text">PIN incorrecto. Intentá nuevamente.</p>}

            <button type="submit" className="btn btn-primary btn-lg w-100">
              <span>Ingresar al Dashboard</span>
            </button>
          </form>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          .admin-login-wrapper {
            min-height: 70vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
          }
          .admin-login-card {
            max-width: 420px;
            width: 100%;
            padding: 2.5rem;
            text-align: center;
            background: #FFFFFF;
            border: 1px solid var(--border-light);
            box-shadow: 0 20px 40px rgba(38, 22, 13, 0.08);
            border-radius: var(--radius-lg);
          }
          .login-icon-box {
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background: var(--color-creme);
            color: var(--color-espresso);
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.25rem;
            border: 1px solid var(--border-light);
          }
          .login-title {
            font-size: 1.5rem;
            font-weight: 800;
            color: var(--color-obsidian);
          }
          .login-sub {
            font-size: 0.9rem;
            color: var(--color-creme-muted);
            margin: 0.4rem 0 1.5rem;
          }
          .login-form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
          .input-error {
            border-color: #DC2626 !important;
          }
          .error-text {
            color: #DC2626;
            font-size: 0.85rem;
            font-weight: 600;
          }
          .w-100 { width: 100%; }
        `}} />
      </div>
    );
  }

  return (
    <div className="admin-dashboard-container">
      {/* Dashboard Top Header */}
      <div className="dashboard-header">
        <div>
          <span className="badge">
            <Award size={14} />
            Panel de Diagnósticos & Leads
          </span>
          <h1 className="dashboard-title">Base de Respuestas del Quiz</h1>
        </div>

        <div className="dashboard-header-actions">
          <button onClick={handleExportCSV} className="btn btn-secondary btn-sm" disabled={leads.length === 0}>
            <Download size={16} />
            <span>Exportar CSV</span>
          </button>

          <button onClick={handleLogout} className="btn btn-secondary btn-sm">
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="kpi-grid">
        <div className="kpi-card brand-card-light">
          <div className="kpi-header">
            <Users size={20} className="kpi-icon text-obsidian" />
            <span className="kpi-title">Total Respuestas</span>
          </div>
          <span className="kpi-value">{totalLeads}</span>
          <span className="kpi-sub">Test de Adherencia</span>
        </div>

        <div className="kpi-card brand-card-light border-success">
          <div className="kpi-header">
            <CheckCircle2 size={20} color="#16A34A" />
            <span className="kpi-title">Aptos (Calificados)</span>
          </div>
          <span className="kpi-value text-success">{qualifiedCount}</span>
          <span className="kpi-sub">{qualPercentage}% del Total</span>
        </div>

        <div className="kpi-card brand-card-light border-warning">
          <div className="kpi-header">
            <XCircle size={20} color="#DC2626" />
            <span className="kpi-title">No Aptos (Filtrados)</span>
          </div>
          <span className="kpi-value text-warning">{disqualifiedCount}</span>
          <span className="kpi-sub">Falta de Presupuesto/Urgencia</span>
        </div>
      </div>

      {/* Controls: Search & Filter */}
      <div className="controls-bar">
        <div className="filter-tabs">
          <button 
            onClick={() => setFilter('ALL')} 
            className={`filter-btn ${filter === 'ALL' ? 'active' : ''}`}
          >
            Todos ({totalLeads})
          </button>
          <button 
            onClick={() => setFilter('QUALIFIED')} 
            className={`filter-btn btn-qual ${filter === 'QUALIFIED' ? 'active' : ''}`}
          >
            🟢 Calificados ({qualifiedCount})
          </button>
          <button 
            onClick={() => setFilter('DISQUALIFIED')} 
            className={`filter-btn btn-disqual ${filter === 'DISQUALIFIED' ? 'active' : ''}`}
          >
            🔴 Filtrados ({disqualifiedCount})
          </button>
        </div>

        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input 
            type="text" 
            placeholder="Buscar por nombre o teléfono..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Leads List */}
      {filteredLeads.length > 0 ? (
        <div className="leads-grid">
          {filteredLeads.map((lead) => (
            <div 
              key={lead.id} 
              className={`lead-card ${lead.isQualified ? 'lead-card-qualified' : 'lead-card-disqualified'}`}
            >
              <div className="lead-card-header">
                <div className="lead-user-meta">
                  <h3 className="lead-name">{lead.name || 'Sin Nombre'}</h3>
                  <div className="lead-contact-line">
                    <span className="lead-phone">{lead.phone || 'Sin Teléfono'}</span>
                    <span className="lead-date">
                      <Clock size={13} />
                      {new Date(lead.createdAt).toLocaleDateString('es-AR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>

                <div className="lead-status-box">
                  {lead.isQualified ? (
                    <span className="status-badge status-badge-success">
                      <CheckCircle2 size={14} />
                      {lead.badgeText || 'Calificado'}
                    </span>
                  ) : (
                    <span className="status-badge status-badge-danger">
                      <XCircle size={14} />
                      {lead.reason || 'Filtrado'}
                    </span>
                  )}
                </div>
              </div>

              {/* Answers Breakdown */}
              <div className="lead-answers-box">
                <div className="ans-item">
                  <span className="ans-label">⏳ Duración del problema:</span>
                  <span className="ans-val">{lead.answers?.duracion || '-'}</span>
                </div>
                <div className="ans-item">
                  <span className="ans-label">🔥 Urgencia / Prioridad:</span>
                  <span className="ans-val">{lead.answers?.urgencia || '-'}</span>
                </div>
                <div className="ans-item">
                  <span className="ans-label">🕒 Tiempo Semanal:</span>
                  <span className="ans-val">{lead.answers?.tiempo || '-'}</span>
                </div>
                <div className="ans-item">
                  <span className="ans-label">💳 Inversión 1 a 1:</span>
                  <span className="ans-val">{lead.answers?.inversion || '-'}</span>
                </div>
              </div>

              {/* WhatsApp Direct Action Button */}
              {lead.phone && (
                <div className="lead-card-footer">
                  <a 
                    href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Hola%20${encodeURIComponent(lead.name || '')}!%20Te%20escribo%20del%20equipo%20de%20Tomás%20Pussetto%20sobre%20tu%20diagnóstico`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm lead-wa-btn"
                  >
                    <MessageCircle size={16} />
                    <span>Iniciar Chat por WhatsApp</span>
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state brand-card-light">
          <Users size={36} className="text-muted" />
          <h3>No hay respuestas guardadas</h3>
          <p>Las respuestas del test de calificación aparecerán aquí automáticamente.</p>
        </div>
      )}

      {leads.length > 0 && (
        <div className="danger-zone">
          <button onClick={handleClearAll} className="btn-clear-danger">
            <Trash2 size={16} />
            <span>Borrar historial de respuestas</span>
          </button>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .admin-dashboard-container {
          max-width: 1080px;
          margin: 0 auto;
          padding: 2.5rem 1.5rem 5rem;
        }

        .dashboard-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-light);
        }

        .dashboard-title {
          font-size: 2.2rem;
          font-weight: 800;
          color: var(--color-obsidian);
          margin-top: 0.5rem;
        }

        .dashboard-header-actions {
          display: flex;
          gap: 0.75rem;
        }

        /* KPI Cards */
        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .kpi-card {
          padding: 1.75rem;
          background: #FFFFFF;
          border: 1px solid var(--border-light);
          display: flex;
          flex-direction: column;
        }

        .border-success { border-color: rgba(22, 163, 74, 0.25); }
        .border-warning { border-color: rgba(220, 38, 38, 0.25); }

        .kpi-header {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 0.75rem;
        }

        .kpi-title {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--color-creme-muted);
        }

        .kpi-value {
          font-size: 2.2rem;
          font-weight: 800;
          color: var(--color-obsidian);
          line-height: 1;
        }

        .text-success { color: #16A34A; }
        .text-warning { color: #DC2626; }

        .kpi-sub {
          font-size: 0.8rem;
          color: var(--color-creme-muted);
          margin-top: 0.4rem;
        }

        /* Controls Bar */
        .controls-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .filter-tabs {
          display: flex;
          gap: 0.5rem;
          background: var(--color-creme-dark);
          padding: 0.3rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-light);
        }

        .filter-btn {
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

        .filter-btn.active {
          background: #FFFFFF;
          color: var(--color-obsidian);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .search-box {
          position: relative;
          display: flex;
          align-items: center;
          flex: 1;
          max-width: 320px;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          color: var(--color-creme-muted);
        }

        .search-input {
          width: 100%;
          padding: 0.55rem 1rem 0.55rem 2.6rem;
          background: #FFFFFF;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-full);
          font-size: 0.88rem;
          font-family: inherit;
          outline: none;
        }

        /* Leads Grid & Card */
        .leads-grid {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .lead-card {
          background: #FFFFFF;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          padding: 1.75rem;
          box-shadow: 0 8px 24px rgba(38, 22, 13, 0.04);
          transition: transform 0.2s ease;
        }

        .lead-card-qualified {
          border-left: 4px solid #16A34A;
        }

        .lead-card-disqualified {
          border-left: 4px solid #DC2626;
        }

        .lead-card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 1.25rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-light);
        }

        .lead-name {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--color-obsidian);
        }

        .lead-contact-line {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: 0.25rem;
        }

        .lead-phone {
          font-size: 0.92rem;
          font-weight: 700;
          color: var(--color-espresso);
        }

        .lead-date {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.8rem;
          color: var(--color-creme-muted);
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 700;
        }

        .status-badge-success {
          background: rgba(22, 163, 74, 0.1);
          color: #15803D;
        }

        .status-badge-danger {
          background: rgba(220, 38, 38, 0.1);
          color: #B91C1C;
        }

        .lead-answers-box {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.85rem;
          background: var(--color-creme);
          padding: 1.25rem;
          border-radius: var(--radius-sm);
          margin-bottom: 1.25rem;
        }

        .ans-item {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .ans-label {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--color-creme-muted);
          text-transform: uppercase;
        }

        .ans-val {
          font-size: 0.92rem;
          font-weight: 600;
          color: var(--color-obsidian);
        }

        .lead-card-footer {
          display: flex;
          justify-content: flex-end;
        }

        .lead-wa-btn {
          font-size: 0.88rem;
          padding: 0.6rem 1.2rem;
        }

        .empty-state {
          padding: 4rem 2rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          background: #FFFFFF;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
        }

        .danger-zone {
          margin-top: 3rem;
          display: flex;
          justify-content: center;
        }

        .btn-clear-danger {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: transparent;
          border: none;
          color: var(--color-creme-muted);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .btn-clear-danger:hover {
          color: #DC2626;
        }

        @media (max-width: 768px) {
          .kpi-grid { grid-template-columns: 1fr; }
          .lead-answers-box { grid-template-columns: 1fr; }
          .dashboard-header { flex-direction: column; align-items: flex-start; gap: 1rem; }
        }
      `}} />
    </div>
  );
}
