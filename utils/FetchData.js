const axios = require("axios");

const fetchData = async (apiUrl) => {
  try {
    const response = await axios.get(apiUrl).catch((error) => {
      console.error(error);
      throw new Error(`Failed to fetch data from ${apiUrl}: ${error}`);
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch data from ${apiUrl}: ${error.message}`);
  }
};

module.exports = fetchData;
