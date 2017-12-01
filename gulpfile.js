var
  gulp = require('gulp')
  , ghPages = require('gulp-gh-pages')
;

// copy
gulp.task('copy:demo', () => {
  gulp.src([
    'standalone/**/*',
    '!standalone/**/*.html'
  ])
    .pipe(gulp.dest('demo'));
});

// Deploy to ghPages
gulp.task('deploy', function () {
  return gulp
    .src([
      'standalone/**/*',
      '!standalone/**/*.map'
    ])
    .pipe(ghPages());
});

