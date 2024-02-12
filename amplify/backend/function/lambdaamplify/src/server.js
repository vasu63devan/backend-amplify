const express= require('express');
const bodyParser=require('body-parser');
const cors=require('cors');

const app=express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

var mysql = require('mysql');
 
// create a connection variable with the required details
var con = mysql.createConnection({
    host: "amplify-rds.cvo00sagg8r4.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "Vmd14152024",
    // port: "3306",
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

// app.listen(3001,()=>{
//   console.log("Port 3001");
// })







