import React, { useState, useEffect } from 'react';
import { winnerAPI } from '../services/api';
import type { Winner } from '../services/api';
import '../styles/Winners.css';

export const Results: React.FC = () => {
  const [winner, setWinner] = useState<Winner | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadWinner();
  }, []);

  const loadWinner = async () => {
    try {
      setLoading(true);
      const data = await winnerAPI.getLastMonthWinner();
      setWinner(data);
      setError('');
    } catch (err: any) {
      setError('Tietoja ei ole vielä saatavilla');
    } finally {
      setLoading(false);
    }
  };

  const formatMonth = (monthYear: string) => {
    const [year, month] = monthYear.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('fi-FI', { year: 'numeric', month: 'long' });
  };

  return (
    <div className="winners-container">
      <h1>Viime kuun voittaja</h1>

      <div className="results">
      {loading && (
          <div>Ladataan viime kuun tuloksia...</div>
      )}

      {error && (
          <>
            <h2>{error}</h2>
            <p>
              Eniten ääniä saanut valokuva julkaistaan kuukauden vaihteessa keskiyöllä UTC-ajassa.
            </p>
          </>
      )}
      </div>

      {winner && (
        <div className="winner-card">
          <div className="winner-badge">Voittaja</div>
          <h2>{formatMonth(winner.month_year)}</h2>

          <div className="winner-photo">
            <img
              src={winner.image_url || `https://d1e093ozsec2c7.cloudfront.net/${encodeURIComponent(winner.s3_key)}`}
              alt={winner.title}
            />
          </div>

          <div className="winner-details">
            <h3>{winner.title}</h3>
            <div className="winner-stats">
              <div className="stat">
                <span className="stat-label">Ääniä yhteensä</span>
                <span className="stat-value">{winner.vote_count}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Kuukausi</span>
                <span className="stat-value">{formatMonth(winner.month_year).split(' ')[0]}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Vuosi</span>
                <span className="stat-value">{winner.month_year.split('-')[0]}</span>
              </div>
            </div>
            <p className="winner-date">
              Onnittelut voittajalle!
            </p>
          </div>
        </div>
      )}

      <div className="winners-info">
        <h3>Näin se toimii</h3>
        <ul>
          <li>Lähetä yksi kuva kuukaudessa osallistuaksesi kilpailuun.</li>
          <li>Valitse osallistujien kuvista mieleisesi ja äänestä sitä.</li>
          <li>Voit äänestää vain yhtä kuvaa, mutta voit vaihtaa äänesi koko kuukauden ajan.</li>
          <li>Voittaja julkaistaan automaattisesti joka kuukauden vaihteessa.</li>
          <li>Tasatilanteessa aikaisemmin lähetetty kuva voittaa.</li>
        </ul>
      </div>
    </div>
  );
};

