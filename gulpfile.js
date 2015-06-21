var gulp     = require('gulp');
var plugins  = require('gulp-load-plugins')();

var onError = function(error) {
  console.log(error);
  this.emit('end');
}

gulp.task('html', function() {
  return gulp.src('src/views/*.html')
    .pipe(plugins.plumber({ errorHandler: onError }))
    .pipe(plugins.htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest('dist'))
    .pipe(plugins.connect.reload());
});

gulp.task('sass', function() {
  return gulp.src('src/style/style.scss')
    .pipe(plugins.plumber({ errorHandler: onError }))
    .pipe(plugins.sass({ outputStyle: 'compressed' }))
    .pipe(plugins.autoprefixer({ browsers: ['> 1%', 'last 2 versions', 'Explorer >= 9'], cascade: false }))
    .pipe(gulp.dest('dist'))
    .pipe(plugins.connect.reload());
});

gulp.task('scripts', function() {
  return gulp.src('src/scripts/*.js')
    .pipe(plugins.plumber({ errorHandler: onError }))
    .pipe(plugins.uglify())
    .pipe(gulp.dest('dist'))
    .pipe(plugins.connect.reload());
});

gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(plugins.plumber({ errorHandler: onError }))
    .pipe(plugins.imagemin({ progressive: true }))
    .pipe(gulp.dest('dist/images'))
    .pipe(plugins.connect.reload());
});

gulp.task('server', function() {
  return plugins.connect.server({
    root: 'dist',
    port: 8000,
    livereload: true
  });
});

gulp.task('fonts', function() {
  return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('watch', function() {
  gulp.watch('src/views/*.html', ['html']);
  gulp.watch('src/style/*.scss', ['sass']);
  gulp.watch('src/scripts/*.js', ['scripts']);
  gulp.watch('src/images/**/*', ['images']);
});

// build and default task
gulp.task('build', ['html', 'sass', 'scripts', 'images', 'fonts']);
gulp.task('default', ['server', 'build', 'watch']);
