var gulp = require('gulp'),
  concat = require('gulp-concat'),
  sass = require('gulp-sass'),
  minifyCss = require('gulp-minify-css'),
  browserify = require('gulp-browserify'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  jshint = require('gulp-jshint'),
  shell = require('gulp-shell');

var paths = {
  sass: ['./scss/**/*.scss'],
  scripts: ['./www/app/**/*.js'],
  dependencies: ['./www/lib/'],
  html: [],
  dist: ['./www/dist']
};

gulp.task('default', ['sass']);


// ios-sim is ios simulator for testing
gulp.task('install', shell.task(['npm install', 'bower install', 'npm install -g ionic cordova ios-sim']));

// for live reload and preview
gulp.task('preview', ['lint', 'serve']);

gulp.task('serve', shell.task(['echo auto-live preview...', 'ionic serve']));

// for testing
gulp.task('test', shell.task(['echo running tests...', 'karma start']));

// run the app before ...
gulp.task('run', shell.task(['echo build, emulate, run your ios app', 'ionic build ios && ionic emulate ios && ionic run ios']));

// linting
gulp.task('lint', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});


// watch for changes in sass folder
gulp.task('watch', function() {
  return gulp.watch(paths.sass, ['sass']);
});

gulp.task('bundle', ['app']);

gulp.task('app', function(done) {
  return gulp.src(paths.scripts)
    .pipe(concat('app.js'))
    .pipe(gulp.dest(paths.dist + '/js'))
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest(paths.dist + '/js'))
    .on('end', done);
});

gulp.task('dependencies', function(done) {
  // we're going to bundle any npm modules
  // we want to use in the app folder
  // in commonJS fashion
  // using browserify
  // gulp.src(paths.dependencies)
  // .pipe(browserify({
  //   insertGlobals: true,
  //   debug: true
  // }))
  // .pipe(concat('app.js'))
  // .pipe(gulp.dest('www/dist/js'))
  // .on('end', done);
});

// and compile into css folder
gulp.task('sass', function(done) {
  return gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .pipe(rename({
      basename: 'next-beer'
    }))
    .pipe(gulp.dest(paths.dist + '/css'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({
      basename: 'next-beer',
      extname: '.min.css'
    }))
    .pipe(gulp.dest(paths.dist + '/css'))
    .on('end', done);
});
