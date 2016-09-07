var gulp = require('gulp');

var sass = require('gulp-sass');

var browserSync = require('browser-sync').create();

var gulp = require('gulp');
var tape = require('gulp-tape');
var tapColorize = require('tap-colorize');

var clean = require('gulp-clean');

var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');

var runSequence = require('run-sequence');

var bases = {
 app: 'app/',
 dist: 'dist/',
};



        // guide https://css-tricks.com/gulp-for-beginners/
        //to run this you type "gulp [taskname]" example "gulp hello"
gulp.task('hello', function(){
  console.log('Hello world');
});




// To run the test run "gulp test"
gulp.task('test', function() {
  return gulp.src('test/*.js')
    .pipe(tape({
      reporter: tapColorize()
    }));
});

gulp.task('sass', function() {
  return gulp.src('www/scss/**/*.scss') // Gets all files ending with .scss in www/scss
    .pipe(sass())
    .pipe(gulp.dest('www/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// Start browserSync server
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'www'
    }
  });
});
//gulp.task('default', ['clean','dist', 'browserify']);


gulp.task('default', function(callback) {
  runSequence('clean',
    ['watch','dist', 'browserify'],
    callback);
});



gulp.task('clean', [], function() {
  console.log("Clean all files in build folder");

  return gulp.src("dist/*", { read: false }).pipe(clean());
});

//browserify fix
gulp.task('browserify', function () {

  return gulp.src(['./www/js/*.js'])
   .pipe(browserify())
   //.pipe(uglify())
   .pipe(gulp.dest('./dist/js/'));
});



gulp.task('dist', function(){

  gulp.src('./www/css/*.css')
  .pipe(gulp.dest('./dist/css/'));

  gulp.src('./www/images/*.jpg')
  .pipe(gulp.dest('./dist/images/'));

  // gulp.src('./www/js/**/*.js')
  // .pipe(gulp.dest('./dist/js/'));

  // gulp.src('./www/scss/**/*.scss')
  // .pipe(gulp.dest('./dist/scss/'));

  gulp.src('./www/*.html')
  .pipe(gulp.dest('./dist/'));

});


gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('www/scss/**/*.scss', ['sass']);
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('www/*.html', browserSync.reload);
  gulp.watch('www/js/**/*.js', browserSync.reload);
});


gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'www'
    },
  });
});
