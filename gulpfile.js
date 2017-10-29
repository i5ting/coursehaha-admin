var gulp = require('gulp');
var watch = require('gulp-watch');
var mocha = require('gulp-mocha');
var mount = require('mount-routes');
var run   = require('gulp-run');

var source_path = ['test/**/*.js', 'lib/*.js'];

gulp.task('watch', function () {
  gulp.watch(source_path, ['mocha']);
});

gulp.task('mocha', function () {
  return gulp.src(source_path, { read: false })
  // gulp-mocha needs filepaths so you can't have any plugins before it 
    .pipe(mocha({ reporter: 'spec' }));
});

gulp.task('routes', function () {
  var express = require('express');
  var app = express();
  
  // mount routes
  mount(app, __dirname + '/routes', true);
});

gulp.task('kp', function () {
  var kp = require("kp");
  var is_sudo = false;
  var pre = is_sudo == true ? 'sudo' : '';

  kp(3010, pre);
});

gulp.task('nginx', function () {
  var sh = "sudo nginx -c " + __dirname + '/config/nginx.conf'
  
  run(sh).exec().pipe(gulp.dest('logs/nginx.log'));
});

gulp.task('default', ['mocha', 'watch']);