const {fetchMyIP} = require('./iss');
const {fetchCoordsByIP} = require('./iss');
const {fetchISSFlyOverTimes} = require('./iss');
const {nextISSTimesForMyLocation} = require('./iss');

// Fetch Ip address - first api call
// makes a single API request to retrieve user's IP address

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned IP: ", ip);
// });

// fetch coordinates for a given IP - second api call
// fetchCoordsByIP('162.245.144.188', (error, coordinates) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned coordinates:' , coordinates);
// });

// fetch ISS flyovers for a given location - third api call

// returns { latitude: 49.2643, longitude: -123.0961 }

// fetch flyover times for given coordinates - third api call

// const coords = { latitude: '49.27670', longitude: '-123.13000' };

// fetchISSFlyOverTimes(coords, (error, passTimes) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned flyover times:' , passTimes);
// });

const printPassTimes = function(passTimes) {
  for(const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  printPassTimes(passTimes);
});