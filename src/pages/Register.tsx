import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import '../styles/Auth.css';

export const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [needsVerification, setNeedsVerification] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!acceptTerms) {
      setError('Sinun on hyväksyttävä käyttöehdot ja tietosuojaseloste jatkaaksesi.');
      return;
    }

    setLoading(true);

    try {
      await register(email, password, firstName, lastName);
      setSuccess('Registration successful! Please check your email for a verification code.');
      setNeedsVerification(true);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await authAPI.confirmSignUp(email, verificationCode);
      setSuccess('Sähköposti vahvistettu onnistuneesti! Ohjataan kirjautumissivulle...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Vahvistus epäonnistui. Tarkista koodi ja yritä uudelleen.');
    } finally {
      setLoading(false);
    }
  };

  if (needsVerification) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <h1>Vahvista sähköpostisi</h1>
          <p className="verification-info">
            Lähetimme vahvistuskoodin osoitteeseen <strong>{email}</strong>
          </p>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          <form onSubmit={handleVerify}>
            <div className="form-group">
              <label htmlFor="verificationCode">Vahvistuskoodi</label>
              <input
                id="verificationCode"
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
                placeholder="123456"
                maxLength={6}
                autoFocus
              />
              <small>Syötä 6-numeroinen koodi sähköpostistasi</small>
            </div>
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Vahvistetaan...' : 'Vahvista sähköposti'}
            </button>
          </form>
          <p className="auth-link">
            Etkö saanut koodia? <button onClick={handleSubmit} className="link-button">Lähetä uudelleen</button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Luo uusi tili</h1>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">Etunimi</label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              placeholder="Syötä etunimesi"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Sukunimi</label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              placeholder="Syötä sukunimesi"
            />
          </div>
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
              placeholder="Luo vahva salasana"
              minLength={8}
            />
            <small>Vähintään 8 merkkiä isoine ja pieniä kirjaimia sekä numeroita</small>
          </div>
          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                required
              />
              <span>
                Hyväksyn <Link to="/tietosuoja" target="_blank" rel="noopener noreferrer">käyttöehdot ja tietosuojaselosteen</Link>
              </span>
            </label>
          </div>
          <button type="submit" disabled={loading || !acceptTerms} className="btn-primary">
            {loading ? 'Luodaan tiliä...' : 'Luo tili'}
          </button>
        </form>
        <p className="auth-link">
          Onko sinulla jo tili? <Link to="/login">Kirjaudu sisään</Link>
        </p>
      </div>
    </div>
  );
};

