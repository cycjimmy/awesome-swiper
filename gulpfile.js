var
  gulp = require('gulp')
  , ghPages = require('gh-pages')
;

// copy
gulp.task('copy:demo', () => {
  gulp.src([
    'standalone/**/*',
    '!standalone/**/*.html'
  ])
    .pipe(gulp.dest('demo'));
});

gulp.task('copy:build', () => {
  gulp.src([
    'standalone/**/*.js',
    'standalone/**/*.css'
  ])
    .pipe(gulp.dest('build'));
});

// Deploy to ghPages
gulp.task('deploy', function () {
  return ghPages.publish('standalone', {
    src: [
      '**/*',
      '!**/*.map'
    ]
  }, function (err) {
    console.error(err);
  });
});

