const db = require('./db');
const geo = require('./geoLocation');
const express = require('express');
const requestIp = require('request-ip');

const app = express(),
    bodyParser = require('body-parser');
    port = 3080;

let clientIpAddress = "";
app.use(function(req, res, next) {
    clientIpAddress = requestIp.getClientIp(req); // on localhost > 127.0.0.1
    next();
});

app.use(bodyParser.json());

app.get('/api/big-mac', async (req, res) => {
    // determine country by incoming IP address
    let localName = await geo.getCountry('127.0.0.1');
    let localData = db.latestForCountry(localName);
    // determine random OTHER country neq country
    let randomName = db.randomCountry(localName);
    let randomData = db.latestForCountry(randomName);
    let result = {local: localData, random: randomData};
    res.json(result);
});

app.get('/', (req, res) => {
    res.send('App Works');
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});
