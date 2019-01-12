//import the require dependencies
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var cors = require("cors");
app.set("view engine", "ejs");
var mysql = require("mysql");
var pool = require("./pool");
var multer = require("multer");
const path = require("path");

var { Login } = require("./models/login");
var { TLogin } = require("./models/traveller_signup");
var { mongoose } = require("./db/mongoose");
var autoIncrement = require("mongodb-autoincrement");
var kafka = require("./kafka/client");

//use cors to allow cross origin resource sharing
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

//use express session to maintain session data
app.use(
  session({
    secret: "cmpe273_kafka_passport_mongo",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
  })
);

app.use(bodyParser.json());
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

//Allow Access Control
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

//Mongo
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

app.post("/loginOwner", function(req, res) {
  kafka.make_request("post_owner", req.body, function(err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      console.log("Inside else");
      if (results.length < 1) {
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Invalid Credentials");
      }
      // res.json({
      //   updatedList: results
      // });
      //
      else res.send(JSON.stringify(results));

      res.end();
    }
  });
});

app.post("/loginTraveller", function(req, res) {
  kafka.make_request("post_traveller", req.body, function(err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      console.log("Inside else");
      res.json({
        updatedList: results
      });

      res.end();
    }
  });
});

// app.post("/loginTraveller", function(req, res) {
//   console.log("Inside Login Post Request");
//   var username = req.body.username;
//   var password = req.body.password;
//   var sql =
//     "SELECT travellerID,username,password  FROM travellers WHERE username = " +
//     mysql.escape(username) +
//     "and password = " +
//     mysql.escape(password);

//   console.log("Query formed: " + sql);

//   pool.getConnection(function(err, con) {
//     if (err) {
//       console.log(err);
//       res.writeHead(400, {
//         "Content-Type": "text/plain"
//       });
//       res.end("Could Not Get Connection Object");
//     } else {
//       con.query(sql, function(err, result) {
//         if (err) {
//           console.log("Error is this " + err);
//           res.writeHead(400, {
//             "Content-Type": "text/plain"
//           });
//           res.end("Invalid Credentials");
//         } else if (result.length === 0) {
//           console.log("Invalid Credentials");
//         } else {
//           res.cookie("cookie", "admin", {
//             maxAge: 900000,
//             httpOnly: false,
//             path: "/"
//           });
//           console.log(JSON.stringify(result));
//           res.send(JSON.stringify(result));
//         }
//       });
//     }
//   });
// });

// var storage = multer.diskStorage({
//   destination: function(req, file, callback) {
//     callback(null, "./img");
//   },
//   filename: function(req, file, callback) {
//     console.log("Inside storage. File: " + file + "");
//     callback(null, file.fieldname + "-" + Date.now() + "yo123");
//   }
// });
//var upload = multer({ storage: storage }).array("file", 5);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./img");
  },
  filename: (req, file, cb) => {
    const newFilename =
      file.fieldname + "-" + Date.now() + `${path.extname(file.originalname)}`;
    cb(null, newFilename);
  }
});

const upload = multer({ storage });

app.post("/imageUpload", upload.single("selectedFile"), (req, res) => {
  //console.log("Req : ",req);
  console.log("Res : ", res.file);
  res.send();
});

// app.post("/imageUpload", upload.single("selectedFile"), function(req, res) {
//   console.log("Inside ImageUpload : " + req.body);
//   //console.log("Req : ",req);
//   console.log("Res : ", res.file);
//   res.send();
// });

app.post("/checkout", function(req, res) {
  console.log("Inside checkout Post Request");
  console.log("Req Body : ", req.body);

  kafka.make_request("post_property", req.body, function(err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      console.log("Inside else");
      res.json({
        updatedList: results
      });

      res.end();
    }
  });
});

// app.post("/checkout", function(req, res) {
//   console.log("Inside checkout Post Request");
//   console.log("Req Body : ", req.body);
//   var property = {
//     ownerID: req.body.ownerID,
//     country: req.body.country,
//     street_address: req.body.street_address,
//     unit: req.body.unit,
//     city: req.body.city,
//     statelive: req.body.statelive,
//     zipcode: req.body.zipcode,
//     headline: req.body.headline,
//     property_description: req.body.property_description,
//     type_house: req.body.type_house,
//     bedrooms: req.body.bedrooms,
//     accomodates: req.body.accomodates,
//     bathrooms: req.body.bathrooms,
//     startdate: req.body.startdate,
//     enddate: req.body.enddate,
//     nightrate: req.body.nightrate,
//     minimumstay: req.body.minimumstay
//   };

//   var sql = "INSERT INTO owner_properties SET ?";

//   pool.getConnection(function(err, con) {
//     if (err) {
//       console.log("Hi Err");
//       console.log(err);
//       res.writeHead(400, {
//         "Content-Type": "text/plain"
//       });
//       res.end("Could Not Get Connection Object");
//     } else {
//       con.query(sql, property, function(err, result) {
//         if (err) {
//           res.writeHead(400, {
//             "Content-Type": "text/plain"
//           });
//           res.end("Invalid Property Information");
//         } else {
//           res.writeHead(200, {
//             "Content-Type": "text/plain"
//           });
//           res.end("Property Successfully Created");
//         }
//       });
//     }
//   });
// });

app.get("/getownerproperty", function(req, res) {
  console.log("**************** getownerproperty");
  const data = req.query.data;
  //console.log(data)
  const data1 = JSON.parse(data);
  //var username = String(data1.username);
  var ownerID = String(data1.ownerID);
  console.log(ownerID);
  var check = 400;

  MongoClient.connect(
    url,
    function(err, db) {
      if (err) throw err;
      var dbo = db.db("login_details");
      var query = { ownerID: ownerID };

      dbo
        .collection("property_details")
        .find(query)
        .toArray(function(err, result_property) {
          if (err) throw err;
          console.log(result_property);
          res.send(result_property);
        });
    }
  );
});

// app.get("/getownerproperty", function(req, res) {
//   console.log("Inside owner property Login");
//   const data = req.query.data;
//   console.log(data);
//   const data1 = JSON.parse(data);
//   var username = data1.username;
//   var password = data1.password;
//   // const data1 = JSON.parse(data);
//   // var username = String(data1.username);
//   // var password = String(data1.password);
//   console.log(password);
//   var check = 1;
//   // console.log(req.query.data)

//   // console.log(rows[0].ownerid)

//   // res.send(JSON.stringify(rows))
//   // res.render('home.ejs',{studentlist: "Test Table",studentlist:rows});
//   var sql =
//     "SELECT * FROM owner_properties WHERE ownerID = ( SELECT ownerID from owners WHERE username = " +
//     mysql.escape(username) +
//     ")";

//   console.log("Query Formed: " + sql);

//   pool.getConnection(function(err, con) {
//     if (err) {
//       console.log("Hi Err");
//       console.log(err);
//       res.writeHead(400, {
//         "Content-Type": "text/plain"
//       });
//       res.end("Could Not Get Connection Object");
//     } else {
//       con.query(sql, function(err, result) {
//         if (err) {
//           res.writeHead(400, {
//             "Content-Type": "text/plain"
//           });
//           res.end("Invalid Property Information");
//         } else {
//           res.send(JSON.stringify(result));
//         }
//       });
//     }
//   });
// });

app.get("/getTravelProperty", function(req, res) {
  console.log("Inside owner property Login");
  const data = req.query.data;
  console.log(data);
  const data1 = JSON.parse(data);
  var accomodates = data1.accomodates;
  var city = data1.city;
  // const data1 = JSON.parse(data);
  // var username = String(data1.username);
  // var password = String(data1.password);
  console.log(city);
  var check = 1;
  // console.log(req.query.data)

  // console.log(rows[0].ownerid)

  // res.send(JSON.stringify(rows))
  // res.render('home.ejs',{studentlist: "Test Table",studentlist:rows});
  var sql = "SELECT * FROM owner_properties ";

  console.log("Query Formed: " + sql);

  pool.getConnection(function(err, con) {
    if (err) {
      console.log("Hi Err");
      console.log(err);
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Could Not Get Connection Object");
    } else {
      con.query(sql, function(err, result) {
        if (err) {
          res.writeHead(400, {
            "Content-Type": "text/plain"
          });
          res.end("Invalid Property Information");
        } else {
          console.log(JSON.stringify(result));
          res.send(JSON.stringify(result));
        }
      });
    }
  });
});

app.post("/createOwner", function(req, res) {
  kafka.make_request("owner_signup", req.body, function(err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      console.log("Inside else");
      res.json({
        updatedList: results
      });

      res.end();
    }
  });
});

// app.post("/createOwner", function(req, res) {
//   console.log("Inside CreateOwner Post Request");
//   console.log("Req Body : ", req.body);
//   var owner = {
//     username: req.body.username,
//     lastNameOwner: req.body.lastNameOwner,
//     emailIDOwner: req.body.emailIDOwner,
//     phoneNumberOwner: req.body.phoneNumberOwner,
//     password: req.body.password,
//     addressOwner: req.body.addressOwner
//     // bedrooms: req.body.bedrooms,
//     // bathrooms: req.body.bathrooms
//   };

//   var sql = "INSERT INTO owners SET ?";

//   pool.getConnection(function(err, con) {
//     if (err) {
//       console.log(err);
//       res.writeHead(400, {
//         "Content-Type": "text/plain"
//       });
//       res.end("Could Not Get Connection Object");
//     } else {
//       con.query(sql, owner, function(err, result) {
//         if (err) {
//           res.writeHead(400, {
//             "Content-Type": "text/plain"
//           });
//           res.end("Invalid Owner Information");
//         } else {
//           res.writeHead(200, {
//             "Content-Type": "text/plain"
//           });
//           console.log("Owner Created");
//           res.end("Owner Successfully Created");
//         }
//       });
//     }
//   });
// });

app.post("/bookProperty", function(req, res) {
  console.log("Inside CreateOwner Post Request");
  console.log("Req Body : ", req.body);

  var propertyBooked = {
    travellerID: req.body.travellerID,
    propertyID: req.body.propertyID,
    ownerID: req.body.ownerID
  };

  var sql = "INSERT INTO bookings SET ?";

  pool.getConnection(function(err, con) {
    if (err) {
      console.log(err);
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Could Not Get Connection Object");
    } else {
      con.query(sql, propertyBooked, function(err, result) {
        if (err) {
          res.writeHead(400, {
            "Content-Type": "text/plain"
          });
          res.end("Invalid Owner Information");
        } else {
          res.writeHead(200, {
            "Content-Type": "text/plain"
          });
          console.log("Booking Done");
          res.end("Owner Successfully Created");
        }
      });
    }
  });
});

app.post("/createTraveller", function(req, res) {
  kafka.make_request("traveller_signup", req.body, function(err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      console.log("Inside else");
      res.json({
        updatedList: results
      });

      res.end();
    }
  });
});

// app.post("/createTraveller", function(req, res) {
//   console.log("Inside CreateOwner Post Request");
//   console.log("Req Body : ", req.body);
//   var owner = {
//     username: req.body.username,
//     lastNameTraveller: req.body.lastNameTraveller,
//     emailIDTraveller: req.body.emailIDTraveller,
//     phoneNumberTraveller: req.body.phoneNumberTraveller,
//     password: req.body.password,
//     addressTraveller: req.body.addressTraveller
//     // bedrooms: req.body.bedrooms,
//     // bathrooms: req.body.bathrooms
//   };

//   var sql = "INSERT INTO travellers SET ?";

//   pool.getConnection(function(err, con) {
//     if (err) {
//       console.log(err);
//       res.writeHead(400, {
//         "Content-Type": "text/plain"
//       });
//       res.end("Could Not Get Connection Object");
//     } else {
//       con.query(sql, owner, function(err, result) {
//         if (err) {
//           res.writeHead(400, {
//             "Content-Type": "text/plain"
//           });
//           res.end("Invalid Owner Information");
//         } else {
//           res.writeHead(200, {
//             "Content-Type": "text/plain"
//           });
//           console.log("Owner Created");
//           res.end("Owner Successfully Created");
//         }
//       });
//     }
//   });
// });

app.post("/delete", function(req, res) {
  console.log("Inside Delete Post Request");
  var studentID = req.body.studentID;

  var sql = "DELETE FROM students WHERE studentID = " + mysql.escape(studentID);

  console.log("Query formed: " + sql);

  pool.getConnection(function(err, con) {
    if (err) {
      console.log(err);
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Could Not Get Connection Object");
    } else {
      con.query(sql, function(err, result) {
        if (err) {
          res.writeHead(400, {
            "Content-Type": "text/plain"
          });
          res.end("Invalid StudentID");
        } else {
          res.writeHead(200, {
            "Content-Type": "text/plain"
          });
          res.end("User Successfully Deleted");
        }
      });
    }
  });
});

//Route to get All students when user visits the Home Page
//Route to get All Books when user visits the Home Page
app.get("/home", function(req, res) {
  var sql = "SELECT * FROM students";
  pool.getConnection(function(err, con) {
    if (err) {
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Could Not Get Connection Object");
    } else {
      con.query(sql, function(err, result) {
        if (err) {
          res.writeHead(400, {
            "Content-Type": "text/plain"
          });
          res.end("Could Not Get Connection Object");
        } else {
          res.writeHead(200, {
            "Content-Type": "application/json"
          });
          res.end(JSON.stringify(result));
        }
      });
    }
  });
});
//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");
