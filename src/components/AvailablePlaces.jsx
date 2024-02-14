import { useEffect, useRef, useState } from 'react';
import Places from './Places.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const fetchAllPlaces = async () => {
      setIsLoading(true);
      const availablePlacesData = await fetch('http://localhost:3000/places');
      const availablePlaces = await availablePlacesData.json();
      setPlaces(availablePlaces.places);
      setIsLoading(false);
    };
    fetchAllPlaces();
    
  }, []);
  return (
    <Places
      title="Available Places"
      places={places}
      loadingText="Fetching place data..."
      isLoading={isLoading}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
