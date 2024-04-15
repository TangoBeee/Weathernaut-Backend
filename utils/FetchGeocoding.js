const fetchData = require("./FetchData");

const BASE_URL = "https://geocoding-api.open-meteo.com/v1/search";

const fetchGeocoding = async (query) => {
    const BASE_API_PATH = `${BASE_URL}?name=${query}&count=10&language=en&format=json`;

    try {
        const geocodingResults = await fetchData(BASE_API_PATH);
        return geocodingResults;
    } catch (error) {
        return { error: error.message };
    }
}

module.exports = fetchGeocoding;