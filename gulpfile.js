var gulp = require('gulp')
var shell = require('gulp-shell')

gulp.task('tsconfig', shell.task([
  'tsconfig -u'
]))
