const axios = require('axios');

async function loadUser(name) {
    try {
        let response = await axios.get(`https://api.github.com/users/${name}`);
        return response.data;
    } catch (err) {

        throw new Error(err);
    }
}

exports.loadUser = loadUser;