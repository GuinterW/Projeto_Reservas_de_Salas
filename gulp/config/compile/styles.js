var gulp = require('gulp');
var cssImport = require('gulp-cssimport');
var $ = require('gulp-load-plugins')();

 gulp.task('styles', function () {
  return gulp.src('app/styles/*.scss')
    .pipe($.plumber())
    .pipe($.autoprefixer({browsers: ['last 1 version']}))
    .pipe(gulp.dest('.tmp/styles'));
});