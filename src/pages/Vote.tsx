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
  const [currentVotedPhotoId, setCurrentVotedPhotoId] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<{days: number, hours: number, minutes: number, seconds: number}>({days: 0, hours: 0, minutes: 0, seconds: 0});
  const { userId } = useAuth();

  useEffect(() => {
    loadPhotos();
  }, [userId]);

  // Countdown timer effect
  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0, 0); // First day of next month at midnight
      const diff = endOfMonth.getTime() - now.getTime();

      if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      return { days, hours, minutes, seconds };
    };

    // Update immediately
    setTimeRemaining(calculateTimeRemaining());

    // Update every second
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const loadPhotos = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const data = await photoAPI.getPhotos(userId);
      setPhotos(data);

      // Check if user has already voted for any photo this month
      const votedPhoto = data.find(photo => photo.voted);
      setHasVotedThisMonth(!!votedPhoto);
      setCurrentVotedPhotoId(votedPhoto?.photo_id || null);

      setError('');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Kuvien lataus epäonnistui');
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoClick = (photo: Photo) => {
    // If user has voted for a different photo, show cancel confirmation first
    if (hasVotedThisMonth && currentVotedPhotoId && currentVotedPhotoId !== photo.photo_id) {
      setSelectedPhoto(photo);
      setShowCancelConfirm(true);
      return;
    }
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
    setShowCancelConfirm(false);
  };

  const handleCancelAndVote = async () => {
    if (!userId || !selectedPhoto) return;

    try {
      setVoting(true);
      setShowCancelConfirm(false);

      // Vote for the new photo - backend will automatically remove old vote
      await photoAPI.vote(userId, selectedPhoto.photo_id);

      // Update the local state
      const updatedPhotos = photos.map(p => ({
        ...p,
        voted: p.photo_id === selectedPhoto.photo_id
      }));
      setPhotos(updatedPhotos);
      setCurrentVotedPhotoId(selectedPhoto.photo_id);
      setSelectedPhoto({ ...selectedPhoto, voted: true });

      setMessage('Äänesi on vaihdettu onnistuneesti!');
      setTimeout(() => {
        setMessage('');
        closeModal();
      }, 2000);
    } catch (err: any) {
      console.error('Vote change error:', err);

      // Check for authentication errors
      if (err.response?.status === 401 || err.response?.data?.message === 'Unauthorized') {
        setError('Istuntosi on vanhentunut. Ole hyvä ja kirjaudu uudelleen sisään.');
        setTimeout(() => {
          window.location.href = '/login';
        }, 3000);
        return;
      }

      const errorMsg = err.response?.data?.error || err.response?.data?.message || 'Äänen vaihtaminen epäonnistui';
      setError(errorMsg);
      setTimeout(() => setError(''), 5000);
    } finally {
      setVoting(false);
    }
  };

  const handleVote = async () => {
    if (!userId || !selectedPhoto) return;

    try {
      setVoting(true);
      await photoAPI.vote(userId, selectedPhoto.photo_id);

      // Mark that user has voted this month
      setHasVotedThisMonth(true);
      setCurrentVotedPhotoId(selectedPhoto.photo_id);

      // Update the voted status for the selected photo
      const updatedPhotos = photos.map(p =>
        p.photo_id === selectedPhoto.photo_id ? { ...p, voted: true } : p
      );
      setPhotos(updatedPhotos);
      setSelectedPhoto({ ...selectedPhoto, voted: true });

      setMessage('Ääni rekisteröity! Voit vaihtaa ääntäsi toiseen kuvaan milloin tahansa.');
      setTimeout(() => {
        setMessage('');
        closeModal();
      }, 2000);
    } catch (err: any) {
      console.error('Vote error:', err);

      // Check for authentication errors
      if (err.response?.status === 401 || err.response?.data?.message === 'Unauthorized') {
        setError('Istuntosi on vanhentunut. Ole hyvä ja kirjaudu uudelleen sisään.');
        setTimeout(() => {
          window.location.href = '/login';
        }, 3000);
        return;
      }

      const errorMsg = err.response?.data?.error || err.response?.data?.message || 'Äänestys epäonnistui';

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
              <strong>Tiedätkö?</strong> Voit äänestää yhtä kuvaa kerrallaan, mutta voit vaihtaa ääntäsi
              toiseen kuvaan milloin tahansa kuukauden aikana. Kuukauden paras valokuva julkaistaan <a href="/tulokset">Tulokset</a>-sivulla.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="vote-container">
      <div className="vote-header">
        <h1>Äänestä kuvaa</h1>

        {/* Countdown Timer */}
        <div className="countdown-section">
          <h3 className="countdown-title">⏰ Aikaa jäljellä äänestämiseen</h3>
          <div className="countdown-timer">
            <div className="countdown-unit">
              <div className="countdown-value">{timeRemaining.days}</div>
              <div className="countdown-label">päivää</div>
            </div>
            <div className="countdown-separator">:</div>
            <div className="countdown-unit">
              <div className="countdown-value">{String(timeRemaining.hours).padStart(2, '0')}</div>
              <div className="countdown-label">tuntia</div>
            </div>
            <div className="countdown-separator">:</div>
            <div className="countdown-unit">
              <div className="countdown-value">{String(timeRemaining.minutes).padStart(2, '0')}</div>
              <div className="countdown-label">minuuttia</div>
            </div>
            <div className="countdown-separator">:</div>
            <div className="countdown-unit">
              <div className="countdown-value">{String(timeRemaining.seconds).padStart(2, '0')}</div>
              <div className="countdown-label">sekuntia</div>
            </div>
          </div>
          <p className="countdown-info">
            Äänestys päättyy kuukauden vaihtuessa, jolloin voittaja julkaistaan.
          </p>
        </div>

        <p className="photo-counter">Valitse suosikkisi painamalla kuvaa ja äänestämällä.</p>
      </div>

      {error && <div className="error-message">{error}</div>}
      {message && <div className="success-message">{message}</div>}

      {hasVotedThisMonth && (
        <div className="vote-status-banner-gallery">
          <p>✅ Olet jo äänestänyt tässä kuussa. Voit vaihtaa ääntäsi toiseen kuvaan klikkaamalla sitä.</p>
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

                {showCancelConfirm && (
                  <div className="cancel-confirm-box">
                    <p className="confirm-message">
                      <strong>Haluatko vaihtaa ääntäsi?</strong>
                    </p>
                    <p className="confirm-description">
                      Nykyinen äänesi perutaan ja äänestät tätä kuvaa sen sijaan.
                    </p>
                    <div className="confirm-actions">
                      <button
                        onClick={closeModal}
                        className="btn-secondary-modal"
                        disabled={voting}
                      >
                        Peruuta
                      </button>
                      <button
                        onClick={handleCancelAndVote}
                        className="btn-primary-modal"
                        disabled={voting}
                      >
                        {voting ? 'Vaihdetaan...' : 'Kyllä, vaihda ääni'}
                      </button>
                    </div>
                  </div>
                )}

                {!showCancelConfirm && (
                  <div className="modal-actions">
                    <button
                      onClick={closeModal}
                      disabled={voting}
                      className="btn-secondary-modal"
                    >
                      Sulje
                    </button>
                    <button
                      onClick={handleVote}
                      disabled={voting || selectedPhoto.voted}
                      className="btn-primary-modal"
                    >
                      {voting ? 'Lähetetään...' : selectedPhoto.voted ? 'Olet jo äänestänyt tätä' : 'Äänestä tätä kuvaa'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

