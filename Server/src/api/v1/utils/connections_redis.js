"use strict";

const redis = require('redis');
const databaseConfig = require('../../../config/db.config');

const client = redis.createClient(
    databaseConfig.redis
);

client.connect().catch(console.error);

client.on("error", function (error) {
    console.error(error);
});

client.on("connect", function (error) {
    //console.log(`Connected to ${databaseConfig.redis.namedb}`);

});

client.on("ready", function (error) {
    //console.log(`${databaseConfig.redis.namedb} is ready!`);
});

client.on('end', () => {
    console.log('Redis connection ended');
});

process.on('SIGINT', () => {
    client.quit();
});


module.exports = client;