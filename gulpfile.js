const gulp = require('gulp');
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const babel = require('gulp-babel');
const sass = require('gulp-sass')

gulp.task("html", () => {
    return gulp.src("src/*.html")
        .pipe(gulp.dest("build"))
})

gulp.task('scripts', () => {
    return gulp
		.src('src/js/*.js')
		.pipe(
			babel({
				presets: ['@babel/env'],
			})
		)
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest('build/js'));
})

gulp.task('fonts', () => {
    return gulp.src('src/assets/fonts/*').pipe(gulp.dest('build/fonts'));
})

gulp.task('sass', () => {
    return gulp.src('src/sass/*.scss').pipe(sass().on('error', sass.logError)).pipe(gulp.dest('build/css'));
})

gulp.task('default', gulp.series('html', 'scripts', 'fonts', 'sass'));

gulp.task('watch', () => {
    gulp.watch('src/*.html', gulp.series('html'));
    gulp.watch('src/js/*.js', gulp.series('scripts'));
    gulp.watch('src/sass/*.scss', gulp.series('sass'));
})