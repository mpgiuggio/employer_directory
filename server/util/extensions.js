
// remove white space at beginning and end as well as extraneous space in line
String.prototype.clean_white_space = function () {
    return this.replace(/^\s\s*/, "").replace(/\s\s*$/, "").replace(/\s\s*/, " ").replace(/&(nbsp);/g, "");
}
// truncate to word count
String.prototype.word_trunc = function(_count, _add_ellipses) { 
	var loc = this;
	if (this.length > 0) {
	    var words = loc.clean_white_space().split(/\s/g);
	    var _return = new String();
	    for (var k = 0; k < _count; k++) {
	        if (!General.is_null_empty_undefined(words[k])) {
	            _return += words[k] + " ";
	        }
	    }
	    _return += _add_ellipses && words.length > _count ? "..." : "";
	    return _return;
	}
}
// truncate to chars count
String.prototype.char_trunc = function (_count, _add_ellipses) {
    var loc = this;
    if (this.length > 0) {
        var _return = this.substring(0, _count);
        _return += _add_ellipses && this.length > _count ? "..." : "";
        return _return;
    }
}
String.prototype.char_trunc_to_prev_word_end = function (_count, _add_ellipses) {
    var loc = this;
    if (loc.length > 0) {
        var _prev_word_end = 0;
        for (var k = 0; k < _count; k++) {
            _prev_word_end = /\s/.test(loc[k]) ? k : _prev_word_end
        }
        var _return = this.substring(0, _prev_word_end);
        _return += _add_ellipses && this.length > _count ? "..." : "";
        return _return;
    }
}
// String.format
String.format = function () {
    var str = arguments[0];
    for (var k = 0; k < arguments.length - 1; k++) {
        var repl_regex = new RegExp("\\{" + k + "\\}", "gm");
        str = str.replace(repl_regex, arguments[k + 1]);
    }
    return str;
}
// append to string
String.prototype.append = function (_str) {
    var loc = this;
    return String.format("{0}{1}", loc, _str);
}

// prepend to string
String.prototype.prepend = function (_str) {
    var loc = this;
    return String.format("{0}{1}", _str, loc);
}

//String is valid email
String.prototype.is_valid_email = function () {
    var loc = this;
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/.test(loc);
}

//String is valid URL
String.prototype.is_valid_URL = function () {
    var loc = this;
    return /^(https?|ftp|file):\/\/.+$/.test(loc);
}

//remove the title from a permalink url
String.prototype.remove_title_from_permalink_for_social_share = function () {
    var loc = this;
    return loc.replace(loc.substr(loc.lastIndexOf("/") + 1), "");
}
String.prototype.add_protocol_to_link_if_needed = function () {
    var loc = this;
    var protocol_sub_reg = new RegExp("^https?://(www.)?");
    return (protocol_sub_reg.test(loc)) ? loc : String.format("http://{0}", loc);
}
String.prototype.user_external_link_as_icon = function () {
    var loc = this;
    var result = "";
    var facebook_reg = new RegExp("(facebook)");
    var linkedin_reg = new RegExp("(linkedin)");
    var twitter_reg = new RegExp("(twitter)");
    
    if (loc != "") {
        if (facebook_reg.test(loc)) {
            result = "Y";
        }
        else if (linkedin_reg.test(loc)) {
            result = "U";
        }
        else if (twitter_reg.test(loc)) {
            result = "m";
        }
        else {
            result = "x";
        }
    }
    
    return result;
}

String.prototype.to_empty_string_if_zero = function () {
    return parseInt(this) === 0 ? "" : this;
};

String.prototype.insert = function (index, string) {
    if (index > 0)
        return this.substring(0, index) + string + this.substring(index, this.length);
    else
        return string + this;
};

Number.prototype.thousand_to_k = function () {
    var loc = this;
    if (loc > 999) {
        return (loc / 1000).toFixed(1) + "K";
    }
    return loc;
}

// Array extension to shuffle contents
Array.prototype.shuffle = function () {
    var i = this.length;
    while (--i) {
        var j = Math.floor(Math.random() * (i + 1))
        var temp = this[i];
        this[i] = this[j];
        this[j] = temp;
    }

    return this;
};

// Array extension to see if array contains a value
Array.prototype.contains = function (_val) {
    for (var k = 0; k < this.length; k++) {
        if (this[k] === _val) {
            return true;
        }
    }
    return false;
};

Array.prototype.indexOf = function (obj, start) {
    for (var i = (start || 0), j = this.length; i < j; i++) {
        if (this[i] === obj) { return i; }
    }
    return -1;
}

// Class Inheritance
Function.prototype.inherits = function( parent_class_or_object ) { 
    if (parent_class_or_object.constructor == Function) {
		//Normal Inheritance 
        /*this.prototype = new parent_class_or_object;
		this.prototype.constructor = this;
		this.prototype.parent = parent_class_or_object.prototype;*/
		
		var extendsFrom = function() {};
		extendsFrom.prototype = parent_class_or_object.prototype;
		this.prototype = new extendsFrom();
		this.prototype.constructor = this;
		this.fn = this.prototype;
		//this.fn.super = parent_class_or_object.constructor;
		
		
        /*this.prototype = parent_class_or_object.prototype;
		this.prototype.constructor = this;
		this.fn = this.prototype;
		this.prototype.parent = parent_class_or_object.prototype;*/
	} else { 
		//Pure Virtual Inheritance 
        this.prototype = parent_class_or_object;
		this.prototype.constructor = this;
		this.fn = this.prototype;
		this.prototype.parent = parent_class_or_object;
	} 
	return this;
}



//Date Extensions
Date.prototype.get_day_as_string = function (num_chars) {
    var day_str_ar = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var _day = this.getDay();
    return num_chars != undefined ? day_str_ar[_day].substring(0, num_chars) : day_str_ar[_day];
}
Date.prototype.get_month_as_string = function (num_chars) {
    var month_str_ar = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var _month = this.getMonth();
    return num_chars != undefined ? month_str_ar[_month].substring(0, num_chars) : month_str_ar[_month];
}
Date.prototype.to_DDD_MMM_d = function () {
    return this.get_day_as_string(3) + " " + this.get_month_as_string(3) + " " + this.getDate();
}

Date.prototype.to_MMM_d = function () {
    return this.get_month_as_string(3) + " " + this.getDate();
}

Date.prototype.to_DDD = function () {
    return this.get_day_as_string(3);
}

Date.prototype.to_d = function () {
    return this.getDate();
}

Date.prototype.standard_timezone_offset = function () {
    var jan = new Date(this.getFullYear(), 0, 1);
    var jul = new Date(this.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
}

Date.prototype.dst = function () {
    return this.getTimezoneOffset() < this.standard_timezone_offset();
}


Math.linearTween = function (t, b, c, d) {
    return c * t / d + b;
};

// quadratic easing in - accelerating from zero velocity
Math.easeInQuad = function (t, b, c, d) {
    t /= d;
    return c * t * t + b;
};

// quadratic easing out - decelerating to zero velocity
Math.easeOutQuad = function (t, b, c, d) {
    t /= d;
    return -c * t * (t - 2) + b;
};

// quadratic easing in/out - acceleration until halfway, then deceleration
Math.easeInOutQuad = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
};

// cubic easing in - accelerating from zero velocity
Math.easeInCubic = function (t, b, c, d) {
    t /= d;
    return c * t * t * t + b;
};

// cubic easing out - decelerating to zero velocity
Math.easeOutCubic = function (t, b, c, d) {
    t /= d;
    t--;
    return c * (t * t * t + 1) + b;
};

// cubic easing in/out - acceleration until halfway, then deceleration
Math.easeInOutCubic = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
};

// quartic easing in - accelerating from zero velocity
Math.easeInQuart = function (t, b, c, d) {
    t /= d;
    return c * t * t * t * t + b;
};

// quartic easing out - decelerating to zero velocity
Math.easeOutQuart = function (t, b, c, d) {
    t /= d;
    t--;
    return -c * (t * t * t * t - 1) + b;
};

// quartic easing in/out - acceleration until halfway, then deceleration
Math.easeInOutQuart = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t * t + b;
    t -= 2;
    return -c / 2 * (t * t * t * t - 2) + b;
};

// quintic easing in - accelerating from zero velocity
Math.easeInQuint = function (t, b, c, d) {
    t /= d;
    return c * t * t * t * t * t + b;
};

// quintic easing out - decelerating to zero velocity
Math.easeOutQuint = function (t, b, c, d) {
    t /= d;
    t--;
    return c * (t * t * t * t * t + 1) + b;
};

// quintic easing in/out - acceleration until halfway, then deceleration
Math.easeInOutQuint = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t * t * t + 2) + b;
};

// sinusoidal easing in - accelerating from zero velocity
Math.easeInSine = function (t, b, c, d) {
    return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
};

// sinusoidal easing out - decelerating to zero velocity
Math.easeOutSine = function (t, b, c, d) {
    return c * Math.sin(t / d * (Math.PI / 2)) + b;
};

// sinusoidal easing in/out - accelerating until halfway, then decelerating
Math.easeInOutSine = function (t, b, c, d) {
    return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
};

// exponential easing in - accelerating from zero velocity
Math.easeInExpo = function (t, b, c, d) {
    return c * Math.pow(2, 10 * (t / d - 1)) + b;
};

// exponential easing out - decelerating to zero velocity
Math.easeOutExpo = function (t, b, c, d) {
    return c * (-Math.pow(2, -10 * t / d) + 1) + b;
};

// exponential easing in/out - accelerating until halfway, then decelerating
Math.easeInOutExpo = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    t--;
    return c / 2 * (-Math.pow(2, -10 * t) + 2) + b;
};

// circular easing in - accelerating from zero velocity
Math.easeInCirc = function (t, b, c, d) {
    t /= d;
    return -c * (Math.sqrt(1 - t * t) - 1) + b;
};

// circular easing out - decelerating to zero velocity
Math.easeOutCirc = function (t, b, c, d) {
    t /= d;
    t--;
    return c * Math.sqrt(1 - t * t) + b;
};

// circular easing in/out - acceleration until halfway, then deceleration
Math.easeInOutCirc = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
    t -= 2;
    return c / 2 * (Math.sqrt(1 - t * t) + 1) + b;
};