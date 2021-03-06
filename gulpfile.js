var gulp = require('gulp'),
	connect = require('gulp-connect'),
	open = require("gulp-open"),
	browserify = require('gulp-browserify'),
	concat = require('gulp-concat'),
	port = process.env.port || 3031;

// browserify and transform JSX
gulp.task('browserify', function() {
	
	gulp.src('./src/jsx/main.js')
		.pipe(browserify({transform: 'reactify'}))
		.pipe(gulp.dest('./dist/js'));
		
});

// launch browser in a port
gulp.task('open', function(){
	
	var options = {
		url: 'http://localhost:' + port,
	};
	
	gulp.src('./index.html')
		.pipe(open('', options));
		
});

// live reload server
gulp.task('connect', function() {
	
	connect.server({
		root: './',
		port: port,
		livereload: true
	});
	
});

// live reload js
gulp.task('js', function () {
	
	gulp.src('./dist/**/*.js')
		.pipe(connect.reload());

});

// live reload html
gulp.task('html', function () {
	
	gulp.src('./*.html')
		.pipe(connect.reload());
		
});

// watch files for live reload
gulp.task('watch', function() {
	
	gulp.watch('./dist/js/*.js', ['js']);
	gulp.watch('./index.html', ['html']);
	gulp.watch('./src/jsx/**/*.js', ['browserify']);
	
});

gulp.task('default', ['browserify']);

gulp.task('serve', ['browserify', 'connect', 'open', 'watch']);