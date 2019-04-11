const gulp = require('gulp');
const sass = require('gulp-sass');
const concatCss = require('gulp-concat-css');

//style paths
const sassFiles = [
      'src/*.scss',
      'src/**/*.scss'
    ],
    cssDest = 'build',
    cssSrc = 'src/assets/css';

gulp.task('styles', function(done){
    gulp.src(sassFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(concatCss('styles.css'))
        .pipe(gulp.dest(cssSrc));
    done();
});

gulp.task('build', function(done){
    gulp.src(sassFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(concatCss('styles.css'))
        .pipe(gulp.dest(cssDest));
    done();
});

gulp.task('watch',function(done) {
  gulp.watch(sassFiles, gulp.series('styles'));
  done();
});