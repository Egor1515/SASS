const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();

gulp.task('serve', function () {
    browserSync.init({
        server: 'public'
    })
    browserSync.watch('public/**/*.*').on('change', browserSync.reload);
})

gulp.task('sass', function () {
    return gulp.src('app/scss/*.scss')
        .pipe(sass({
            errorLogToConsole: true,
            outputStyle: 'compressed'
        }))
        .on('error', console.error.bind(console))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('public/css'));
});

gulp.task('watchFiles', function () {
    gulp.watch('app/scss/*.scss', gulp.series('sass'))
});

gulp.task('default', gulp.parallel('watchFiles', 'serve')
);