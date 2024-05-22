"use strict";
require('dotenv').config();

module.exports = {
    redis: {
        url: process.env.URL_Redis,
        namedb: process.env.Db_Name_Redis,
        legacyMode: true
    },
    mongodb: {
        url: process.env.URL_Mongodb,
        namedb: process.env.Db_Name_Mongodb
    }
}