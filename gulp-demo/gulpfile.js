var gulp = require('gulp');
var eslint = require('gulp-eslint');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var del = require('del');
var size = require('gulp-size');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var merge = require('merge-stream');
var runSequence = require('run-sequence');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');

var paths = {
	'source':{
		'css':{
			'package':{
				'global': [
					'sass/main.sass'
				]
			}
		},
		'js': {
			'package': {
				'global':[
					'js/script.js'
				],
				'admin' :[
					'js/admin.js'
				]
			}
		}
	},
	'output': {
		'build':'build',
		'temp':'temp',
		'css': 'css',
		'js': 'js'
	}
};


gulp.task('clean', function(cb){
	return del([paths.output.build, paths.output.temp], cb);
});

gulp.task('styles', function(){
	var merged = merge();

	Object.keys(paths.source.css.package).map(function(key){
		merged.add(gulp.src(paths.source.css.package[key]))
			.pipe(plumber(function(error){
				gutil.log(gutil.colors.red(error.message));
				this.emit('end');
			}))
			.pipe(sass())
			.pipe(concat(key + '.min.css'))
			.pipe(size({
				title: "CSS Before: " + key
			}))
			.pipe(gulp.dest(paths.output.temp))
			.pipe(autoprefixer('last 3 versions', 'ie 9', 'opera 12.1', 'io 6', 'io 7', 'android 4', 'firefox 27'))
			.pipe(gulp.dest(paths.output.temp))
			.pipe(minifycss({
				processImport:false
			}))
			.pipe(gulp.dest(paths.output.build))
			.pipe(size({
				title: "CSS After: " + key
			}))
			.pipe(plumber.stop())
			.on('error', gutil.log);
	});
	return merged;
});

gulp.task('scripts', function(){
	var merged = merge();

	Object.keys(paths.source.js.package).map(function(key){
		merged.add(gulp.src(paths.source.js.package[key]))
			.pipe(plumber(function(error){
				gutil.log(gutil.colors.red(error.message));
				this.emit('end');
			}))
			.pipe(concat(key + '.min.js'))
			.pipe(size({
				title: "JS Before: " + key
			}))
			.pipe(uglify({beautify:{quote_keys: true}}))
			.pipe(gulp.dest(paths.output.build))
			.pipe(size({
				title: "JS After: " + key
			}))
			.pipe(plumber.stop())
			.on('error', gutil.log);
	});
	return merged;
});

gulp.task('build', function(cb){
	runSequence('clean', 'styles', 'scripts', cb);

});

gulp.task('watch', function(){
	watch(['sass/**/*.sass','js/**/*.js'], function(files, cb){
		gulp.start('build', cb);
	});
})

gulp.task('default', ['build']);






