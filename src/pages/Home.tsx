import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { photoAPI } from '../services/api';
import type { Photo } from '../services/api';
import '../styles/Home.css';

export const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [publicPhotos, setPublicPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      loadPublicPhotos();
    }
  }, [isAuthenticated]);

  const loadPublicPhotos = async () => {
    try {
      const photos = await photoAPI.getPublicPhotos(50);
      const randomizedPhotos = photos.sort(() => Math.random() - 0.5).slice(0, 4);
      setPublicPhotos(randomizedPhotos);
    } catch (error) {
      console.error('Error loading public photos:', error);
    }
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">📸 Kuukauden Kuva</h1>
          <p className="hero-subtitle">
            Jaa paras valokuvasi ja kilpaile kuukausittaisesta tunnustuksesta
          </p>
          <p className="hero-description">
            Liity eläväiseen valokuvaajien yhteisöömme. Lähetä paras kuvasi, äänestä upeita valokuvia
            ja juhli luovuutta joka kuukausi.
          </p>
          <div className="hero-buttons">
            {isAuthenticated ? (
              <>
                <Link to="/aanesta" className="btn-primary-large">Aloita äänestäminen</Link>
                <Link to="/laheta" className="btn-secondary-large">Lähetä kuva</Link>
              </>
            ) : (
              <>
                <Link to="/luo-tunnus" className="btn-primary-large">Aloita tästä</Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Public Photos Gallery - Only shown when not logged in */}
      {!isAuthenticated && publicPhotos.length > 0 && (
        <section className="home-gallery-section">
          <div className="home-gallery-container">
            <div className="home-photo-gallery">
              {publicPhotos.map((photo, index) => (
                <div
                  key={photo.photo_id}
                  className={`home-photo-tile home-photo-tile-${(index % 4) + 1}`}
                >
                  <img
                    src={photo.image_url || `https://d1e093ozsec2c7.cloudfront.net/${encodeURIComponent(photo.s3_key)}`}
                    alt={photo.title}
                    className="home-photo-tile-image"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Näin se toimii</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📤</div>
            <h3>Lähetä kuvasi</h3>
            <p>Lataa paras valokuvasi joka kuukausi. Muut pääsevät äänestämään valokuvaasi heti.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👍</div>
            <h3>Äänestä kuvaa</h3>
            <p>Selaa ja äänestä mielestäsi parasta valokuvaa muilta kilpailijoilta. Äänesi auttaa määrittämään kuukauden voittajan.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3>Voita kisa</h3>
            <p>Voittaja valitaan automaattisesti kuukauden vaihteessa eniten ääniä saaneella valokuvalla.</p>
          </div>
        </div>
      </section>

      {/* Rules Section with Green Background */}
      <section className="rules-section">
        <h2 className="section-title">Kilpailusäännöt</h2>
        <div className="rules-content">
          <div className="rule-item">
            <span className="rule-icon">✓</span>
            <div className="rule-text">
              <strong>Yksi lähetys kuukaudessa:</strong> Lähetä paras valokuvasi joka kuukausi osallistuaksesi kilpailuun.
            </div>
          </div>
          <div className="rule-item">
            <span className="rule-icon">✓</span>
            <div className="rule-text">
              <strong>Äänestä:</strong> Äänestä mielestäsi parasta valokuvaa. Voit äänestää vain kerran kuukausittaisessa kisassa.
            </div>
          </div>
          <div className="rule-item">
            <span className="rule-icon">✓</span>
            <div className="rule-text">
              <strong>Tulokset:</strong> Eniten ääniä saanut kuva voittaa. Tasatilanteessa aikaisemmin lähetetty kuva voittaa.
            </div>
          </div>
          <div className="rule-item">
            <span className="rule-icon">✓</span>
            <div className="rule-text">
              <strong>Kuvaformaatit:</strong> JPEG, PNG ja WebP hyväksytään. Maksimi tiedostokoko 30MB.
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Valmis esittelemään valokuvasi?</h2>
          <p>Liity yhteisöömme ja aloita kilpailu tänään</p>
          <div className="cta-buttons">
            {isAuthenticated ? (
              <Link to="/laheta" className="btn-primary-large">Lähetä kuvasi</Link>
            ) : (
              <>
                <Link to="/luo-tunnus" className="btn-primary-large">Luo tili</Link>
                <Link to="/kirjaudu" className="btn-secondary-large">Kirjaudu sisään</Link>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

