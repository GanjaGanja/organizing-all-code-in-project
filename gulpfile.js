// Include Gulp and all required plugins.
var gulp = require('gulp');
var rigger = require('gulp-rigger'); // import files one into another
var less = require('gulp-less');
var lessGlob = require('less-plugin-glob'); // add glob expressions into less
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var gzip = require('gulp-gzip');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var browserSync = require("browser-sync");
var reload = browserSync.reload;
var rimraf = require('rimraf'); // erase files and folders

// Path to all project files.
var path = {
  build: {
    html: 'build/',
    js: 'build/js/',
    css: 'build/css/',
    img: 'build/img/',
    fonts: 'build/fonts/',
    tweaks: 'build/'
  },
  src: {
    html: 'src/html/*.html',
    js: 'src/js/main.js',
    style: 'src/styles/styles.less',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*',
    fonts_bootstrap: 'bower_components/bootstrap/fonts/**/*.*',
    fonts_awesome: 'bower_components/font-awesome/fonts/**/*.*',
    tweaks: 'src/html5-boilerplate-tweaks/**/*.*'
  },
  watch: {
    html: 'src/html/**/*.html',
    js: 'src/js/**/*.js',
    style: 'src/styles/**/*.less',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*',
    tweaks: 'src/html5-boilerplate-tweaks/**/*.*'
  },
  clean: './build'
};

// Local dev server config for 'browser-sync' plugin.
var config = {
  server: {
    baseDir: "./build"
  },
  tunnel: false, // remote testing is off
  host: 'localhost',
  port: 9000,
  logPrefix: "Frontend_Devil"
};

// Build html.
gulp.task('html:build', function() {
  gulp.src(path.src.html)
    .pipe(rigger())
    .pipe(gulp.dest(path.build.html))
    .pipe(reload({stream: true}));
});

// Build styles with 'less', 'less-plugin-glob' and 'autoprefixer'.
// If '--env=production' prefix added make production version.
gulp.task('style:build', function() {
  gulp.src(path.src.style)
    .pipe(gutil.env.env === 'production' ? sourcemaps.init() : gutil.noop())
    .pipe(gutil.env.env === 'production' ? less({
      plugins: [lessGlob],
      compress: true
    }).on('error', gutil.log) : less({
      plugins: [lessGlob],
      compress: false
    }).on('error', gutil.log))
    .pipe(autoprefixer('last 4 versions', 'ie >= 8'))
    .pipe(gutil.env.env === 'production' ? minifyCSS({keepBreaks: false}) : gutil.noop())
    .pipe(gutil.env.env === 'production' ? sourcemaps.write() : gutil.noop())
    .pipe(gutil.env.env === 'production' ? gzip() : gutil.noop())
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({stream: true}));
});

// Combine and compress scripts from 'main.js' file.
// If '--env=production' prefix added make production version.
gulp.task('js:build', function() {
  gulp.src(path.src.js)
    .pipe(rigger())
    .pipe(gutil.env.env === 'production' ? sourcemaps.init() : gutil.noop())
    .pipe(uglify())
    .pipe(gutil.env.env === 'production' ? sourcemaps.write() : gutil.noop())
    .pipe(gutil.env.env === 'production' ? gzip() : gutil.noop())
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({stream: true}));
});

// Compress images.
gulp.task('image:build', function() {
  gulp.src(path.src.img)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()],
      interlaced: true
    }))
    .pipe(gulp.dest(path.build.img))
    .pipe(reload({stream: true}));
});

// Copy fonts.
gulp.task('fonts:build', function() {
  gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts));
});
gulp.task('fonts_bootstrap:build', function() {
  gulp.src(path.src.fonts_bootstrap)
    .pipe(gulp.dest(path.build.fonts));
});
gulp.task('fonts_awesome:build', function() {
  gulp.src(path.src.fonts_awesome)
    .pipe(gulp.dest(path.build.fonts));
});

// Copy HTML5 Boilerplate tweaks.
gulp.task('tweaks:build', function() {
  gulp.src(path.src.tweaks)
    .pipe(gulp.dest(path.build.tweaks));
});

// Main build task.
// 
// Use 'gulp --env=production build' command to build production version!
gulp.task('build', [
  'html:build',
  'style:build',
  'js:build',
  'image:build',
  'fonts:build',
  // 'fonts_bootstrap:build',
  // 'fonts_awesome:build',
  'tweaks:build'
]);

// Watch for changes.
gulp.task('watch', function(){
  gulp.watch([path.watch.html], function(event, cb) {
    gulp.start('html:build');
  });
  gulp.watch([path.watch.style], function(event, cb) {
    gulp.start('style:build');
  });
  gulp.watch([path.watch.js], function(event, cb) {
    gulp.start('js:build');
  });
  gulp.watch([path.watch.img], function(event, cb) {
    gulp.start('image:build');
  });
  gulp.watch([path.watch.fonts], function(event, cb) {
    gulp.start('fonts:build');
  });
  gulp.watch([path.watch.tweaks], function(event, cb) {
    gulp.start('tweaks:build');
  });
});

// Start local web server.
gulp.task('webserver', function () {
  browserSync(config);
});

// Totally erase 'build' folder.
gulp.task('clean', function (cb) {
  rimraf(path.clean, cb);
});

// Build development version and watch for changes.
gulp.task('default', ['build', 'webserver', 'watch']);