let project_folder = 'dist';
let source_folder = 'src';

let path = {
  build: {
    html: project_folder + '/',
    css: project_folder + '/css/',
    js: project_folder + '/js/',
    img: project_folder + '/img/',
  },
  src: {
    html: source_folder + '/index.html',
    css: source_folder + '/scss/style.scss',
    js: source_folder + '/js/script.js',
    img: source_folder + '/img/**/*.{jpg,png,svg,webp,ico}',
  },
  watch: {
    html: source_folder + '/**/*.html',
    css: source_folder + '/scss/**/*.scss',
    js: source_folder + '/js/**/*.js',
    img: source_folder + '/img/**/*.{jpg,png,svg,webp,ico}',
  },
  clean: './' + project_folder + '/',
};

let { src, dest } = require('gulp'),
  gulp = require('gulp'),
  browsersync = require('browser-sync'),
  fileinclude = require('gulp-file-include'),
  del = require('del'),
  scss = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  gcmq = require('gulp-group-css-media-queries'),
  clean_css = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  imagemin = require('gulp-imagemin'),
  eslint = require('gulp-eslint');

function browserSync() {
  browsersync.init({
    server: {
      baseDir: './' + project_folder + '/',
      port: 3000,
    },
  });
}

function watchFiles() {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], images);
}

function clean() {
  return del(path.clean);
}

function html() {
  return src(path.src.html)
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream());
}

function css() {
  return src(path.src.css)
    .pipe(
      scss({
          outputStyle: 'expanded',
      })
    )
    .pipe(
        autoprefixer({
            overrideBrowserslist: ['last 5 versions'],
            cascade: true,
        })
    )
    .pipe(gcmq())
    .pipe(dest(path.build.css))
    .pipe(clean_css())
    .pipe(
        rename({
            extname: '.min.css',
        })
    )
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream());
}

function js() {
  return src(path.src.js)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(fileinclude())
    .pipe(dest(path.build.js))
    .pipe(uglify())
    .pipe(
        rename({
            extname: '.min.js',
        })
    )
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream());
}

function images() {
  return src(path.src.img)
    .pipe(
        imagemin({
            progressive: true,
            interlaced: true,
            optimizationLeve: 3,
        })
    )
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream());
}

let build = gulp.series(clean, html, js, css, images);
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;