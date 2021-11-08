const request = require('request');


const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    // check for errors
    if (error) {
      return callback(error, null);
    }
    // checks http status code to make sure no problem with response
    // error handling logic
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response ${body}`;
      // creates new Error object which is passed to calback to indicate error
      callback(Error(msg), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function (ip, callback) {
  // api request to retrieve latitude and longitude for a given IP address
  request('https://freegeoip.app/json/162.245.144.188', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null); 
      // creates new Error object which is passed to calback to indicate error
      return;
    }

    const {latitude, longitude} = JSON.parse(body);

    callback(null, {latitude, longitude});

  });

};


module.exports = { fetchMyIP, fetchCoordsByIP };

