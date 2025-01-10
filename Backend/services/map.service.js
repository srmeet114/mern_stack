const axios = require('axios');

module.exports.getAddressCoordinate = async (address) => {
  try {
    const response = await axios.get('https://maps.gomaps.pro/maps/api/geocode/json', {
      params: {
        address: address,
        key: process.env.GOMAP_API_KEY // Ensure you have your GoMap API key in your environment variables
      }
    });

    const data = response.data;
    if (data.status === 'OK') {
      const { lat, lng } = data.results[0].geometry.location;
      return { lat, lng };
    } else {
      throw new Error('Unable to fetch coordinates');
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    throw error;
  }
};

module.exports.getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error('Origin and Destination are required');
  }

  const apiKey = process.env.GOMAP_API_KEY;

  const url = `https://maps.gomaps.pro/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.status === 'OK') {
      if (data.rows[0].elements[0].status === 'ZERO_RESULTS') {
        throw new Error('Unable to fetch distance and time');
      }
      console.log("🚀 ~ module.exports.getDistanceTime= ~ data.rows[0].elements[0];:", data.rows[0].elements[0])
      return data.rows[0].elements[0];
    } else {
      throw new Error('Unable to fetch distance and time');
    }
  } catch (error) {
    console.error('Error fetching distance and time:', error);
    throw error;
  }
};

module.exports.getAutoCompleteSuggestions = async (input) =>{
  if(!input){
    throw new Error('query is required');
  }

  const apiKey = process.env.GOMAP_API_KEY;
  const url = `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

  try{
    const response = await axios.get(url);
    if (response.data.status === 'OK'){
      return response.data.predictions;
    } else {
      throw new Error('Unable to fetch auto complete suggestions');
    }
  } catch (error) {
    console.error('Error fetching auto complete suggestions:', error);
  }
}