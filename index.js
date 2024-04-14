const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const requestIp = require('request-ip');

const weatherRoute = require("./routes/Weather.route");
const musicRoute = require("./routes/Music.route");

// For ENV use
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(requestIp.mw())

// Main Endpoints
app.use("/api/health", (req, res) => {
    res.status(200)
        .json( { "success": true } );
});
app.use("/api", weatherRoute);
app.use("/api", musicRoute);

// 404 Endpoint
app.get("*", (req, res) => {
    res.status(404)
    .redirect("https://tangobeee.github.io/web-stuff/cool-video/video.html");
});

// ERROR Middleware
app.use((err, req, res, next) => {
    if(err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400)
            .json( { "error": err.message } );
    }
    next();
});

const server = app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
server.keepAliveTimeout = 30000
server.headersTimeout = 31000