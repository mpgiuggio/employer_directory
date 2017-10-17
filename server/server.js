var express = require("express");
var chalk = require("chalk");
var mongoose = require("mongoose");
var body_parser = require("body-parser");
var path = require("path");

var webconfig = require('./config/serverconfig.js');
require('./util/extensions.js');
//var db = require("./models/db.js");
var db = require("./api/employees/employee_model.js")
//var api_employees = require("./api/employees/"); 

var app = express();
app.set("view engine", "ejs");


var _client__dirname = __dirname.replace("server", "client");

app.set('views', String.format("{0}/client/app/pages/", _client__dirname));
console.log(chalk.red(_client__dirname));
//app.use(express.static(String.format("{0}/app/public/", _client__dirname)));

app.use("/public", express.static(_client__dirname + '/public'));
app.use("/app", express.static(_client__dirname + '/app'));
//app.use(express.static(__dirname + '/public'));

app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: false}));

/*app.use(function(req, res) {
    console.log(chalk.yellow("Error: 404"));
    res.status(404).render("404", {session: req.session});
});

app.use(function(error, req, res, next) {
    console.log(chalk.red(String.format("Error: 500 {0}", error)));
    res.status(500).render("500", {session: req.session});
});
*/

app.get(/.*?\.\w{2,4}$/, function(req, res) {
	res.sendFile(path.join(__dirname, "/client/", req.url));
});

app.get("/", function(req, res) {
	res.render(path.join(_client__dirname, "/app/pages/home/index.ejs"));
});

// ------------------EMPLOYEE API------------------//
/*
var api_routes = express.Router(); 

api_routes.post("/create-employee", routes_api.create_employee);
api_routes.post("/update-employee", routes_api.update_employee);
api_routes.post("/remove-employee", routes_api.remove_employee);
api_routes.post("/get-employee", routes_api.get_employee);

api_routes.post("/get-employees", routes_api.get_employees);

app.use('/api', api_routes);
*/

var controller = require("./api/employees/employee_controller");
app.post("/api/employees/create", controller.create);
app.post("/api/employees/update", controller.update);
app.get("/api/employees/remove/:id", controller.remove);
app.get("/api/employees/get-one/:id", controller.get_one);
app.post("/api/employees/get-all", controller.get_all); 

var port  =  process.env.PORT || webconfig.port;

var server = app.listen(port,function(req, res){
    console.log(chalk.green(String.format("Server live at http://localhost:{0}", port)));
});