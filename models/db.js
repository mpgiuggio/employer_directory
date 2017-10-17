var chalk = require("chalk");
var mongoose = require( "mongoose" );
var webconfig = require('../config/serverconfig.js');
var dbURI = webconfig.database_local;
require('../util/extensions.js');


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
  employee_id: {type: Number, unique:true},
  name: String,
  email: {type: String, unique:true},
  date_of_birth: Date,
  age: Number,
  department: String,
  gender: String
});

mongoose.model("Employee", employee_schema);


