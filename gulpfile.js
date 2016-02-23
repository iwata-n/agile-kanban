var gulp = require('gulp')
var shell = require('gulp-shell')
var plumber = require('gulp-plumber')
var notify = require('gulp-notify')
var mocha = require('gulp-mocha')

gulp.task('tsconfig', shell.task([
  'tsconfig -u'
]))

gulp.task('build', shell.task([
  'node_modules/.bin/tsc -p ./'
]))

gulp.task('tsc-w', shell.task([
  'node_modules/.bin/tsc -p ./ -w'
]))

gulp.task('js-test', () => {
  return gulp.src('./test/*.js', {read: false})
    .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
    .pipe(mocha())
})

gulp.task('test-w', () => {
  gulp.watch('./routes/*.js', ['test'])
  gulp.watch('./test/*.js', ['test'])
})

gulp.task('ts-coverage', shell.task([
  './node_modules/.bin/istanbul cover ./node_modules/mocha/bin/_mocha -- -t 5000 --report none ./dist/test/**/*.js',
  'cd coverage && remap-istanbul -i coverage.json -o html-report -t html'
]))

gulp.task('test', ['js-test', 'ts-coverage'])