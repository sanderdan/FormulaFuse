var Observable = require("FuseJS/Observable");

var news = Observable();
var errorMessage = Observable();

fetch('http://rss2json.com/api.json?rss_url=http://www.eurosport.com/formula-1/rss.xml')
.then(function(result) {
  if (result.status !== 200) {
    debug_log("Something went wrong, status code: " + result.status);
    errorMessage.value = "Oh noes! :(";
    return;
  }
  return result.json();
}).then(function(responseObject) {
  news.value = responseObject;
  console.log("news loaded");
}).catch(function(error) {
  debug_log("Fetch error " + error);
  errorMessage.value = "Oh noes! :(";
});

module.exports = {
    news: news,
    errorMessage: errorMessage,
};
