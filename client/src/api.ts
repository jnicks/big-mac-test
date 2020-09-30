import Axios from 'axios';

export const fetchBigMacData = async () => {
    return Axios({
        method: 'GET',
        url: '/api/big-mac',
        headers: {}
    }).then(res => {
        return res.data;
    });
};
