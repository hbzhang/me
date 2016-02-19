module.exports = function(grunt) {
  grunt.config.init({

    copy: {
      dist: {
        files: [
          /*{
            src: ['templates/htmls/fbcomponents.html'],
            dest: 'dist/templates/htmls/fbcomponents.html'
          },
          {
            src: ['templates/htmls/personname.html'],
            dest: 'dist/templates/htmls/personname.html'
          }*/
        ]
      }
    },
    html2js: {
       options: {
        base: '.'
      },
      dist: {
        src: [
        'templates/htmls/checkbox.html',
        'templates/htmls/checkboxpopup.html',
        'templates/htmls/personnamepopup.html',
        'templates/htmls/personname.html',
        'templates/htmls/fbcomponents.html'],
        dest: 'dist/formbuilder/fbcomponentstpl.js',
        module: 'componentshtmltemplate.templates'
      }
    },
    compass: {
      example: {
        options: {
          sassDir: 'example',
          cssDir: 'example',
          outputStyle: 'compressed'
        }
      },
      src: {
        options: {
          sassDir: 'src',
          cssDir: 'dist',
          outputStyle: 'compressed'
        }
      }
    },
   concat: {
     service: {
      src: ['src/service/*.js'],
      dest: 'dist/service/angular-form-service.js'
    },
    formbuilder: {
      src: ['src/formbuilder/*.js'],
      dest: 'dist/formbuilder/angular-form-builder.js'
    },
    components: {
      src: ['components/*.js'],
      dest: 'dist/formbuilder/angular-form-builder-components.js'
    },
    validator: {
      src: ['src/validator/*.js'],
      dest: 'dist/validator/angular-validator.js'
    }, 
    rules: {
      src: ['rules/*.js'],
      dest: 'dist/validator/angular-validator-rules.js'
    }
  },
    uglify: {
      build: {
        files: {
          'dist/service/angular-form-service.min.js': 'dist/service/angular-form-service.js',
          'dist/formbuilder/angular-form-builder.min.js': 'dist/formbuilder/angular-form-builder.js',
          'dist/formbuilder/angular-form-builder-components.min.js': 'dist/formbuilder/angular-form-builder-components.js',
          'dist/validator/angular-validator.min.js': 'dist/validator/angular-validator.js',
          'dist/validator/angular-validator-rules.min.js': 'dist/validator/angular-validator-rules.js'
   
        }
      }
    },
    watch: {
      compass: {
        files: ['example/*.scss', 'src/formbuilder/*.scss'],
        tasks: ['compass'],
        options: {
          spawn: false
        }
      },
      js: {
        files: ['src/service/*.js','src/formbuilder/*.js', 'src/validator/*.js', 'rules/*.js', 'components/*.js', 'example/*.js'],
        tasks: ['js'],
        options: {
          spawn: false
        }
      }
    },
    connect: {
      server: {
        options: {
          protocol: 'http',
          hostname: '*',
          port: 8000,
          base: '.'
        }
      }
    },
    karma: {
      min: {
        configFile: 'test/karma-min.config.js'
      },
      source: {
        configFile: 'test/karma.config.js'
      }
    }
  });
  grunt.registerTask('dev', ['compass', 'concat', 'connect', 'watch']);
  grunt.registerTask('build', ['copy', 'html2js','compass', 'concat', 'uglify']);
  grunt.registerTask('test', ['karma']);
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-contrib-copy');


  return grunt.loadNpmTasks('grunt-contrib-uglify');
};