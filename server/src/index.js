const db = require('./db');
const geo = require('./geoLocation');
const path = require('path');
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
app.use(express.static(path.join(__dirname, '../../client/build')));

app.get('/api/big-mac', async (req, res) => {
    let localName = 'United States'
    try {
        localName = await geo.getCountry(clientIpAddress);
    } catch {
        // go with USA if we can't contact them
    }
    let localData = db.latestForCountry(localName);
    let randomName = db.randomCountry(localName);
    let randomData = db.latestForCountry(randomName);
    let result = {local: localData, random: randomData};
    res.json(result);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});
