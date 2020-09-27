const gulp = require('gulp');

// copy
gulp.task('copy:demo', () => gulp.src([
  'standalone/**/*',
  '!standalone/**/*.html'
])
  .pipe(gulp.dest('demo')));

gulp.task('copy:build', () => gulp.src([
  'standalone/**/*.js',
  'standalone/**/*.css'
])
  .pipe(gulp.dest('build')));

