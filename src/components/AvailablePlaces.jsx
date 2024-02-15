import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';

export default function AvailablePlaces({ onSelectPlace }) {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState('ok');
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchAllPlaces = async () => {
    setIsLoading(true);
    try {
      const availablePlacesData = await axios('http://localhost:3000/places');
      const availablePlaces = availablePlacesData.data;
    
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          console.log('PLACES', availablePlaces.places);
          setPlaces(sortPlacesByDistance(availablePlaces.places, latitude, longitude));
          setIsLoading(false);
        }
      );
      
      // setPlaces(availablePlaces.places)
    } catch(e) {
      setErrorMessage(e.message);
      setIsLoading(false);
    }
    // setIsLoading(false);
  };

  useEffect(() => {
    fetchAllPlaces();
  }, []);

  const renderFeedback = (loadingStatus) => {
    if (loadingStatus === 'loading' || loadingStatus === 'ok') {
      return (
        <Places
          title="Available Places"
          places={places}
          loadingText="Fetching place data..."
          isLoading={isLoading}
          loadingStatus={loadingStatus}
          fallbackText="No places available."
          onSelectPlace={onSelectPlace}
        />
      )
    }

    if (loadingStatus === 'error') {
      return <h1>{errorMessage}</h1>
    }
  };

  if (errorMessage !== null) {
    console.log(places)
    const errorMessageValidated = errorMessage ? errorMessage : 'Could not fetch places, please try again';
    return <Error
      title='An error occured!'
      message={errorMessageValidated}
      onConfirm={() => setErrorMessage(null)}
      sendRequest={() => {
        setErrorMessage(null)
        fetchAllPlaces();
      }}
    />
  }

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
