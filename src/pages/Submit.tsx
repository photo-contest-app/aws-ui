import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { photoAPI } from '../services/api';
import '../styles/Submit.css';

export const Submit: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { userId } = useAuth();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Valitse kuvatiedosto');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('Kuvan tulee olla alle 10MB');
      return;
    }

    setImageFile(file);
    setError('');

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId || !imageFile) {
      setError('Valitse kuva');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Convert image to base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const imageData = reader.result as string;
          await photoAPI.submitPhoto(userId, title, description, imageData);
          setSuccess('Kuva lähetetty onnistuneesti! Voit lähettää vain yhden kuvan kuukaudessa.');
          setTitle('');
          setDescription('');
          setImageFile(null);
          setImagePreview('');

          // Reset file input
          const fileInput = document.getElementById('photo-file') as HTMLInputElement;
          if (fileInput) fileInput.value = '';
        } catch (err: any) {
          setError(err.response?.data?.error || 'Kuvan lähetys epäonnistui');
        } finally {
          setLoading(false);
        }
      };
      reader.readAsDataURL(imageFile);
    } catch (err: any) {
      setError('Kuvatiedoston lukeminen epäonnistui');
      setLoading(false);
    }
  };

  return (
    <div className="submit-container">
      <h1>Lähetä valokuva</h1>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit} className="submit-form">
        <p className="submit-info">
          Lähetä paras valokuvasi tämän kuukauden kilpailuun. Kuvat muutetaan automaattisesti sivulle sopivaan kokoon.
          Lähettämällä valokuvan vakuutat, että lähettämäsi kuva on sinun ottama ja sinulla on siihen tekijänoikeudet.
          <br /><br />
          Kuvat eivät saa sisältää aikuismateriaalia, väkivaltaa, tai loukkaavaa sisältöä. Kaikki epäasiallinen sisältö
          poistetaan ylläpidon toimesta ja toistuvasta sääntöjen rikkomuksesta seuraa käyttäjätunnuksen lukitseminen.
        </p>
        <div className="form-group">
          <label htmlFor="title">Kuvan otsikko *</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={100}
            placeholder="Anna kuvallesi kuvaava otsikko"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Kuvaus</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={500}
            placeholder="Jaa tarina kuvasi takana..."
            rows={4}
          />
        </div>

        <div className="image-upload-section">
          <label htmlFor="photo-file" className="image-upload-label">
            <input
              id="photo-file"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
            {!imagePreview ? (
              <>
                <div className="upload-icon">📸</div>
                <div className="upload-text">Klikkaa ladataksesi tai vedä ja pudota</div>
                <div className="upload-hint">Max 10MB • JPEG, PNG, WebP</div>
              </>
            ) : (
              <div className="image-preview">
                <img src={imagePreview} alt="Esikatselu" />
              </div>
            )}
          </label>
        </div>

        <button type="submit" disabled={loading || !imageFile} className="btn-primary">
          {loading ? 'Lähetetään...' : 'Lähetä kuva'}
        </button>
      </form>
    </div>
  );
};

