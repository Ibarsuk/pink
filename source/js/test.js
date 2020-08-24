gulp.task('sass', function() {
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
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
});

gulp.task("build", gulp.series("clean","htmlmin","copy","sass"));

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
  .pipe(gulp.dest("build/img"))
});

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
  gulp.watch("source/sass/**/*.scss", gulp.series("sass"));
  gulp.watch("source/*.html").on("change", sync.reload);
});

gulp.task("start", gulp.series("sass","server","watcher"));
