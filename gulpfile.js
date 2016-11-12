// Include gulp
var gulp = require('gulp');
// Include plugins
var concat = require('gulp-concat');
var fileinclude = require('gulp-file-include');

// EXAMPLE:

// PUT THIS IN A FILE IN THE /slides FOLDER:
// @@include('includes/var.html', {
// 	"name": "test",
// 	"age": 12345,
// 	"socials": {
// 		"fb": "facebook.com/include",
// 		"tw": "twitter.com/include"
// 	}
// })
//
// AND THIS CODE INSIDE var.html:
// <label>@@name</label>
// <label>@@age</label>
// <strong>@@socials.fb</strong>
// <strong>@@socials.tw</strong>
//
// OUTPUT:
// <label>test</label>
// <label>12345</label>
// <strong>facebook.com/include</strong>
// <strong>twitter.com/include</strong>

 // Concatenate slides into one file for RevealJS slideshow
gulp.task('slides', function() {
    return gulp.src('slides/*.html')
      .pipe(concat('index.html', {newLine: ''}))
	  .pipe(fileinclude({
        prefix: '@@',
        basepath: './'
      }))
      .pipe(gulp.dest('public'));
});

// Watch slides
gulp.task('watch', function() {
	gulp.watch('slides/*.html', ['slides']);
});

 // Default Task
//gulp.task('default', ['slides', 'watch']);
gulp.task('default', ['slides']);
