// var mongo = require('./mongo');
//var bcrypt = require('bcrypt');
var MongoClient = require("mongodb").MongoClient;
var { Login } = require("../model/login");

function handle_request(msg, callback) {
  var res = {};
  console.log("In handle request:" + JSON.stringify(msg));

  //   function getNextSequence(db, name, callback) {
  //     console.log("ttt", name);
  //     var dbo = db.db("login_details");
  //     dbo
  //       .collection("counters")
  //       .findAndModify({ _id: name }, null, { $inc: { seq: 1 } }, function(
  //         err,
  //         result
  //       ) {
  //         if (err) callback(err, result);
  //         console.log(result);
  //         callback(err, result.value.seq);
  //       });
  //   }
  MongoClient.connect(
    "mongodb://localhost:27017/login_details",
    function(err, db) {
      //   getNextSequence(db, "login_details", function(err, result) {
      var login_data = new Login({
        // username: msg.name,
        // password: msg.password,
        // phonenumber: msg.phoneno,
        // city: msg.city,
        // age: msg.age
        //   id: result
        username: msg.username,
        lastNameOwner: msg.lastNameOwner,
        emailIDOwner: msg.emailIDOwner,
        phoneNumberOwner: msg.phoneNumberOwner,
        password: msg.password,
        addressOwner: msg.addressOwner
      });
      console.log("check" + login_data);
      //var dbo = db.db('traveller_login_details');
      var dbo = db.collection("login_details");
      dbo.insertOne(
        {
          // username: msg.name,
          // password: msg.password,
          // phonenumber: msg.phoneno,
          // city: msg.city,
          // age: msg.age
          // id: result

          username: msg.username,
          lastNameOwner: msg.lastNameOwner,
          emailIDOwner: msg.emailIDOwner,
          phoneNumberOwner: msg.phoneNumberOwner,
          password: msg.password,
          addressOwner: msg.addressOwner
        },
        function(err, res) {
          // console.log(res)
          callback(null, res);
        }
      );
    }
  );
}

exports.handle_request = handle_request;
