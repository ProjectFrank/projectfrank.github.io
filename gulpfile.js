var gulp = require('gulp');
var stylus = require('gulp-stylus');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var prefix = require('gulp-autoprefixer');
var image = require('gulp-image');

gulp.task('default', function() {
    gulp.start('stylus');
    gulp.start('copycss');
    gulp.start('copyfonts');
    gulp.start('scripts');
    gulp.start('serve');
    gulp.start('image');
});

gulp.task('image', function() {
    return gulp.src('img/**/*.{png,jpg,jpeg,gif}')
	.pipe(image())
	.pipe(gulp.dest('contents/img'));
});

gulp.task('stylus', function() {
    return gulp.src('styles/style.styl')
	.pipe(stylus())
	.pipe(prefix({
	    browsers: ['last 2 versions'],
	    cascade: false
	}))
	.pipe(gulp.dest('contents/css'))
	.pipe(reload({stream:true}));
});

gulp.task('scripts', function() {
    return gulp.src(['./js/vendor/*.js', './js/plugins/*.js', './js/main.js'])
	.pipe(concat('scripts.js'))
	.pipe(gulp.dest('./contents/js'));
});

gulp.task('copycss', function() {
    return gulp.src('styles/**/*.css')
	.pipe(gulp.dest('contents/css'))
});

gulp.task('copyfonts', function() {
    return gulp.src('styles/**/*.{woff,woff2,ttf,svg,eot}')
	.pipe(gulp.dest('contents/css'));
});

gulp.task('serve', function() {
    browserSync({
	proxy: "localhost:8080",
	open: false,
	port: 3000
    });

    gulp.watch('styles/**/*.styl', ['stylus']);

    gulp.watch('js/**/*.js', ['scripts'], function() {
	reload();
    });

    gulp.watch('{templates/**/*.jade,contents/**/*.md}', function() {
	setTimeout(reload, 1000);
    })
});
