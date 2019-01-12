var MongoClient = require("mongodb").MongoClient;

function handle_request(msg, callback) {
  var res = {};
  console.log("In handle request:" + JSON.stringify(msg));
  MongoClient.connect(
    "mongodb://localhost:27017/login_details",
    function(err, db) {
      if (err) {
        callback(null, "Cannot connect to db");
      } else {
        console.log("Connected to mongodb");
        console.log(msg.username);
        var query = { username: msg.username };
        console.log("query" + query);
        var dbo = db.db("login_details");
        dbo
          .collection("traveller_login_details")
          .find(query)
          .toArray(function(err, result) {
            if (err) {
              callback(err, "Error");
            }
            if (result.length > 0) {
              callback(null, result);
            } else {
              callback(null, []);
            }
            console.log("Inside result length", result);
          });
      }
    }
  );
}

exports.handle_request = handle_request;
