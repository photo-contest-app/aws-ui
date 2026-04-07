import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import '../styles/Auth.css';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      await authAPI.forgotPassword(email);
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Salasanan palautuspyynnön lähettäminen epäonnistui. Yritä uudelleen.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <h1>Tarkista sähköpostisi</h1>
          <div className="success-message">
            <p>Salasanan palautuskoodi on lähetetty sähköpostiisi.</p>
            <p>Tarkista postilaatikkosi ja seuraa ohjeita vaihtaaksesi salasanasi.</p>
          </div>
          <Link to="/palauta-salasana" className="btn-primary">
            Syötä palautuskoodi
          </Link>
          <p className="auth-link">
            <Link to="/kirjaudu">Takaisin kirjautumiseen</Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Unohditko salasanasi?</h1>
        <p className="auth-description">
          Syötä sähköpostiosoitteesi, niin lähetämme sinulle ohjeet salasanan vaihtamiseksi.
        </p>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Sähköpostiosoite</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Syötä sähköpostiosoitteesi"
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Lähetetään...' : 'Lähetä palautuskoodi'}
          </button>
        </form>
        <p className="auth-link">
          Muistitko salasanasi? <Link to="/kirjaudu">Kirjaudu sisään</Link>
        </p>
      </div>
    </div>
  );
};
