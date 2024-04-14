const express = require("express");
const geoip = require("geoip-lite");
const fetchWeather = require("../utils/FetchWeather");

const router = express.Router();

router.post("/weather", async (req, res) => {
  const clientIp = req.clientIp;
  const clientDetail = geoip.lookup(clientIp);
  
  const lat = clientDetail == null ? 53.0 : clientDetail.ll[0];
  const long = clientDetail == null ? 0.1 : clientDetail.ll[1];
  const timezone = clientDetail == null ? "GMT" : clientDetail.timezone;
  
  const result = await fetchWeather(lat, long, timezone);

  if(result.error) {
    return res.status(500).json({ error: result.error });
  }

  res.status(200).json(result);
});

module.exports = router;
