// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var react = require('gulp-react');
var mainBowerFiles = require('main-bower-files');
var filelog = require('gulp-filelog');
var filter = require('gulp-filter');
var mergeStream = require('merge-stream');

// react compilation task
gulp.task('react', function() {
    return gulp.src(['public/javascripts/elements/*.jsx','public/javascripts/*.jsx'])
        .pipe(react({
            harmony: true,
            esnext: true
        }))
        .pipe(concat("build.js"))
        .pipe(gulp.dest('public/javascripts/build'));
});

// Lint Task
gulp.task('lint', function() {
    return gulp.src(['public/javascripts/build/*.js', 'public/javascripts/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our less
gulp.task('less', function() {
    return gulp.src('public/stylesheets/less/*.less')
        .pipe(less())
        .pipe(concat('app.css'))
        .pipe(gulp.dest('public/stylesheets/dist'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    var libFiles = mainBowerFiles();
    libFiles.push('public/javascripts/lib/*.js');

    var lib = gulp.src(libFiles)
        .pipe(filter('*.js'))
        .pipe(filelog())
        .pipe(concat('lib.js'))
        .pipe(gulp.dest('public/javascripts/dist'));

    var app = gulp.src(['public/javascripts/build/*.js'])
        .pipe(filter('*.js'))
        .pipe(filelog())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('public/javascripts/dist'))

    return mergeStream([lib, app]);
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('public/javascripts/**/*.jsx', ['react']);
    gulp.watch('public/javascripts/**/*.js', ['lint', 'scripts']);
    gulp.watch('public/stylesheets/less/*.less', ['less']);
});

// Default Task
gulp.task('default', ['react', 'lint', 'less', 'scripts', 'watch']);