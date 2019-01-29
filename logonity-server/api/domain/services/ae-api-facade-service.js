const axios = require('axios');

exports.get = (networkId, url) => {
  const network = global.properties.networks.filter(network => network.networkId === networkId)[0];
  return axios.get(`${network.aeNodeUrl}:${network.aeNodePort}/v2${url}`);
};