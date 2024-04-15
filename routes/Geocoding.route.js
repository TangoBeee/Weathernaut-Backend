const express = require("express");
const fetchGeocoding = require("../utils/FetchGeocoding");

const router = express.Router();

router.post("/geocoding", async (req, res) => {
  const body = req.body;
  
  if(body == null || body.query == null) {
    return res.status(400).json({ error: "BAD_REQUEST" });
  }

  const result = await fetchGeocoding(body.query);

  if(result.error) {
    return res.status(500).json({ error: result.error });
  }

  res.status(200).json(result);
});

module.exports = router;
