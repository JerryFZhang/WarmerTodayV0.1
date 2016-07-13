var gulp = require('gulp');
var minify = require('gulp-minify');
gulp.task('compress', function () {
    gulp.src('public/js/*.js')
        //must delete all min files at this point
        .pipe(minify({
            ext: {
                src: '.js'
                , min: '.min.js'
            }
            , exclude: ['tasks']
            , ignoreFiles: ['dev.js', 'min.js']
        })).pipe(gulp.dest('public/js'))
});