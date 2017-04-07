var gulp = require('gulp');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var htmlmin = require('gulp-htmlmin');
var cssmin = require('gulp-cssmin');
var connect = require( 'gulp-connect' );


// Definimos o diretorio dos arquivos para evitar repetição futuramente
var files = "./client/app/**/*.js";

gulp.task('minifycss', function () {
    gulp.src('app/**/*.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'));
});

gulp.task('sass', function () {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
})
 
gulp.task('minifyhtml', function() {
  return gulp.src('app/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});


gulp.task( 'files', function() {
  gulp.src( files ).pipe( connect.reload() );
});


gulp.task( 'connect', function() {
  connect.server({ livereload: true, port:9000 });
});

//Aqui criamos uma nova tarefa através do ´gulp.task´ e damos a ela o nome 'lint'
gulp.task('lint', function () {

  // Aqui carregamos os arquivos que a gente quer rodar as tarefas com o `gulp.src`
  // E logo depois usamos o `pipe` para rodar a tarefa `jshint`
  gulp.src(files)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

//Criamos outra tarefa com o nome 'dist'
gulp.task('dist', function () {

  // Carregamos os arquivos novamente
  // E rodamos uma tarefa para concatenação
  // Renomeamos o arquivo que sera minificado e logo depois o minificamos com o `uglify`
  // E pra terminar usamos o `gulp.dest` para colocar os arquivos concatenados e minificados na pasta build/
  gulp.src(files)
    .pipe(concat('./dist'))
    .pipe(rename('dist.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});

//Criamos uma tarefa 'default' que vai rodar quando rodamos `gulp` no projeto
gulp.task('default', function () {

  // Usamos o `gulp.run` para rodar as tarefas
  // E usamos o `gulp.watch` para o Gulp esperar mudanças nos arquivos para rodar novamente
 // gulp.run('lint', 'dist');
  gulp.run('sass');
 // gulp.run('minifycss');
 // gulp.run('minifyhtml');

  //gulp.watch(files, function (evt) {
   // gulp.run('lint', 'dist');
  //});

  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch( files, [ 'files' ]);
   gulp.run('connect');

});