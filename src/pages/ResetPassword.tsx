import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import '../styles/Auth.css';

export const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (password !== confirmPassword) {
      setError('Salasanat eivät täsmää');
      return;
    }

    if (password.length < 8) {
      setError('Salasanan tulee olla vähintään 8 merkkiä pitkä');
      return;
    }

    setLoading(true);

    try {
      await authAPI.resetPassword(email, code, password);
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Salasanan vaihto epäonnistui. Tarkista tiedot ja yritä uudelleen.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <h1>Salasana vaihdettu!</h1>
          <div className="success-message">
            <p>Salasanasi on vaihdettu onnistuneesti.</p>
            <p>Voit nyt kirjautua sisään uudella salasanallasi.</p>
          </div>
          <button onClick={() => navigate('/kirjaudu')} className="btn-primary">
            Siirry kirjautumiseen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Vaihda salasana</h1>
        <p className="auth-description">
          Syötä sähköpostiisi lähetetty palautuskoodi ja uusi salasanasi.
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
          <div className="form-group">
            <label htmlFor="code">Palautuskoodi</label>
            <input
              id="code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              placeholder="Syötä sähköpostiin lähetetty koodi"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Uusi salasana</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Syötä uusi salasana (väh. 8 merkkiä)"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Vahvista salasana</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Syötä salasana uudelleen"
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Vaihdetaan...' : 'Vaihda salasana'}
          </button>
        </form>
        <p className="auth-link">
          Tarvitsetko uuden koodin? <Link to="/unohditko-salasanan">Pyydä uusi koodi</Link>
        </p>
        <p className="auth-link">
          <Link to="/kirjaudu">Takaisin kirjautumiseen</Link>
        </p>
      </div>
    </div>
  );
};

