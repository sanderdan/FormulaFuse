var Observable = require("FuseJS/Observable");

var races = Observable();
var errorMessage = Observable();

fetch("http://ergast.com/api/f1/2016.json")
  .then(function(result) {
    if (result.status !== 200) {
      debug_log("Something went wrong, status code: " + result.status);
      errorMessage.value = "Oh noes! :(";
      return;
    }
    return result.json();
  }).then(function(responseObject) {
    races.value = responseObject;
  }).catch(function(error) {
    debug_log("Fetch error " + error);
    errorMessage.value = "Oh noes! :(";
  });

module.exports = {
  races: races,
  errorMessage: errorMessage,
};
