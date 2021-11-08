const {fetchMyIP} = require('./iss');
const {fetchCoordsByIP} = require('./iss');

// Fetch Ip address
// makes a single API request to retrieve user's IP address

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned IP: ", ip);
// });

// fetch coordinates for a given IP
fetchCoordsByIP('162.245.144.188', (error, coordinates) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned coordinates:' , coordinates);
});

// returns { latitude: 49.2643, longitude: -123.0961 }
