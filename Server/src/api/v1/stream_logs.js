"use strict";
const rfs = require("rotating-file-stream");
const path = require('path');
const accessLogStream = rfs.createStream("access.log", {
    interval: "1d",
    path: path.join(__dirname, "/logs"),
})

module.exports = accessLogStream;
