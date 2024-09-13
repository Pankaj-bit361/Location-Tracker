import { useState } from 'react';
import './App.css';

function App() {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [errorMessage, setErrorMessage] = useState('');
  const [address, setAddress] = useState('');
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
          fetchAddress(latitude, longitude);
        },
        (error) => {
          setLoading(false);
          setErrorMessage('Unable to retrieve your location');
        }
      );
    }
  };

  const fetchAddress = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();
      setAddress(data.display_name);
    } catch (error) {
      setErrorMessage('Unable to retrieve location address');
    } finally {
      setLoading(false);
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
          <p><strong>Address:</strong> {address}</p>
        </div>
      )}
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
}

export default App;
