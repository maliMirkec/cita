"use strict";

var gulp = require("gulp");
var bump = require("gulp-bump");

// Defined method of updating:
// Semantic major
gulp.task("bump:major", function () {
  gulp
    .src("./package.json")
    .pipe(
      bump({
        type: "major"
      })
    )
    .pipe(gulp.dest("./"));
});

// Semantic minor
gulp.task("bump:minor", function () {
  gulp
    .src("./package.json")
    .pipe(
      bump({
        type: "minor"
      })
    )
    .pipe(gulp.dest("./"));
});

// Semantic patch
gulp.task("bump:patch", function () {
  gulp
    .src("./package.json")
    .pipe(
      bump({
        type: "patch"
      })
    )
    .pipe(gulp.dest("./"));
});

// Replace invalid html

var replace = require("gulp-replace");

gulp.task("critical:fix", function () {
  gulp.src("./dist/*.html")
    .pipe(replace("\<link href=\"/cita.css\" rel=\"preload\" as=\"style\" onload=\"this\.rel=\'stylesheet\'\"\>", "\<link href=\"/cita.css\" rel=\"preload\" as=\"style\" onload=\'this\.rel=\"stylesheet\"\'\>"))
    .pipe(gulp.dest("./dist/"));
});
