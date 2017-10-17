//var app = angular.module('app', []);
//app.controller('employee_directory', ['$scope', '$http', function($scope, $http) {
app.controller("home_controller", ["service", function(service) {
	var hc = this;
	hc.employees = [];
	//hc.employee = new Employee();
	service.get_all().then(function(obj) {
		console.log("-----get-all-----");
			console.log(obj);
		hc.employees = obj.data.data.data;
	});


	
	hc.edit_employee = function(data) {
		console.log("-----edit------");
			console.log(data);
		service.get_employee(data).then(function(obj) {
			console.log("-----post-edit------");
			console.log(obj);
			if (obj.data.status == 200) {
				//window.location.href = "#/home/products" + obj.data.data.id;
				hc.updated_employee = obj.data.data.data;
			} else {
				alert("Employee can't be found");
			}
		});
	}

	hc.create_employee = function(data) {
		console.log("User_data_create:" + data ); 
		service.create_employee(data).then(function(obj) {
			console.log("-----");
			console.log(obj);
			if (obj.data.status == 200) {//} && obj.data.data._id) {
				
				//alert("employee created");
				service.get_all().then(function(obj) {
					console.log("-----get-all-----");
						console.log(obj);
					hc.employees = obj.data.data.data;
				});
			} else {
				alert("Employee can't be created");
			}
		});
	}

	hc.remove_employee = function(data) {
		console.log("User_data_update:" + data ); 
		service.remove_employee(data).then(function(obj) {
			console.log("-----");
			console.log(obj);
			if (obj.data.status == 200) {
				//alert("employee updated");
				service.get_all().then(function(obj) {
					console.log("-----get-all-----");
						console.log(obj);
					hc.employees = obj.data.data.data;
				});
			} else {
				alert("Employee can't be created");
			}
		});
	}

	hc.update_employee = function(data) {
		console.log("User_data_update:" + data ); 
		service.update_employee(data).then(function(obj) {
			console.log("-----");
			console.log(obj);
			if (obj.data.status == 200) {
				//alert("employee updated");
				service.get_all().then(function(obj) {
					console.log("-----get-all-----");
						console.log(obj);
					hc.employees = obj.data.data.data;
				});
			} else {
				alert("Employee can't be created");
			}
		});
	}

}]);
