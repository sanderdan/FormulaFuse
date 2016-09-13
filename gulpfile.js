var babel = require('gulp-babel');
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');
var gulp = require('gulp');
var ignore = require('gulp-ignore');
var inject = require('gulp-inject-string');
var watch = require('gulp-watch');

// Stupid stupid stupid Node
function clone(a) {
 return JSON.parse(JSON.stringify(a));
}

var config = {
  // Save here!
  dest: 'dist/',
  // Compile these!
  files: [
    'src/**/*.js',
    'src/**/*.jsx'
  ],
  // Don't concatenate these
  standalone_files: [
    'src/viewcontroller.js'
  ],
  // Generate list for concatenating
  concat_files: function() {
    var a = clone(this.files);
    for (var i = 0; i < this.standalone_files.length; i++) {
      a.push('!'+this.standalone_files[i]);
    }
    return a;
  }
}

// Dependencies
var requires = [
  'var Observable = require("FuseJS/Observable");'
]

// Parse the required packages
function insertRequire(){
  var str = '';
  for (var i = 0; i < requires.length; i++) {
    str += '\n'+requires[i];
  }
  return str;
}

// Lint all files
gulp.task('lint', function () {
  return gulp.src(config.files)
    // eslint() attaches the lint output to the eslint property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError());
});

// Watch files for changes
gulp.task('watch', function () {
  watch(config.files, function(){
    // Run build upon change
    gulp.start('build');
  });
});

// Define build task for concating files
gulp.task('build-concat', function(){
  return gulp.src(config.concat_files())
    // Concat all files into app.js
    .pipe(concat('app.js'))
    // Convert from ES2015 to ES5
    .pipe(babel({
      presets: ['es2015'],
      plugins: ['transform-es2015-modules-commonjs']
    }))
    // Inject requires into the javascript
    .pipe(inject.after('"use strict";', insertRequire()))
    // Save
    .pipe(gulp.dest(config.dest));
});

// Define build task for standalone files
gulp.task('build-standalone', function(){
  return gulp.src(config.standalone_files)
    // Convert from ES2015 to ES5
    .pipe(babel({
      presets: ['es2015'],
      plugins: ['transform-es2015-modules-commonjs']
    }))
    // Save
    .pipe(gulp.dest(config.dest));
});

// Define build task
gulp.task('build', ['lint', 'build-standalone', 'build-concat']);

// Initialize the default task
gulp.task('default', ['build', 'watch']);
