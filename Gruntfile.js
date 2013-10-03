'use strict';
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// configurable paths
var yeomanConfig = {
    app: 'app',
    src: 'src',
    dist: 'dist'
};

try {
    yeomanConfig.app = require('./bower.json').appPath || yeomanConfig.app;
} catch (e) {
}

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        yeoman: yeomanConfig,
        pkg: grunt.file.readJSON('package.json'),
        lifecycle: {
            validate: [
                'jshint'
            ],
            compile: [],
            test: [
                'karma:phantom'
            ],
            'package': [
                'concat',
                'uglify'
            ],
            'integration-test': [],
            verify: [],
            install: [],
            deploy: []
        },
        jshint: {
            src: {
                options: {
                    jshintrc: 'src/.jshintrc'
                },
                src: ['src/**/*.js']
            },
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/unit/*.js']
            },
            grunt: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: ['Gruntfile.js']
            }
        },
        karma: {
            options: {
                configFile: 'karma.conf.js'
            },
            unit: {
                singleRun: true
            },
            phantom: {
                singleRun: true,
                browsers: ['PhantomJS']
            },
            debug: {
                singleRun: false,
                reporters: ['progress', 'junit']
            }
        },
        concat: {
            options: {
                banner: ['/**! ',
                    ' * @license <%= pkg.name %> v<%= pkg.version %>',
                    ' * Copyright (c) 2013 <%= pkg.author.name %>. <%= pkg.homepage %>',
                    ' * License: MIT',
                    ' */\n'].join('\n')
            },
            main: {
                src: [
                    'src/services/flash-service.js',
                    'src/directives/flash-alert-directive.js'
                ],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: ['/**! ',
                    ' * @license <%= pkg.name %> v<%= pkg.version %>',
                    ' * Copyright (c) 2013 <%= pkg.author.name %>. <%= pkg.homepage %>',
                    ' * License: MIT',
                    ' */\n'].join('\n')
            },
            main: {
                files: {
                    'dist/<%= pkg.name %>.min.js': [
                        '<%= concat.main.dest %>'
                    ]
                }
            }
        },
        watch: {
            scripts: {
                files: ['src/**/*.js'],
                tasks: ['phase-package']
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: [
                    '<%= yeoman.app %>/*.html',
                    '<%= yeoman.app %>/scrips/*.js',
                    '<%= yeoman.app %>/scrips/**/*.js',
                    '<%= yeoman.dist %>/*.js'
                ]

            }
        },
        bumpup: ['package.json', 'bower.json'],
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            require('connect-livereload')(),
                            mountFolder(connect, yeomanConfig.dist),
                            mountFolder(connect, yeomanConfig.app),
                            mountFolder(connect, yeomanConfig.src),
                            mountFolder(connect, 'test')
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                url: 'http://localhost:<%= connect.options.port %>'
            }
        }
    });

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.registerTask('bump', function (type) {
        type = type ? type : 'patch';
        grunt.task.run('bumpup:' + type);
    });

    grunt.registerTask('server', [
        'package',
        'connect:livereload',
        'open',
        'watch'
    ]);

    grunt.registerTask('test-phantom', ['karma:phantom']);
    grunt.registerTask('test-start', ['karma:debug:start']);
    grunt.registerTask('test-run', ['karma:debug:run']);
    grunt.registerTask('build', ['install']);
    grunt.registerTask('default', ['install']);

};
