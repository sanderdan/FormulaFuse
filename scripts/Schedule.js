var Observable = require("FuseJS/Observable");

var races = Observable();

fetch("http://ergast.com/api/f1/2016.json")
  .then(function(result) {
    if (result.status !== 200) {
      debug_log("Something went wrong, status code: " + result.status);
      return;
    }
    return result.json();
  }).then(function(responseObject) {
    races.value = responseObject;
    console.log("schedule loaded");

  }).catch(function(error) {
    debug_log("Fetch error " + error);
  });

module.exports = {
  races: races,
};
