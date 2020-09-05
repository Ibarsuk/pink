const gulp = require("gulp");
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

gulp.task("clean", function() {
  return del("build");
});

gulp.task("copy", function(){
 return gulp.src([
 "source/fonts/**/*.{woff,woff2}",
 "source/img/**",
 "source/*.ico"
 ], {
 base: "source"
 })
.pipe(gulp.dest("build"));
});

gulp.task('styles', function() {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("styles.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("source/css"))
    .pipe(sync.stream());
});

gulp.task('htmlmin', () => {
  return gulp.src('source/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
});

gulp.task('jsmin', function () {
  return pipeline(
        gulp.src('source/js/*.js'),
        uglify(),
        gulp.dest('build/js')
  );
});

gulp.task("images", function(){
  return gulp.src("source/img/**/*.{jpg,png,svg}")
  .pipe(imagemin([
  imagemin.optipng({optimizationLevel: 3}),
  imagemin.mozjpeg({progressive: true}),
  imagemin.svgo()
  ]))
});

gulp.task("sprite", function(){
  return gulp.src("source/img/**/icon-*.svg")
  .pipe(svgstore())
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("source/img"))
});

gulp.task("build", gulp.series("clean","htmlmin","jsmin","sprite","styles","copy"));

gulp.task("server", function(done){
  sync.init({
    server: {
      baseDir: 'source'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
});

gulp.task("watcher", function(){
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/*.html").on("change", sync.reload);
});

gulp.task("start", gulp.series("styles","server","watcher"));
