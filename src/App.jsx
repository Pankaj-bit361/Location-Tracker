import { useState } from 'react';
import './App.css';

function App() {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchLocation = () => {
    if (!navigator.geolocation) {
      setErrorMessage('Geolocation is not supported by your browser');
    } else {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          setLoading(false); // stop loader once location is fetched
        },
        (error) => {
          setLoading(false);
          setErrorMessage('Unable to retrieve your location');
        }
      );
    }
  };

  return (
    <div className="card">
      <h1>Location Tracker</h1>
      <button onClick={fetchLocation}>Get My Location</button>
      {loading && <div className="loader"></div>}
      {location.latitude && location.longitude && (
        <div className="location-info">
          <p><strong>Latitude:</strong> {location.latitude}</p>
          <p><strong>Longitude:</strong> {location.longitude}</p>
        </div>
      )}
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
}

export default App;
