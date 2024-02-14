const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
var mysql = require('mysql');

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

var mysql = require('mysql');
 
// create a connection variable with the required details
var con = mysql.createConnection({
    host: "amplify-rds.cvo00sagg8r4.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "Vmd14152024",
    port: "3306",
    database:"mydb"
});
 
// make to connection to the database.
con.connect(function(err) {
  if (err) throw err;
  // if connection is successful
 console.log('connection successful');
});



app.get('/connectmysql',(req,res)=>{
  res.json('OK');
})

app.post('/connectmysql',(req,res)=>{
	var {name,rollno} =req.body;
	var records = [[req.body.name,req.body.rollno]];
	if(records[0][0]!=null)
	{
		con.query("INSERT into student (name,rollno) VALUES ?",[records],function(err,res,fields){

			if(err) throw err;

			console.log(res);
		});
	}
	res.json('Form recieved');


})

// app.listen(3000,()=>{
//   console.log("Port 3000");
// })


// /**********************
//  * Example get method *
//  **********************/

// app.get('/items', function(req, res) {
//   // Add your code here
//   res.json({success: 'get call succeed!', url: req.url});
// });

// app.get('/items/*', function(req, res) {
//   // Add your code here
//   res.json({success: 'get call succeed!', url: req.url});
// });

// /****************************
// * Example post method *
// ****************************/

// app.get('/connecttomysql', async function(req, res) {
//   var con = await mysql.createConnection({
//     host: "amplify-rds.cvo00sagg8r4.us-east-1.rds.amazonaws.com",
//     user: "admin",
//     password: "Vmd14152024",
//     port: "3306",
//     database:"mydb"
//   });

//   await con.connect(async function(err) {
//     if (err) {
//       console.log("Error!", JSON.stringify(err));
//       res.json("Error");
//     } else {
//       res.json("Connected!");
//     }
//   });
 
//   // await con.connect(async function(err) {
//   //   if (err) {
//   //     console.log("Error!", JSON.stringify(err));
//   //     res.json("Error");
//   //   } else {
//   //     con.query("SELECT * FROM customers", function (err, result, fields) {
//   //       if (err) throw err;
//   //       console.log(result);
//   //     });
//   //   }
//   // });
// })

// app.post('/items/*', function(req, res) {
//   // Add your code here
//   res.json({success: 'post call succeed!', url: req.url, body: req.body})
// });

// /****************************
// * Example put method *
// ****************************/

// app.put('/items', function(req, res) {
//   // Add your code here
//   res.json({success: 'put call succeed!', url: req.url, body: req.body})
// });

// app.put('/items/*', function(req, res) {
//   // Add your code here
//   res.json({success: 'put call succeed!', url: req.url, body: req.body})
// });

// /****************************
// * Example delete method *
// ****************************/

// app.delete('/items', function(req, res) {
//   // Add your code here
//   res.json({success: 'delete call succeed!', url: req.url});
// });

// app.delete('/items/*', function(req, res) {
//   // Add your code here
//   res.json({success: 'delete call succeed!', url: req.url});
// });

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app