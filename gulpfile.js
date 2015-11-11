/*
** Globals variabls
*/
var config = {
  baseTestDir:"app/",
  baseBuildDir:"build/",
  removableBuild:[
    'build/**/sass',
    'build/**/jade-files',
    'build/**/js/src'
  ],
  shared: {
      files:[
        "./bower_components/angular/angular.min.js",
        "./bower_components/angular-ui-router/release/angular-ui-router.min.js",
        "./bower_components/fontawesome/css/font-awesome.min.css",
        "./bower_components/normalize.css/normalize.css",
        "./bower_components/fontawesome/fonts/*",
        "./bower_components/nprogress/nprogress.css",
        "./bower_components/nprogress/nprogress.js"
      ],
      cssOrder:[
        "normalize.css",
        "font-awesome.min.css",
        "nprogress.css",
        "*"
      ],
      jsOrder:[
        "angular.min.js",
        "angular-ui-router.min.js",
        "nprogress.js",
        "*"
      ],
      jsConcatFiles: [
        'app/shared/js/src/**/*.js'
      ]
  },
  blog : {
    jsConcatFiles: [
      'app/blog/js/src/**/*.js'
    ]
  },
  site : {
    jsConcatFiles: [
      'app/site/js/src/**/*.js'
    ]
  },
  admin : {
    jsConcatFiles: [
      'app/site/js/src/**/*.js'
    ]
  }
};

/*
** Require scripts
*/
// adding gulp plugins
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

// adding other plugins
var del = require('del'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;


gulp.task('jade', ['jade:shared', 'jade:site', 'jade:blog']);
gulp.task('scripts', ['scripts:shared', 'scripts:site', 'scripts:blog']);
gulp.task('sass',['sass:shared', 'sass:site', 'sass:blog']);
gulp.task('watch',['watch:shared', 'watch:site', 'watch:blog', 'watch:admin']);

// task for browser sync
gulp.task('browser-sync', function(){
  browserSync({
    server:{
      baseDir: config.baseTestDir
    },
    notify: false,
    ghostMode: {
        clicks: false,
        forms: false,
        scroll: false
    }
  });
});


gulp.task('default', ['bower', 'sass', 'jade', 'scripts', 'watch:blog', 'browser-sync']);




/*
** Error function
*/
function throwErr(error){
  console.log(error.message);
  this.emit('end');
}

/*
** Task scripts
*/


// task for jades
function jadeFiles(src, dest){
  gulp.src(src)
      .pipe(plugins.jade({ pretty: true }))
      .pipe(gulp.dest(dest))
      .pipe(reload({stream: true}));
}

gulp.task('jade:shared', function(){
  jadeFiles("app/shared/jade-files/**/*.jade", "app/shared/html");
});
gulp.task('jade:site', function(){
  jadeFiles("app/site/jade-files/**/*.jade", "app/site/html");
});
gulp.task('jade:blog', function(){
  jadeFiles("app/blog/jade-files/**/*.jade", "app/blog/html");
});



// task for root
gulp.task('index', function(){
  reload({stream: true});
});



// task for scripts
function scriptFiles(src, dest, fileName){
  gulp.src(src)
      .pipe(plugins.concat('tmp.js'))
      .pipe(plugins.rename(fileName+".js"))
      .pipe(gulp.dest(dest))
      .pipe(plugins.uglify())
      .on('error', throwErr)
      .pipe(plugins.rename(fileName+".min.js"))
      .pipe(gulp.dest(dest))
      .pipe(reload({stream: true}));
}
gulp.task('scripts:shared', function(){
  scriptFiles(config.shared.jsConcatFiles, "app/shared/js", "shared");
});
gulp.task('scripts:site', function(){
  scriptFiles(config.site.jsConcatFiles, "app/site/js", "site");
});
gulp.task('scripts:blog', function(){
  scriptFiles(config.blog.jsConcatFiles, "app/blog/js", "blog");
});


// task for sass
function sassFiles(src, dest, fileName){
  gulp.src(src)
      .pipe(plugins.plumber())
      .pipe(plugins.sass({
          includePaths: ['css'],
          outputStyle: 'expanded',
      }))
      .on('error', throwErr)
      .pipe(plugins.autoprefixer('last 2 versions'))
      .pipe(plugins.rename(fileName))
      .pipe(gulp.dest(dest))
      .pipe(reload({stream: true}));
}

gulp.task('sass:shared', function(){
  sassFiles("app/shared/sass/shared.sass", "app/shared/css", "shared.css");
});
gulp.task('sass:site', function(){
  sassFiles("app/site/sass/site.sass", "app/site/css", "site.css");
});
gulp.task('sass:blog', function(){
  sassFiles("app/blog/sass/blog.sass", "app/blog/css", "blog.css");
});






/*
** Watch tasks
*/

function addWatch(rootDir ,cb){
  gulp.watch(rootDir+'/js/src/**/*.js', ['scripts:'+cb]);
  gulp.watch(rootDir+'/sass/**/*.sass', ['sass:'+cb]);
  gulp.watch(rootDir+'/jade-files/**/*.jade', ['jade:'+cb]);
  gulp.watch(rootDir+'/index.html', function(){
    reload();
  });
}

gulp.task('watch:site', function(){ addWatch('./app/site', 'site') });
gulp.task('watch:blog', function(){ addWatch('./app/blog', 'blog') });
gulp.task('watch:admin', function(){  addWatch('./app/admin', 'admin')  });
gulp.task('watch:shared', function(){ addWatch('./app/shared', 'shared')  });



/*
** Default tasks
*/



// adding bower tools
gulp.task('bower', function(){

  // adding bower files to share
  if(config.shared.files !== undefined)
    addBowerFiles(config.shared, 'app/shared');

  // adding bower files to site
  if(config.site.files !== undefined)
    addBowerFiles(config.site, 'app/site');

  // adding bower files to blog
  if(config.blog.files !== undefined)
    addBowerFiles(config.blog, 'app/blog');

  // adding bower files to blog
  if(config.admin.files !== undefined)
    addBowerFiles(config.admin, 'app/admin');
});

function addBowerFiles(mainFile, dest){
  // add css files
  gulp.src(mainFile.files)
      .pipe(plugins.filter('*.css'))
      .pipe(plugins.order(mainFile.cssOrder))
      .pipe(plugins.concatCss("tmp.css", {rebaseUrls:false}))
      .pipe(plugins.rename('tools.css'))
      .on('error', throwErr)
      .pipe(plugins.minifyCss())
      .pipe(gulp.dest(dest+"/css"));

  // adding javascripts files
  gulp.src(mainFile.files)
      .pipe(plugins.filter('*.js'))
      .pipe(plugins.order(mainFile.jsOrder))
      .pipe(plugins.concat('tmp.js'))
      .pipe(plugins.uglify())
      .on('error', throwErr)
      .pipe(plugins.rename('tools.js'))
      .pipe(gulp.dest(dest+"/js"));

  // adding font files
  gulp.src(mainFile.files)
  .pipe(plugins.filter('**/*.{eot,svg,ttf,woff,woff2}'))
      .pipe(gulp.dest(dest+"/fonts"))
      .pipe(reload({stream: true}));
}


/*
* task for building app
*/
// cleaning the build folder
gulp.task("build:clean", function(cb){
  del([
    "build/**"
  ], cb);
});

// copying files to build
gulp.task("build:copy",['build:clean'], function(){
  return gulp.src('./app/**/*')
  .pipe(gulp.dest('build/'));
});

// removing unnecessary files from build
gulp.task('build:remove', ['build:copy'], function(cb){
  del(config.removableBuild, cb);
});

gulp.task('build', ['build:copy', 'build:remove']);

// serving build
gulp.task('build:serve', function(){
  browserSync({
    server:{
      baseDir: config.baseBuildDir
    }
  });
});
