var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	browserify = require('browserify'),
	watchify = require('watchify'),
	buffer = require('vinyl-buffer'),
	connect = require('gulp-connect'),
	source = require('vinyl-source-stream'),
	jshint = require('gulp-jshint');

gulp.task('default', ['connect', 'compile']);

paths = {
	entry: './client/src/main.js',
	dist: './client/dist/'
};

gulp.task('compile', function() {
	var bundler = browserify(paths.entry, watchify.args);

	var bundle = function() {
		return bundler
			.bundle()
			.pipe(source('bomb_arena.min.js'))
			.pipe(buffer())
			// Uncomment the line below once releasing
			.pipe(uglify())
			.pipe(connect.reload())
			.pipe(gulp.dest(paths.dist))
	}

	bundler = watchify(bundler);
	bundler.on('update', bundle);

	return bundle();
});

gulp.task('connect', function() {
	connect.server({
		root: [__dirname + '/client'],
		port: 9000,
		livereload: true
	});
});
