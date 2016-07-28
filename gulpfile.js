var gulp = require('gulp');
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var uglify = require('gulp-uglify');

//var minify = require('gulp-minify');
//gulp.task('compress', function () {
//    gulp.src('public/js/*.js')
//        //must delete all min files at this point
//        .pipe(minify({
//            ext: {
//                src: '.js'
//                , min: '.min.js'
//            }
//            , exclude: ['tasks']
//            , ignoreFiles: ['dev.js', 'min.js']
//        })).pipe(gulp.dest('public/js'))
//});

var cssnano = require('gulp-cssnano');

gulp.task('useref', function(){
  return gulp.src('public/*.html')
    .pipe(useref())
    .pipe(gulpIf('public/js/*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('public/css/*.css', cssnano()))
    .pipe(gulp.dest('public'))
});