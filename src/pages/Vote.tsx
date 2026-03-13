import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { photoAPI } from '../services/api';
import type { Photo } from '../services/api';
import '../styles/Vote.css';

export const Vote: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [hasVotedThisMonth, setHasVotedThisMonth] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const { userId } = useAuth();

  useEffect(() => {
    loadPhotos();
  }, [userId]);

  const loadPhotos = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const data = await photoAPI.getPhotos(userId);
      setPhotos(data);

      // Check if user has already voted for any photo this month
      const hasVoted = data.some(photo => photo.voted);
      setHasVotedThisMonth(hasVoted);

      setError('');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Kuvien lataus epäonnistui');
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  const handleVote = async () => {
    if (!userId || !selectedPhoto || hasVotedThisMonth) return;

    try {
      setVoting(true);
      await photoAPI.vote(userId, selectedPhoto.photo_id);

      // Mark that user has voted this month
      setHasVotedThisMonth(true);

      // Update the voted status for the selected photo
      const updatedPhotos = photos.map(p =>
        p.photo_id === selectedPhoto.photo_id ? { ...p, voted: true } : p
      );
      setPhotos(updatedPhotos);
      setSelectedPhoto({ ...selectedPhoto, voted: true });

      setMessage('Ääni rekisteröity! Voit selata muita kuvia, mutta voit äänestää vain yhtä kuvaa kuukaudessa.');
      setTimeout(() => {
        setMessage('');
        closeModal();
      }, 2000);
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || 'Äänestys epäonnistui';

      // Translate common error messages to Finnish
      let translatedError = errorMsg;
      if (errorMsg.includes('already voted for this photo this month')) {
        translatedError = 'Olet jo äänestänyt tätä kuvaa tässä kuussa';
      } else if (errorMsg.includes('already voted for this photo')) {
        translatedError = 'Olet jo äänestänyt tätä kuvaa';
      } else if (errorMsg.includes('cannot vote for your own photo')) {
        translatedError = 'Et voi äänestää omaa kuvaasi';
      } else if (errorMsg.includes('only vote for photos from the current month')) {
        translatedError = 'Voit äänestää vain kuluvan kuukauden kuvia';
      }

      setError(translatedError);
      setTimeout(() => setError(''), 5000);
    } finally {
      setVoting(false);
    }
  };

  if (loading) {
    return <div className="loading">Ladataan kuvia...</div>;
  }

  if (photos.length === 0) {
    return (
      <div className="vote-container">
        <div className="no-photos-enhanced">
          <div className="empty-state-icon">
            <span className="icon-large">📸</span>
            <span className="icon-small">✨</span>
          </div>

          <h2>Ei kuvia saatavilla</h2>

          <p className="empty-state-description">
            Tällä hetkellä ei ole kuvia katseltavana. Uusia kuvia lisätään jatkuvasti.
          </p>

          <div className="empty-state-tips">
            <div className="tip-card">
              <span className="tip-icon">💡</span>
              <div className="tip-content">
                <h4>Vinkki</h4>
                <p>Uusia kuvia lisätään jatkuvasti. Tarkista tilanne myöhemmin uudelleen!</p>
              </div>
            </div>

            <div className="tip-card">
              <span className="tip-icon">📤</span>
              <div className="tip-content">
                <h4>Osallistu itse</h4>
                <p>Lähetä oma kuvasi ja ole mukana kilpailussa!</p>
              </div>
            </div>
          </div>

          <div className="empty-state-actions">
            <button onClick={loadPhotos} className="btn-secondary">
              🔄 Päivitä sivu
            </button>
            <a href="/laheta" className="btn-primary">
              📸 Lähetä kuva
            </a>
          </div>

          <div className="empty-state-info">
            <p>
              <strong>Tiedätkö?</strong> Voit äänestää vain yhtä kuvaa kuukaudessa. Valitse siis tarkkaan!
              Kuukauden paras valokuva julkaistaan <a href="/tulokset">Tulokset</a>-sivulla.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="vote-container">
      <div className="vote-header">
        <h1>Äänestä kuvia</h1>
        <p className="photo-counter">Valitse suosikkisi</p>
      </div>

      {error && <div className="error-message">{error}</div>}
      {message && <div className="success-message">{message}</div>}

      {hasVotedThisMonth && (
        <div className="vote-status-banner-gallery">
          <p>✅ Olet jo äänestänyt tässä kuussa. Voit selata kuvia, mutta et voi äänestää uudelleen.</p>
        </div>
      )}

      {/* Photo Gallery Grid */}
      <div className="photo-gallery">
        {photos.map((photo) => (
          <div
            key={photo.photo_id}
            className={`photo-tile ${photo.voted ? 'photo-voted' : ''}`}
            onClick={() => handlePhotoClick(photo)}
          >
            <div className="photo-tile-image-wrapper">
              <img
                src={photo.image_url || `https://d1e093ozsec2c7.cloudfront.net/${encodeURIComponent(photo.s3_key)}`}
                alt={photo.title}
                className="photo-tile-image"
              />
              {photo.voted && (
                <div className="photo-tile-voted-badge">
                  <span>✓ Äänestetty</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <div className="photo-modal-overlay" onClick={closeModal}>
          <div className="photo-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              ✕
            </button>

            <div className="modal-content">
              <div className="modal-image-wrapper">
                <img
                  src={selectedPhoto.image_url || `https://d1e093ozsec2c7.cloudfront.net/${encodeURIComponent(selectedPhoto.s3_key)}`}
                  alt={selectedPhoto.title}
                  className="modal-image"
                />
              </div>

              <div className="modal-info">
                <h2>{selectedPhoto.title}</h2>
                {selectedPhoto.description && (
                  <p className="modal-description">{selectedPhoto.description}</p>
                )}

                {selectedPhoto.voted && (
                  <div className="modal-voted-badge">
                    <p>✅ Olet äänestänyt tätä kuvaa</p>
                  </div>
                )}

                <div className="modal-actions">
                  <button
                    onClick={closeModal}
                    className="btn-secondary-modal"
                  >
                    Sulje
                  </button>
                  <button
                    onClick={handleVote}
                    disabled={voting || hasVotedThisMonth || selectedPhoto.voted}
                    className="btn-primary-modal"
                  >
                    {voting ? 'Äänestää...' : hasVotedThisMonth ? 'Olet jo äänestänyt' : 'Äänestä tätä kuvaa'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

