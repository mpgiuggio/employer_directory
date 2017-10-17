app.factory("service", function($http, $q) {
	
	var data = {
		get_employee: get_employee,
		update_employee: update_employee,
		create_employee: create_employee,
		remove_employee: remove_employee,
		get_all: get_all,
	};
	return data;

	function get_employee(data) {
		console.log("------in service get------");
		console.log(data);
		//return request("POST", "/api/employees/get-one", data, null);
		return request("get", "/api/employees/get-one/" + data, data, null);
	}

	function update_employee(data) {
		return request("POST", "/api/employees/update", data, null);
	}

	function create_employee(data) {
		return request("POST", "/api/employees/create", data, null);
	}

	function remove_employee(data) {
		return request("get", "/api/employees/remove/" + data, data, null);
	}

	function get_all(data) {
		console.log("got here employees get-all");
		return request("POST", "/api/employees/get-all", data, null);
	}

	function request(method, url, data, headers) {
		var deferred = $q.defer();

		$http({
			method: method,
			headers: headers,
			url: url,
			data: data
		}).then(function(data, status) {
			var result = {
				data: data || {},
				status: status
			}

			deferred.resolve(result);
		}), function(error, status) {
			var result = {
				data: error || {},
				status: status
			}

			deferred.resolve(result);
		};

		return deferred.promise;
	}
});