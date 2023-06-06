const fetchPlaceDetails = async (placeId) => {
    const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`);
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    return await response.json();
  }
  
    export default fetchPlaceDetails;