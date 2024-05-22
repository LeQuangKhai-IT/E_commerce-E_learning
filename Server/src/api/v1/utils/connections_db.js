"use strict";

const mongoose = require('mongoose');
const databaseConfig = require('../../../config/db.config');

const newConnection = (uri, dbName) => {
    const conn = mongoose.createConnection(uri, {
        dbName: dbName,
    });

    conn.on('connected', () => {
        console.log(`Mongodb connected database ${conn.name}`);
    });

    conn.on('disconnected', () => {
        console.log(`Mongodb disconnected database ${conn.name}`);
    });

    conn.on('error', (error) => {
        console.log(`Mongodb disconnected database ${conn.name} ${JSON.stringify(error)}`);
    });

    return conn;
}

const connection = newConnection(databaseConfig.mongodb.url, databaseConfig.mongodb.namedb);

module.exports = {
    connection
}