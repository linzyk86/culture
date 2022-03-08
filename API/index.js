const express = require("express");
const app = express();
const routes = require('./routes/routes')
require("dotenv")

app.use(routes)

app.use(express.json())

module.exports = app;