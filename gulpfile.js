const { src, dest, parallel, series, watch } = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const svgstore = require("gulp-svgstore");
const del = require("del");
const htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var pipeline = require('readable-stream').pipeline;

function clean() {
  return del("build");
}

exports.clean = clean;

function copy() {
  return src([
    "source/fonts/**/*.{woff,woff2}",
   "source/img/**",
   "source/*.ico",
   "source/css/**"
 ], {
 base: "source"
 })
.pipe(dest("build"));
}

exports.copy = copy;

function styles() {
  return src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("styles.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(dest("source/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

function htmlMin() {
  return src('source/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('build'));
}

exports.htmlMin = htmlMin;

function jsmin() {
  return pipeline(
        src('source/js/*.js'),
        uglify(),
        dest('build/js')
  );
}

exports.jsmin = jsmin;

function images() {
  return src("source/img/**/*.{jpg,png,svg}")
  .pipe(imagemin([
  imagemin.optipng({optimizationLevel: 3}),
  imagemin.mozjpeg({progressive: true}),
  imagemin.svgo()
  ]))
}

exports.images = images;

function sprite() {
  return src("source/img/**/icon-*.svg")
  .pipe(svgstore())
  .pipe(rename("sprite.svg"))
  .pipe(dest("source/img"))
}

exports.sprite = sprite;

function server(done) {
  sync.init({
    server: {
      baseDir: 'source'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

function watcher() {
  watch("source/sass/**/*.scss", series("styles"));
  watch("source/*.html").on("change", sync.reload);
}

exports.watcher = watcher;

exports.start = parallel(styles, server, watcher);
exports.build = series(clean, htmlMin, jsmin, sprite, styles, copy);
