const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const musicDirectory = path.join(__dirname, "..", "assets", "music");
const musicFiles = fs.readdirSync(musicDirectory).filter(file => file.endsWith('.mp3'));

router.get("/music", (req, res) => {
  const randomIndex = Math.floor(Math.random() * musicFiles.length);
  const randomMusic = musicFiles[randomIndex];
  const musicPath = path.join(musicDirectory, randomMusic);
  
  const stream = fs.createReadStream(musicPath);

  stream.on('error', (err) => {
    res.status(500).json( { "error": "Internal Server Error" } );
  });

  stream.pipe(res);
});

module.exports = router;
