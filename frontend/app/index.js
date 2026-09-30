var Express = require("express");
var Postgres = require("postgresql-client");
var mongoClient= require("mongodb").mongoClient;
var cors = require("cors");
const multer= require("multer");
const { MongoClient } = require("mongodb");


var app= Postgres();
var app=mongoClient();
app.use(cors());

var CONNECTION_STRING = "mongodb+srv://admin:admin@cluster0.6dunfs7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
 

var DATABASENAME ="toto";
var database;
app.listen(5038,()=>{

mongoClient.connect(CONNECTION_STRING,(error, client) =>{
database=client.db(DATABASENAME);
console.log("database connection successfully !");


});


})
app.get