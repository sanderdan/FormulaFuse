var Observable = require("FuseJS/Observable");

var drivers = Observable();
var CONSTRUCTORCOLOR = {
  MERCEDES: "#2ab4a5",
  FERRARI: "#c30000",
  WILLIAMS: "#ffffff",
  SAUBER: "#006eff",
  MCLAREN: "#808080",
  MANOR: "#323232",
  REDBULL: "#00007d",
  TOROROSSO: "#0000ff",
  FORCEINDIA: "#ff5f0f",
  HAAS: "#6c0000",
  RENAULT: "#ff5f0f"
};



function Driver(givenName, familyName, position, points, constructorId){
  this.givenName = givenName;
  this.familyName = familyName;
  this.position = position;
  this.points = points;
  this.constructorId = constructorId;
  console.log(constructorId);
  switch (constructorId) {
    case "mercedes":
    this.constructorColor = CONSTRUCTORCOLOR.MERCEDES;
    break;
    case "ferrari":
    this.constructorColor = CONSTRUCTORCOLOR.FERRARI;
    break;
    case "williams":
    this.constructorColor = CONSTRUCTORCOLOR.WILLIAMS;
    break;
    case "sauber":
    this.constructorColor = CONSTRUCTORCOLOR.SAUBER;
    break;
    case "mclaren":
    this.constructorColor = CONSTRUCTORCOLOR.MCLAREN;
    break;
    case "manor":
    this.constructorColor = CONSTRUCTORCOLOR.MANOR;
    break;
    case "red_bull":
    this.constructorColor = CONSTRUCTORCOLOR.REDBULL;
    break;
    case "toro_rosso":
    this.constructorColor = CONSTRUCTORCOLOR.TOROROSSO;
    break;
    case "force_india":
    this.constructorColor = CONSTRUCTORCOLOR.FORCEINDIA;
    break;
    case "haas":
    this.constructorColor = CONSTRUCTORCOLOR.HAAS;
    break;
    case "renault":
    this.constructorColor = CONSTRUCTORCOLOR.RENAULT;
    break;
    default:
    this.constructorColor = "#000000"
  }

}

fetch("http://ergast.com/api/f1/current/driverStandings.json")
.then(function(result) {
  if (result.status !== 200) {
    debug_log("Something went wrong, status code: " + result.status);
    return;
  }
  return result.json();
}).then(function(responseObject) {
  var driver;
  var array = responseObject.MRData.StandingsTable.StandingsLists[0].DriverStandings;
  for (var i = 0; i < array.length; i++) {
    driver = array[i];
    console.log(driver.Constructors[0].constructorId);
    drivers.add(new Driver(
      driver.Driver.givenName,
      driver.Driver.familyName,
      driver.position,
      driver.points,
      driver.Constructors[0].constructorId
    ))
  }
  console.log("standings loaded");
}).catch(function(error) {
  debug_log("Fetch error " + error);
});



module.exports = {
  drivers: drivers
};
