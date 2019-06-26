const gulp = require('gulp');
const pug = require('gulp-pug');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const del = require('del');
const browserSync = require('browser-sync').create();

const paths = {
    root: './dist',
    styles: { 
        main: './src/index.scss',
        src: './src/**/*.scss',
        dist: './dist/css'
    },
    images: { 
        src: './src/assets/img/**/*.*',
        dist: './dist/img'
    },
    fonts: { 
        src: './src/assets/fonts/**/*.*',
        dist: './dist/fonts'
    },
    pug: {
        src: './src/*.pug',
        dist: './dist/'
    }
}

function watch() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.pug.src, pugToHtml);
    gulp.watch(paths.images.src, images);
    gulp.watch(paths.fonts.src, fonts);
}

function server() {
    browserSync.init({
        server: paths.root
    });
    browserSync.watch(paths.root + '/**/*.*', browserSync.reload);
}

function clean() {
    return del(paths.root);
}

function images() {
    return gulp.src(paths.images.src)
	      	.pipe(gulp.dest(paths.images.dist));
}

function fonts() {
    return gulp.src(paths.fonts.src)
	      	.pipe(gulp.dest(paths.fonts.dist));
}

function pugToHtml() {
		return gulp.src(paths.pug.src)
					.pipe(pug({pretty: true}))
	      	.pipe(gulp.dest(paths.pug.dist));
}

function styles() {
    return gulp.src(paths.styles.main)
        .pipe(sourcemaps.init())
        .pipe(postcss(require("./postcss.config")))
        .pipe(sourcemaps.write())
        .pipe(rename("index.min.css"))
        .pipe(gulp.dest(paths.styles.dist))
}

exports.styles = styles;
exports.clean = clean;
exports.images = images;
exports.fonts = fonts;
exports.pugToHtml = pugToHtml;

gulp.task('default', gulp.series(
    clean,
    gulp.parallel(images, fonts, styles, pugToHtml),
    gulp.parallel(watch, server)
));