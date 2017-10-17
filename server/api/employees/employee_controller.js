var mongoose = require("mongoose");
var ObjectId = require('mongoose').Types.ObjectId; 
var Employee = mongoose.model("Employee");
var chalk = require("chalk");

//var Employee = require("./employee_model");
var util = require('../../util/globals.js');

module.exports.create = function(req, res) {
	var new_employee = new Employee({ 
		name: req.body.name,
		email: req.body.email,
		date_of_birth: req.body.date_of_birth,
		age: util.get_age(req.body.date_of_birth),
		department: req.body.department,
		gender: req.body.gender
	});
	new_employee.save(function(err, saved_employee) {
		console.log(chalk.red("error object:" + err));
		if (err) {
			res.json({
				status: 500,
	        	data: err
	        });
		} else {

			console.log(chalk.green("New Employee saved successfully ", saved_employee));
			res.json({ 
				status: 200,
				data: saved_employee 
			});
		}
	});
}

module.exports.remove = function(req, res) {
	var id = req.params.id;
    Employee.findById(id, function(err, employee) {
        if (err) {
        	throw err;
        } else {
        	console.log(chalk.green("Employee was found! ", employee));
			var _employee = employee;
			employee.remove(function(err) {
				if (err) {
					res.json({
						status: 500,
			        	data: err
			        });
				} else {
					console.log(chalk.green("Employee was removed! ", employee));
					res.json({
						status: 200,
			        	data: employee
			        });
				}
			})
		}
    });
}

module.exports.update = function(req, res) {
	var id = req.body._id;
	var _emp = req.body;
	_emp.age = util.get_age(_emp.date_of_birth);
	
    Employee.findOneAndUpdate({_id: id}, _emp, function(err, employee) {
        if (err) {
        	res.json({
				status: 500,
	        	data: err
	        });
        } else {
        	console.log(chalk.green("Employee was updated! ", employee));
			
			res.json({
				status: 200,
	        	data: employee
	        });
		}
    });
}

module.exports.get_one = function(req, res) {
	var id = req.params.id;
	console.log("----- in server get -----");
	console.log(id);
    Employee.findById(id, function(err, employee) {
        if (err) {
        	res.json({
				status: 500,
	        	data: err
	        });
        } else {
        	console.log(chalk.green("Employee was found! ", employee));
			res.json({
				status: 200,
	        	data: employee
	        });

        }
    });
}

module.exports.get_all = function(req, res) {
    Employee.find(function(err, employees) {
    	console.log("I'm inside the get_all call");
    	console.log(employees);
        if (err) {
        	res.json({
				status: 500,
	        	data: err
	        });
        } else {
        	console.log(chalk.green("Employees were found! ", employees));
			res.json({
				status: 200,
	        	data: employees
	        });

        }
    });
}