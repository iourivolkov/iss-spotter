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

const fetchCoordsByIP = function(ip, callback) {
  // api request to retrieve latitude and longitude for a given IP address
  request('https://freegeoip.app/json/162.245.144.100', (error, response, body) => {
    // if wrong IP used --> error 404 not found
    if (error) {
      callback(error, null);
      return;
    }
    // for !== 200 codes --> send error via callback
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
      // creates new Error object which is passed to calback to indicate error
      return;
    }

    const {latitude, longitude} = JSON.parse(body);

    callback(null, {latitude, longitude});

  });

};

const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=-${coords.longitude}`; request(url, (error, response, body) => {
    // error handling if error is defined
    if (error) {
      callback(error, null);
      return;
    }
    // error handling if error not defined but response code !== 200
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }

    const passes = JSON.parse(body).response;
    callback(null, passes);

  });

};
// orchestrates multiple API requests to determined the next 5 upcoming ISS flyovers for the user's location
const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    if(error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if(error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if(error) {
          return callback(error,null);
        }

        callback(null, nextPasses);

      });
    });
  });
};


module.exports = { nextISSTimesForMyLocation };
// only function being used by other module(s)

