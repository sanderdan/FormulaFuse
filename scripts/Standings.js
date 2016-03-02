var Observable = require("FuseJS/Observable");

var drivers = Observable();


fetch("http://ergast.com/api/f1/current/driverStandings.json")
  .then(function(result) {
    if (result.status !== 200) {
      debug_log("Something went wrong, status code: " + result.status);
      return;
    }
    return result.json();
  }).then(function(responseObject) {
    drivers.value = responseObject.MRData.StandingsTable.StandingsLists[0];
    console.log("standings loaded");
  }).catch(function(error) {
    debug_log("Fetch error " + error);
  });

module.exports = {
  drivers: drivers
};
