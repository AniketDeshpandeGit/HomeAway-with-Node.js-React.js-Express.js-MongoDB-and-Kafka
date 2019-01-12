var MongoClient = require("mongodb").MongoClient;
var { TLogin } = require("../model/tlogin");

function handle_request(msg, callback) {
  var res = {};
  console.log("In handle request:" + JSON.stringify(msg));

  MongoClient.connect(
    "mongodb://localhost:27017/login_details",
    function(err, db) {
      var traveller_data = new TLogin({
        username: msg.username,
        lastNameTraveller: msg.lastNameTraveller,
        emailIDTraveller: msg.emailIDTraveller,
        phoneNumberTraveller: msg.phoneNumberTraveller,
        password: msg.password,
        addressTraveller: msg.addressTraveller
      });
      console.log("check" + traveller_data);
      var dbo = db.collection("traveller_login_details");
      dbo.insertOne(
        {
          username: msg.username,
          lastNameTraveller: msg.lastNameTraveller,
          emailIDTraveller: msg.emailIDTraveller,
          phoneNumberTraveller: msg.phoneNumberTraveller,
          password: msg.password,
          addressTraveller: msg.addressTraveller
        },
        function(err, res) {
          callback(null, res);
        }
      );
    }
  );
}

exports.handle_request = handle_request;
