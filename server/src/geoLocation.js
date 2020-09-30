const axios = require('axios');
const publicIp = require('public-ip');

module.exports = {
    getCountry: async (address) => {
        let resp = await fetchCountry(address);
        return resp.data.country_name
    }
}

const fetchCountry = async (address) => {
    // for dev environments where we are on internal networks
    let localhost = address.startsWith('127.') || address.startsWith('::ffff:127.');
    let localNet = address.startsWith('192.') || address.startsWith('::ffff:192.');
    let selfAddr = address === '::1';
    if (localhost || localNet || selfAddr) {
        address = await publicIp.v4();
    }
    //
    return axios({
        method: 'GET',
        url: `https://ipvigilante.com/json/${address}/country_name`,
        headers: {}
    }).then(res => {
        return res.data;
    });
}
