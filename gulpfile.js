const gulp = require("gulp");
const connect = require("gulp-connect");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const plumber = require("gulp-plumber")
gulp.task("html", done => {
    gulp.src("html/*.html")
        .pipe(gulp.dest("dist/html"))
        .pipe(connect.reload());
    done();
})

gulp.task("css", done => {
    gulp.src("css/*.css")
        .pipe(gulp.dest("dist/css"))
        .pipe(connect.reload());
    done();
})
gulp.task("img", done => {
    gulp.src("image/*")
        .pipe(gulp.dest("dist/image"))
        .pipe(connect.reload());
    done();
})

gulp.task("js", done => {
    gulp.src("js/*.js")
        .pipe(gulp.dest("dist/js"))
        .pipe(connect.reload());
    done();
})
gulp.task("ic", done => {
    gulp.src("iconfont/*")
        .pipe(gulp.dest("dist/iconfont"))
        .pipe(connect.reload());
    done();
})

gulp.task("sass", done => {
    gulp.src("sass/*.scss")
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compact'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("dist/css"))
        .pipe(gulp.dest("css/")) //
        .pipe(connect.reload());
    done();
})

gulp.task("server", done => {
    connect.server({
        root: "dist",
        livereload: true
    });
    done();
})

gulp.task("watch", done => {
    gulp.watch("html/*.html", gulp.series("html"));
    gulp.watch("sass/*.scss", gulp.series("sass"));
    gulp.watch("css/*.css", gulp.series("css"));
    gulp.watch("image/*", gulp.series("img"));
    gulp.watch("js/*.js", gulp.series("js"));
    gulp.watch("iconfont/*", gulp.series("ic"));
    done();
})

gulp.task("build", gulp.parallel("html", "img", "sass", "css", "js", "ic"));
gulp.task("default", gulp.series("build", "watch", "server"));