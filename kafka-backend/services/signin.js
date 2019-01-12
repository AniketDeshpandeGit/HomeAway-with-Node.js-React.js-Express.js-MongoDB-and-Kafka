// var mongo = require('./mongo');
//var bcrypt = require('bcrypt');
var MongoClient = require('mongodb').MongoClient;

function handle_request(msg, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    MongoClient.connect("mongodb://localhost:27017/login_details", function(err, db){
        if(err){
            callback(null,"Cannot connect to db");
        }
        else{
            console.log('Connected to mongodb');
            console.log(msg.username)
            var query = {username : msg.username};
            console.log("query"+query)
            var dbo = db.db('login_details');
            dbo.collection("login_details").find(query).toArray(function(err,result){
                if(err){
                    //throw err;
                    callback(err,"Error");
                }
                if(result.length > 0){
                    // var hash = result[0].Password;
                    // bcrypt.compare(msg.password,hash,function(err,doesMatch){
                    //     if(doesMatch){
                    //         console.log("Inside result.length",result[0].userID);
                    console.log("Inside result length",result);
                            callback(null,result);
                    //     } else {
                    //         callback(null,[]);
                    //     }
                    // });
                }
                else{
                    console.log("Inside result length",result);
                    callback(null,[]);
                }
               
                // callback(null,result);
            });
        }
    });

    /*if(msg.username == "bhavan@b.com" && msg.password =="a"){
        res.code = "200";
        res.value = "Success Login";

    }
    else{
        res.code = "401";
        res.value = "Failed Login";
    }
    callback(null, res);*/
}

exports.handle_request = handle_request;