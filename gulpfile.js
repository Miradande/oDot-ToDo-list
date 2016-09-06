var gulp = require('gulp');

var sass = require('gulp-sass');

var browserSync = require('browser-sync').create();



        // guide https://css-tricks.com/gulp-for-beginners/
        //to run this you type "gulp [taskname]" example "gulp hello"
gulp.task('hello', function(){
  console.log('Hello world');
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
