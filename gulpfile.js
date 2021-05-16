const gulp = require('gulp');
const imagemin = require('gulp-imagemin')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const babel = require('gulp-babel');
const sass = require('gulp-sass')

/**
 * Copies all development html files to the build folder
 */
gulp.task("html", () => {
	return gulp.src("src/*.html")
		.pipe(gulp.dest("build"))
})

/**
 * Transpiles and concatenates all development js files into a single main.js file, minifies it and includes it in the build folder.
 */
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

/**
 * Copies the images in the development folder, minifies them and places than in the build folder.
 */
gulp.task('images', () => {
	return gulp.src('src/assets/images/*')
		.pipe(imagemin()).pipe(gulp.dest('build/images'));
});

/**
 *  Copies the images from the development folder to the build folder.
 */
gulp.task('fonts', () => {
	return gulp.src('src/assets/fonts/*').pipe(gulp.dest('build/fonts'));
})

/**
 * Transpiles the development scss files and adds the now css files to the build folder.
 */
gulp.task('sass', () => {
	return gulp.src('src/sass/*.scss').pipe(sass().on('error', sass.logError)).pipe(gulp.dest('build/css'));
})

/**
 * Builds/compiles the entire application.
 */
gulp.task('default', gulp.series('html', 'scripts', 'images', 'fonts', 'sass'));

/**
 * Watches for changes in the development html, js and scss files to update the build folder.
 */
gulp.task('watch', () => {
	gulp.watch('src/*.html', gulp.series('html'));
	gulp.watch('src/js/*.js', gulp.series('scripts'));
	gulp.watch('src/sass/*.scss', gulp.series('sass'));
})