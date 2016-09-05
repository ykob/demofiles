const gulp = require('gulp');

const conf = require('../conf').copy;

gulp.task('copy-to-dest', () => {
  return gulp.src(conf.dest.src)
    .pipe(gulp.dest(conf.dest.dest));
});

gulp.task('copy-to-build', () => {
  return gulp.src(conf.build.src)
    .pipe(gulp.dest(conf.build.dest));
});
