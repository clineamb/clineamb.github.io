
var gulp            = require('gulp')
,   path            = require('path')
,   less            = require('gulp-less')
,   autoprefix      = require('gulp-autoprefixer')
,   rename          = require('gulp-rename')
,   uglify          = require('gulp-uglify')
,   livereload      = require('gulp-livereload')
,   quickBundle     = require('./tasks/quick-bundle.js')
,   through2        = require('through2')
//  SETTINGS
,   less_src        = "./less/*.less"
,   less_paths      = "./less/**/*.less"
,   less_dest       = "./public/css"
,   js_src          = "./src/*.json"
,   js_dest         = "./public/js"
;

gulp.task('default', ['less', 'qb']);

gulp.task('less', ['less.dev', 'less.min', 'qb']);

gulp.task('less.dev', function() {
    return gulp.src(less_src)
        .pipe(less({
            'paths': less_paths
        }))
        .pipe(autoprefix({
            'cascade': true,
            'remove': true
        }))
        .pipe(gulp.dest(less_dest))
    ;
});

gulp.task('less.min', function () {
    return gulp.src(less_src)
        //.pipe(stripHologram())
        .pipe(less({
            'paths': less_paths
        ,   'compress': true
        }))
        .pipe(autoprefix({
            'remove': true
        }))
        .pipe(rename({'extname': '.min.css'}))
        .pipe(gulp.dest(less_dest))
    ;
});

gulp.task('qb', ['js.qb', 'js.qb.min']);

gulp.task('js.qb', function() {
    return gulp.src(js_src)
        .pipe(quickBundle())
        .pipe(rename({ 'extname': '.js' }))
        .pipe(gulp.dest(js_dest))
    ;
});

gulp.task('js.qb.min', function() {
    return gulp.src(js_src)
        .pipe(quickBundle())
            .pipe(uglify())
            .pipe(rename({'extname': '.min.js'}))
        .pipe(gulp.dest(js_dest))
    ;
});

gulp.task('watch', ['default'], function() {
    livereload.listen();

    gulp.watch('./less/**/*.less', ['less'])
        .on('change', livereload.reload);
    gulp.watch('./src/**/*.js', ['qb'])
        .on('change', livereload.reload);
});