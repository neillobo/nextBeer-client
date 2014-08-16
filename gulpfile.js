var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    karma = require('gulp-karma'),
    shell = require('gulp-shell');

var paths = {
    sass: ['./scss/**/*.scss'],
    scripts: ['./www/app/**/*.js'],
    specs: ['specs/**/*.js'],
    html: [],
    lib: [
        './www/lib/ionic/**/ionic.bundle.js',
        './www/lib/lodash/**/lodash.js',
        './www/lib/angular-lodash/**/angular-lodash.js'
    ],
    dist: ['./www/dist']
};

var errorHandler = function(err) {
    console.log(err.toString());
    process.exit(-1);
};
// this code doens't work now so we're not using this for now.
// ios-sim is ios simulator for testing
gulp.task('install', shell.task(['npm install -g ionic cordova ios-sim']));

gulp.task('default', ['watch']);

// for live reload and preview
gulp.task('preview', ['lint', 'bundle'], shell.task(['ionic serve']));

// run the app before ...
gulp.task('run', ['lint', 'test'], shell.task(['ionic build ios && ionic emulate ios && ionic run ios']));

// for testing
gulp.task('test', function(){
    return gulp.src(paths.specs)
    .pipe(karma({
        configFile: 'karma.conf.js',
        action: 'run'
    }))
    .on('error', errorHandler);
});


// linting
gulp.task('lint', function() {
    return gulp.src(paths.scripts)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter("fail"));
});


// watch for changes in sass folder
gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['bundle']);
    gulp.watch(paths.sass, ['sass']);
    // gulp.watch(paths.test, ['test']);
});

gulp.task('bundle', ['bundleApp', 'bundleDependencies']);

gulp.task('bundleApp', function(done) {
    return gulp.src(paths.scripts)
        .pipe(concat('app.js'))
        .pipe(gulp.dest(paths.dist + '/js'))
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest(paths.dist + '/js'));
});

gulp.task('bundleDependencies', function() {
    return gulp.src(paths.lib)
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest('www/dist/js'));
});

// and compile into css folder
gulp.task('sass', function(done) {
    return gulp.src('./scss/ionic.app.scss')
        .pipe(sass({
            onError: errorHandler
        }))
        .pipe(rename({
            basename: 'next-beer'
        }))
        .pipe(autoprefixer("last 2 versions", "> 1%", "ie 8"))
        .pipe(gulp.dest(paths.dist + '/css'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({
            basename: 'next-beer',
            extname: '.min.css'
        }))
        .pipe(gulp.dest(paths.dist + '/css'));
});
