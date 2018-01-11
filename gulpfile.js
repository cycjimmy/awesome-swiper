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

