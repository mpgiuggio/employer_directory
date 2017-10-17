var gulp = require("gulp");
var cssnano = require("gulp-cssnano");
var concat = require("gulp-concat");
var order = require("gulp-order");
var uglify = require("gulp-uglify");

gulp.task("cssmin", function() {
	return gulp.src("client/public/css/*.css")
	.pipe(concat("combined.min.css")).pipe(cssnano())
	.pipe(gulp.dest("client/public/min_css"));
});

gulp.task("uglify", function() {
	return gulp.src("client/public/js/*.js")
	.pipe(order([
		"jquery.js",
		"angular.js",
		"bootstrap.js",
	    "angular-ui-router.js"
	    
	]))
	.pipe(concat("combined.min.js"))
	.pipe(uglify({mangle: false}))
	.pipe(gulp.dest("client/public/min_js"));
});

gulp.task("watch", function() {
	gulp.watch("client/public/js/*.js", ["uglify"]);
	gulp.watch("client/public/css/*.css", ["cssmin"]);
})

gulp.task("default", ["cssmin", "uglify", "watch"]);