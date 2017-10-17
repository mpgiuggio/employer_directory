exports.get_age = function(dob) {
console.log("in get age----------------------------------");
	console.log(dob);
	var today = new Date();
    var birthDate = new Date(dob);
    console.log(birthDate);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}