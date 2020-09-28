var gulp = require('gulp');
// var watch = require("gulp-watch");
var run = require('gulp-run');
var notify = require('gulp-notify');
var log = require('fancy-log');
require('dotenv').config();
const getCurrentBranchName = require('node-git-current-branch');
const webpack = require('webpack');

gulp.task('default', function () {
  // watch the src folder for any changes of the files
  gulp.watch(['./build/**'], ['copy']);
});

gulp.task('build', function () {
  run('npm run build')
    .exec()
    .pipe(gulp.dest('output'))
    .on('end', function () {
      gulp.start('copy');
    })
    .pipe(notify('Process Done!'));
});
const targetDeployment =
  getCurrentBranchName() === 'master'
    ? process.env.DEPLOYMENT_DESTINATION_TARGET_PRD
    : process.env.DEPLOYMENT_DESTINATION_TARGET_NON_PRD;

gulp.task('copy', function () {
  gulp
    .src('./build/**')
    .pipe(gulp.dest(targetDeployment))
    .on('end', function () {
      log('########################');
      log('Done!');
    });
});
