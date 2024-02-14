const axios = require('axios');
const getConfig = require('../config/config.json');

const googleKey = getConfig.GooglePlacesAPIKey;

const fetchPlaces = async (placeId) => {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${googleKey}`;

    try {
        const response = await axios.get(url);
        return response.data.result;
    } 
    catch(err){
        console.error(`Error fetching place details: ${err}`);
        throw new Error('Error fetching place details');
    }
}

module.exports = { fetchPlaces }