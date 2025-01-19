import React, { useEffect, useState, useRef } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const defaultCenter = {
  lat: 40.712776,
  lng: -74.005974
};

const LiveTracking = () => {
  const [position, setPosition] = useState(defaultCenter);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOMAP_API_KEY,
    libraries: ['marker']
  });

  useEffect(() => {
    const fetchLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setPosition({ lat: latitude, lng: longitude });
          },
          (error) => {
            console.error('Error getting location:', error);
            // Use default position if geolocation fails
            setPosition(defaultCenter);
          },
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
        // Use default position if geolocation is not supported
        setPosition(defaultCenter);
      }
    };

    // Fetch location immediately and then every 10 seconds
    fetchLocation();
    const intervalId = setInterval(fetchLocation, 10000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (isLoaded && mapRef.current && position) {
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }

      const { AdvancedMarkerElement } = window.google.maps.marker;
      markerRef.current = new AdvancedMarkerElement({
        position,
        map: mapRef.current
      });
    }
  }, [isLoaded, position]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={position}
      zoom={13}
      onLoad={(map) => (mapRef.current = map)}
    />
  );
};

export default LiveTracking;