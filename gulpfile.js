
var gulp            = require('gulp')
,   path            = require('path')
,   less            = require('gulp-less')
,   autoprefix      = require('gulp-autoprefixer')
,   rename          = require('gulp-rename')
,   uglify          = require('gulp-uglify')
,   quickBundle     = require('./tasks/quick-bundle.js')
//  SETTINGS
,   less_src        = "./less/*.less"
,   less_paths      = "./less/**/*.less"
,   less_dest       = "./css"
,   js_src          = "./src/*.json"
,   js_dest         = "./js"
;

gulp.task('default', ['less', 'qb']);

gulp.task('less', ['less.min']);

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

gulp.task('qb', ['js.qb.min']);

gulp.task('js.qb.min', function() {
    return gulp.src(js_src)
        .pipe(quickBundle())
            .pipe(uglify())
            .pipe(rename({'extname': '.min.js'}))
        .pipe(gulp.dest(js_dest))
    ;
});