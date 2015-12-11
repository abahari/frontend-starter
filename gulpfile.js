(function () {
	'use strict';
	
	// Configuring Module Dependencies and Libraries
	var gulp = require('gulp'),
	   gutil = require('gulp-util'),
	  extend = require('extend'),
	 //connect = require('gulp-connect'),
 browserSync = require('browser-sync').create(),
	  gulpif = require('gulp-if'),
	  uglify = require('gulp-uglify'),
	//imagemin = require('gulp-imagemin'),
	//pngcrush = require('imagemin-pngcrush'),
  browserify = require('gulp-browserify'),

		sass = require('gulp-sass'),
      reload = browserSync.reload,
	   jade  = require('gulp-jade'),
   parseArgs = require('minimist'),
	  inject = require('gulp-inject'),
	   jshint = require('gulp-jshint'),
 runSequence = require('run-sequence'),
      concat = require('gulp-concat');
	
	// useful local variables  
	var sassSources,
		outputDir,
		tplSources,
		jsSources,
		tplmaquettes,
    	sassStyle;
		
		
		
	var config = extend({
		env: process.env.NODE_ENV || "development"
	}, parseArgs(process.argv.slice(2)));	
	
	// Getters / Setters
	//
	gulp.task('setdev', function() {
		return process.env.NODE_ENV = config.env = 'development';
	});
	gulp.task('setprod', function() {
		return process.env.NODE_ENV = config.env = 'production';
	});
	console.log(config.env);
	// Configuring directories
	//env = process.env.NODE_ENV || 'development';
	if (config.env === 'development') {
		outputDir = 'build/development/';
		sassStyle = 'expanded';
	} else {
		outputDir = 'build/production/';
		sassStyle = 'compressed';
	}
	
	sassSources  = ['components/sass/*.scss', 'components/sass/**/*.scss'];	   
	tplSources   = ['template/*.jade','template/**/*.jade', outputDir + '*.html'];
	jsSources    = ['components/scripts/*.js', 'components/scripts/**/*.js' ];
	tplmaquettes = ['template/*.jade','template/**/*.jade'];
	
	
	// gulp tasks
	
		// javascript 
			gulp.task('js', function() {
				gulp.src(jsSources)
					.pipe(concat('base.js'))
					.pipe(browserify())
					.pipe(gulpif(config.env === 'production', uglify()))
					.pipe(gulp.dest(outputDir + 'js'))
					.pipe(reload({stream: true}));
			});
		
		// jshint
		gulp.task('lint', function() {
			return gulp.src('./lib/*.js')
				.pipe(jshint())
				.pipe(jshint.reporter('Attention !!!'));
		});
			
		// styles 
			gulp.task('sass', function () {
				gulp.src('components/sass/*.scss')
					.pipe(sass().on('error', sass.logError))
					.pipe(gulp.dest(outputDir  +'css'))
					.pipe(reload({stream: true}));
			});
		
		// Watch 
			gulp.task('watch', function() {
				gulp.watch(jsSources, ['js']);
				gulp.watch('components/sass/*.scss', ['compass']);
				//gulp.watch('build/development/*.html', ['html']);
				//gulp.watch('build/development/js/*.json', ['json']);
				gulp.watch('build/development/images/**/*.*', ['images']);
			});
		
		// connect 
			/*gulp.task('connect', function() {
				connect.server({
					root: outputDir,
					livereload: true
				});
			});*/
		
		// Static Server + watching scss/html files
			gulp.task('serve', ['sass'], function() {
			
				browserSync.init({
					server: outputDir
				});
			
				gulp.watch(sassSources, ['sass']);
				gulp.watch(tplSources, ['templates']); 
				gulp.watch('build/development/*.html', ['html']);
				gulp.watch(jsSources, ['js']);
				
			});
		
		// images 
			/*gulp.task('images', function() {
				gulp.src('build/development/images/**\/*.*')
					.pipe(gulpif(env === 'production', imagemin({
						progressive: true,
						svgoPlugins: [{ removeViewBox: false }],
						use: [pngcrush()]
					})))
					.pipe(gulpif(env === 'production', gulp.dest(outputDir + 'images')))
					.pipe(connect.reload())
			});*/
		
			// jade templating
			gulp.task('templates', function() {
				
				gulp.src(tplmaquettes)
					.pipe(jade({
						pretty: true
					}))
					.pipe( gulp.dest(outputDir))
					.pipe(gulpif(config.env === 'production', gulp.dest(outputDir)))
					//.on("end", reload);
			});
			
			gulp.task('html', function() {
				gulp.src('build/development/*.html')
					.pipe(reload({stream: true}));
			});
			
		// generate index of all html files 
		// Read templates 
		gulp.task('index', function() {
			var regex = /[^/\\&\?]+\.\w{3,4}(?=([\?&].*$|$))/g;
			gulp.src('template/index.html')
				.pipe(inject(
					gulp.src(['build/development/*.html'], { read: false }), {
					transform: function (filepath, file) {
						// nom du fichier 
						var fileName = filepath.match(regex);
						if (filepath.slice(-5) === '.html') {
							return '<li><a href="/' + fileName + '">'+fileName+'</a></li>';
						}
					}
					}
				))
				.pipe(gulp.dest('build/development'));
		});
		
		
		
		gulp.task('build', ['scripts']);
		
		gulp.task('develop', ['set-dev-node-env'], function() {
			return runSequence(
				'build'
			);
		});

		gulp.task('deploy', ['set-prod-node-env'], function() {
			return runSequence(
				'build'
			);
		});
		
		
		
	// gulp luncher 
	//gulp.task('default', ['html', 'json', 'coffee', 'js', 'compass', 'images', 'connect', 'watch']);
	  
})();