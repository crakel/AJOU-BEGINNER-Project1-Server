const express = require("./config/express");
const secret = require("./config/secret");

express().listen(secret.port);

module.exports = express();