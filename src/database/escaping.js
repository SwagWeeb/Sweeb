var mysql = require('promise-mysql');
var clean =  function(input) {
   let results = mysql.escape(input)
   return results;
}
module.exports = clean;