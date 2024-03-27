const gulp = require('gulp');
const dSass = require('sass');
const gulpSass = require('gulp-sass');
const uglify = require('gulp-uglify');
const gulpImports = require('gulp-imports');
const rename = require("gulp-rename");
const concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');

const sass = gulpSass(dSass);

gulp.task('sass', () => {
    return gulp
        .src('./scss/3style.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({
            suffix: ".min",
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('js', () => {
    return gulp
        .src('./js/3style.js')
        .pipe(gulpImports({hideConsole: true}))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min",
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('pug', () => {
    return gulp
        .src('./pug/**/*.pug')
        .pipe(concat('3style.pug'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('font-css',() => {
    return gulp.src('./iconsfont/*.css')
      .pipe(cssmin())
      .pipe(rename({
        suffix: ".min",
    }))
      .pipe(gulp.dest('dist'));
  });

gulp.task('font-js', () => {
    return gulp
        .src('./iconsfont/*.js')
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min",
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task(
    'build',
    gulp.series(
        'sass',
        'js',
        'font-css',
        'font-js',
        'pug',
    ),
);
