const express = require("express");
const app = express();
const getImages = require('./routes/get')
require("dotenv")

app.use(getImages)

app.use(express.json())

module.exports = app;