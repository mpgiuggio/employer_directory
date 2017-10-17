var chalk = require("chalk");
var mongoose = require( "mongoose" );
var webconfig = require('../../config/serverconfig.js');
var dbURI = webconfig.database_local;
require('../../util/extensions.js');
var util = require('../../util/globals.js');


mongoose.connect(dbURI);

mongoose.connection.on("connected", function () {
  console.log(chalk.green(String.format("Mongoose connected to: {0}", dbURI)));
});

mongoose.connection.on("error",function (err) {
  console.log(chalk.red(String.format("Mongoose connection error: {0}", err)));
});

mongoose.connection.on("disconnected", function () {
  console.log(chalk.yellow("Mongoose disconnected"));
});

var employee_schema = new mongoose.Schema({
  name: String,
  email: String, //{type: String, unique:true},
  date_of_birth: Date,
  age: Number,
  department: String,
  gender: String
});

mongoose.model("Employee", employee_schema);
