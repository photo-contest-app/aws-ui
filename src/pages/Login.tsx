import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Auth.css';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Kirjautuminen epäonnistui. Tarkista kirjautumistietosi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Tervetuloa takaisin</h1>
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
            <label htmlFor="password">Salasana</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Syötä salasanasi"
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Kirjaudutaan...' : 'Kirjaudu sisään'}
          </button>
        </form>
        <p className="auth-link">
          Uusi Kuukauden Kuvassa? <Link to="/luo-tunnus">Luo tili</Link>
        </p>
        <p className="auth-footer-link">
          <Link to="/tietosuoja">Tietosuoja ja käyttöehdot</Link>
        </p>
      </div>
    </div>
  );
};

