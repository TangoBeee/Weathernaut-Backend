const express = require("express");
const geoip = require("geoip-lite");
const fetchWeather = require("../utils/FetchWeather");

const router = express.Router();

router.post("/weather", async (req, res) => {
  const body = req.body;

  if(!body || !(body.lat !== undefined && body.long !== undefined && body.timezone !== undefined)) {
    return res.status(400).json({ error: "BAD_REQUEST" });
  }

  const clientIp = req.clientIp;
  const clientDetail = geoip.lookup(clientIp);
  
  const lat = clientDetail.ll[0];
  const long = clientDetail.ll[1];
  const timezone = clientDetail.timezone;
  
  console.log(clientIp);
  console.log(clientDetail);
  
  const result = await fetchWeather(lat, long, timezone);

  if(result.error) {
    return res.status(500).json({ error: result.error });
  }

  res.status(200).json(result);
});

module.exports = router;
