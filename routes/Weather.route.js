const express = require("express");
const fetchWeather = require("../utils/FetchWeather");

const router = express.Router();

router.post("/weather", async (req, res) => {
  const body = req.body;

  if(!body || !(body.lat !== undefined && body.long !== undefined && body.timezone !== undefined)) {
    return res.status(400).json({ error: "BAD_REQUEST" });
  }

  const result = await fetchWeather(body.lat, body.long, body.timezone);

  if(result.error) {
    return res.status(500).json({ error: result.error });
  }

  res.status(200).json(result);
});

module.exports = router;
