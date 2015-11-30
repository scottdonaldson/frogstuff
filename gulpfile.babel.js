var _ = require('lodash'),
    gulp = require('gulp'),
    browserify = require('browserify'),
    uglify = require('gulp-uglify'),
    source = require('vinyl-source-stream'),
    sourcemaps = require('gulp-sourcemaps'),
    buffer = require('vinyl-buffer'),
    browserSync = require('browser-sync').create(),
    babelify = require('babelify'),
    watchify = require('watchify');
var reload = browserSync.reload;

// ----- Config

var paths = {
    jsIn: 'js/rsvp.js'
};

function build(watch) {

    var bundler;

    if ( watch ) {
        bundler = watchify(
            browserify(paths.jsIn,
                _.assign(watchify.args, {
                    debug: true
                })
            )
        );

        bundler.on('update', bundle);
    } else {
        bundler = browserify(paths.jsIn, {
            debug: true
        });
    }

    bundler.on('error', function(error) {
        console.log('Browserify error', error);
    });

    function bundle() {

        console.log('Bundle...');

        var hrTime = process.hrtime();
        var t1 = hrTime[0] * 1000 + hrTime[1] / 1000000;

        bundler
            .transform('babelify', {
                presets: ['es2015', 'react']
            })
            .bundle()
            .pipe(source('rsvp.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({
                loadMaps: true
            }))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('js/output'));

        hrTime = process.hrtime();
        var t2 = hrTime[0] * 1000 + hrTime[1] / 1000000;

        console.log('Bundle took ' + Math.round(t2 - t1) + ' ms');

    }

    return bundle();
}

gulp.task('build', function() {
    build();
});

gulp.task('build-watch', function() {
    build(true);
});

gulp.task('default', ['build-watch']);
