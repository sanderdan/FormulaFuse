var Observable = require("FuseJS/Observable");

var drivers = Observable();
var errorMessage = Observable();

fetch("http://ergast.com/api/f1/current/driverStandings.json")
  .then(function(result) {
    if (result.status !== 200) {
      debug_log("Something went wrong, status code: " + result.status);
      errorMessage.value = "Oh noes! :(";
      return;
    }
    return result.json();
  }).then(function(responseObject) {
    drivers.value = responseObject.MRData.StandingsTable.StandingsLists[0];
  }).catch(function(error) {
    debug_log("Fetch error " + error);
    errorMessage.value = "Oh noes! :(";
  });

module.exports = {
  drivers: drivers,
  errorMessage: errorMessage,
};
