'use strict'
const { src, dest, watch, series, parallel } = require('gulp');

// CSS y SASS
// Node version 12.22.0
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css() {
    return src('src/scss/main.scss')
    .pipe( sourcemaps.init() )
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist/css'))


} function pagesCss() {
    return src('src/scss/page/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist/css/pages'))
}

function dev() {
    watch('src/scss/**/*.scss', css);
    watch('src/scss/page/*.scss', pagesCss);
    watch('src/img/**/*', image);
}
function versionWebp() {
    return src('src/img/**/*.{png,jpg}').pipe(webp()).pipe(dest('dist/img'));
}
function versionAvif() {
    const options = {
        quality: 60,
    }
    return src('src/img/**/*.{png,jpg}').pipe(avif(options)).pipe(dest('dist/img'));
}
function image() {
    return src('src/img/**/*').pipe(imagemin({ optimizationLevel: 3 })).pipe(dest('dist/img'));
}
exports.css = css;
exports.dev = dev;
exports.image = image;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.pagesCss = pagesCss;

exports.default = series(image, versionWebp, versionAvif, css, pagesCss, dev);



