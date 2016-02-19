module.exports = function(grunt) {
  require('time-grunt')(grunt);
  grunt.config.init({
    compass: {
      dev: {
        options: {
          sassDir: 'example',
          cssDir: 'example',
          outputStyle: 'compressed'
        }
      }
    },
   concat: {
    validator: {
      src: ['src/*.js'],
      dest: 'dist/angular-validator.js'
    },
     rules: {
      src: ['rules/*.js'],
      dest: 'dist/angular-validator-rules.js'
    },
    copy_directive_to_form_builder:{
          src: 'src/directive.js',
          dest:'../src/validator/directive.js'
    },
    copy_module_to_form_builder:{
          src: 'src/module.js',
          dest:'../src/validator/module.js'
    },
    copy_provider_to_form_builder:{
          src: 'src/provider.js',
          dest:'../src/validator/provider.js'
    },
    copy_rules_to_form_builder: {
      src: ['rules/*.js'],
      dest: '../rules/angular-validator-rules.js'
    }
   },
  /*   coffee: {
      source: {
        files: {
          'dist/angular-validator.js': ['src/*.coffee'],
          'src/directive.js': 'src/directive.coffee',
          'src/module.js': 'src/module.coffee',
          'src/provider.js': 'src/provider.coffee'
        }
      },
      rules: {
        files: {
          'rules/angular-validator-rules.js': ['rules/*.coffee'],
          'dist/angular-validator-rules.js': ['rules/*.coffee']
        }
      },
      demo: {
        files: {
         'example/demo.js': 'example/demo.coffee'
        }
      }
    }, */
    uglify: {
      build: {
        files: {
          'dist/angular-validator.min.js': 'dist/angular-validator.js',
          'dist/angular-validator-rules.min.js': 'dist/angular-validator-rules.js'
        }
      }
    },
    watch: {
      compass: {
        files: ['example/*.scss'],
        tasks: ['compass'],
        options: {
          spawn: false
        }
      },
      coffee: {
        files: ['src/*.coffee', 'rules/*.coffee', 'example/*.coffee'],
        tasks: ['coffee'],
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
      ng1_2: {
        configFile: 'test/karma-ng1.2.config.coffee'
      },
      ng1_2_min: {
        configFile: 'test/karma-ng1.2.min.config.coffee'
      }
    }
  });
  grunt.registerTask('dev', ['compass', 'coffee', 'connect', 'watch']);
  grunt.registerTask('build', ['compass', 'concat', 'uglify']);
  grunt.registerTask('test', ['karma']);
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-karma');
  return grunt.loadNpmTasks('grunt-contrib-uglify');
};