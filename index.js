const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const app = express();
const rateLimit = require("express-rate-limit");
const apicache = require("apicache");

//enable cors
//! Cross-origin resource sharing (CORS) is a mechanism that allows restricted resources on a web page
//! to be requested from another domain outside the domain from which the first resource was served.
app.use(cors());

// RATE LIMITING
//! Basic rate-limiting middleware for Express.
//! Use to limit repeated requests to public APIs and/or endpoints such as password reset.
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, //? 15 minutes
  max: 5, //? Limit each IP to 5 requests per `window` (here, per 15 minutes)
  standardHeaders: true, //? Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, //? Disable the `X-RateLimit-*` headers
});

// Apply the rate limiting middleware to all requests
app.use(limiter);
app.set("trust proxy", 1);

//Static folders
app.use(express.static("public"));

//Routes
app.use("/api", require("./routes/index"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, (req, res) => {
  console.log(`Serving on PORT ${PORT}`);
});
