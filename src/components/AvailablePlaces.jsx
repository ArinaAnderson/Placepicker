import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Places from './Places.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState('ok');
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchAllPlaces = async () => {
      setIsLoading(true);
      const availablePlacesData = await axios('http://localhost:3000/places');
      const availablePlaces = availablePlacesData.data;
      setPlaces(availablePlaces.places);
      setIsLoading(false);
      };
      fetchAllPlaces();
      // try {
        // setIsLoading(true);
        // setLoadingStatus('loading');
        // const availablePlacesData = await fetch('http://localhost:3000/places');
        // const availablePlaces = await availablePlacesData.json();
        // console.log('BASYA!!', availablePlaces.places);

        // setPlaces(availablePlaces.places);
        // setLoadingStatus('ok');
        // setIsLoading(false);
      /* } catch(e) {
        setErrorMessage(e.message);
        console.log('ERROR');
        setIsLoading(false);
        setLoadingStatus('error');
      }
      */
  }, []);

 /*
  useEffect(() => {
    setIsLoading(true);
    setLoadingStatus('loading');
    axios.get('http://localhost:3000/places')
      .then((response) => {
        setIsLoading(false);
        setPlaces(response.data.places);
        
      })
      .catch((error) => {
        setErrorMessage(error.message);
      })
  });
  */

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

/*
useEffect(() => {
    const fetchAllPlaces = async () => {
      setIsLoading(true);
      setLoadingStatus('loading');
      const availablePlacesData = await fetch('http://localhost:3000/place');
      const availablePlaces = await availablePlacesData.json();
      setPlaces(availablePlaces.places);
      setIsLoading(false);
      setLoadingStatus('ok');
    };
    try {
      // setIsLoading(true);
      fetchAllPlaces();
      
    } catch(e) {
      setLoadingStatus('error');
      setErrorMessage(e.message)
    }
    
  }, []);
*/


/*
useEffect(() => {
    const fetchAllPlaces = async () => {
      try {
        setIsLoading(true);
        // setLoadingStatus('loading');
        const availablePlacesData = await axios('http://localhost:3000/places');
        const availablePlaces = availablePlacesData.data;
        console.log(availablePlaces.places);

        setPlaces(availablePlaces.places);
        // setLoadingStatus('ok');
        setIsLoading(false);
      } catch(e) {
        setErrorMessage(e.message);
        console.log('ERROR');
        setIsLoading(false);
        setLoadingStatus('error');
      }

      fetchAllPlaces();
    };
  }, []);
*/
