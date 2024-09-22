const express = require("express");
const geoip = require("geoip-lite");
const fetchWeather = require("../utils/FetchWeather");

const router = express.Router();

router.post("/weather", async (req, res) => {
  const clientIp = req.clientIp;
  let clientDetail = geoip.lookup(clientIp);
  const body = req.body
  
  if(body.ll && body.city && body.country && body.timezone) {
    clientDetail = {
      ll: body.ll,
      city: body.city,
      country: body.country,
      timezone: body.timezone
    }
  }
  
  
  const result = await fetchWeather(clientDetail);

  if(result == null || result.error) {
    return res.status(500).json({ error: result.error });
  }

  res.status(200).json(result);
});

module.exports = router;
