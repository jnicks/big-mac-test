const csv = require('csvtojson');

let data = [];
let countries = [];
csv().fromFile('./big-mac-index.csv').then(obj => {
    // sort data by date so we get the latest in our find call
    data = obj.sort((a, b) => `${b.Date}`.localeCompare(a.Date));
    countries = [...new Set(data.map(item => item.Country))];
});

function scrubData(row) {
    return {
        country: row.Country,
        date: row.Date,
        localPrice: parseFloat(row['Local price']),
        dollarEx: parseFloat(row['Dollar ex']),
        dollarPrice: parseFloat(row['Dollar price']),
        dollarPpp: parseFloat(row['Dollar PPP']),
        dollarValuation: parseFloat(row['Dollar valuation'])
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

module.exports = {
    latestForCountry: function(country) {
        let row = data.find(row => row.Country === country);
        if (row) {
            return scrubData(row);
        }
        return 'no data'
    },
    randomCountry: function(current) {
        let tries = 0;
        while (tries < 10) {
            let index = getRandomInt(countries.length);
            let country = countries[index];
            if (country !== current) {
                return country;
            }
            tries++; // we will try to get a different country 10 times and give up
        }
    }
}

