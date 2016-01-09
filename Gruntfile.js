module.exports = function (grunt) {
    require('time-grunt')(grunt);
    require('jit-grunt')(grunt, {});

    grunt.initConfig({
        site: {
            app: 'site',
            dist: 'dist'
        },

        clean: {
            server: {
                files: [
                    {
                        dot: true,
                        src: '<%= site.dist %>/*'
                    }
                ]
            }
        },

        jekyll: {
            options: {
                bundleExec: true,
                config: '_config.yml',
                dest: '<%= site.dist %>',
                src: '<%= site.app %>'
            },
            build: {
                options: {
                    config: '_config.yml,_config.build.yml'
                }
            },
            server: {
                options: {
                    src: '<%= site.app %>'
                }
            },
            check: {
                options: {
                    doctor: true
                }
            }
        },

        copy: {
            server: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= site.app %>',
                        src: [
                            'images/**/*'
                        ],
                        dest: '<%= site.dist %>'
                    }
                ]
            }
        },

        less: {
            options: {
                compress: true
            },
            build: {},
            server: {
                options: {
                    compress: false,
                    sourceMap: true
                },
                files: {
                    '<%= site.dist %>/css/core.css': '<%= site.app %>/_less/core.less'
                }
            },
            test: {}
        },

        postcss: {
            build: {
                options: {
                    map: true,
                    processors: [
                        require('autoprefixer')({browsers: 'last 2 versions'}),
                        require('cssnano')()
                    ]
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= site.dist %>/css',
                        src: '**/*.css',
                        dest: '<%= site.dist %>/css'
                    }
                ]
            }
        },

        connect: {
            options: {
                hostname: '0.0.0.0',
                port: 9051,
                middleware: function (connect, options, middlewares) {
                    middlewares.unshift(function (request, response, next) {
                        response.setHeader('Access-Control-Allow-Origin', '*');
                        response.setHeader('Access-Control-Allow-Methods', '*');
                        return next();
                    });
                    return middlewares;
                },
                useAvailablePort: true
            }
        },

        watch: {
            gruntfile: {
              files: ['Gruntfile.js'],
                options: {
                    reload: true
                }
            },
            images: {
                files: ['<%= site.app %>/images/**/*.*'],
                tasks: ['copy:server']
            },
            less: {
                files: ['<%= site.app %>/_less/**/*.less'],
                tasks: ['less:server']
            },
            javascript: {
                files: ['<%= site.app %>/_js/**/*.js'],
                tasks: ['concat']
            },
            jekyll: {
                files: [
                    '_*.*',
                    '<%= site.app %>/**/*.{xml,html,yml,md,mkd,markdown,txt}'
                ],
                tasks: ['jekyll:server', 'concurrent']
            }
        },

        concat: {
            options: {
                sourceMap: true,
                separator: grunt.util.linefeed + ';',
                banner: '/*\n @licstart  The following is the entire license notice for the\n    JavaScript code in this page.\n\n Copyright (C) 2015 Fight for the Future\n\n The JavaScript code in this page is free software: you can\n redistribute it and/or modify it under the terms of the GNU\n General Public License (GNU GPL) as published by the Free Software\n Foundation, either version 3 of the License, or (at your option)\n any later version. The code is distributed WITHOUT ANY WARRANTY;\n without even the implied warranty of MERCHANTABILITY or FITNESS\n FOR A PARTICULAR PURPOSE. See the GNU GPL for more details.\n\n As additional permission under GNU GPL version 3 section 7, you\n may distribute non-source (e.g., minimized or compacted) forms of\n that code without the copy of the GNU GPL normally required by\n section 4, provided you include this license notice and a URL\n through which recipients can access the Corresponding Source.\n\n @licend  The above is the entire license notice\n    for the JavaScript code in this page.\n*/\n'
            },
            server: {
                files: [
                    {
                        src: [
                            '<%= site.app %>/_js/main.js'
                        ],
                        dest: '<%= site.dist %>/js/core.js'
                    }
                ]
            }
        },

        uglify: {
            options: {
                sourceMap: true,
                sourceMapIncludeSources: true,
                check: 'gzip',
                banner: '/*\n @licstart  The following is the entire license notice for the\n    JavaScript code in this page.\n\n Copyright (C) 2015 Fight for the Future\n\n The JavaScript code in this page is free software: you can\n redistribute it and/or modify it under the terms of the GNU\n General Public License (GNU GPL) as published by the Free Software\n Foundation, either version 3 of the License, or (at your option)\n any later version. The code is distributed WITHOUT ANY WARRANTY;\n without even the implied warranty of MERCHANTABILITY or FITNESS\n FOR A PARTICULAR PURPOSE. See the GNU GPL for more details.\n\n As additional permission under GNU GPL version 3 section 7, you\n may distribute non-source (e.g., minimized or compacted) forms of\n that code without the copy of the GNU GPL normally required by\n section 4, provided you include this license notice and a URL\n through which recipients can access the Corresponding Source.\n\n @licend  The above is the entire license notice\n    for the JavaScript code in this page.\n*/\n'
            },
            build: {
                files: {
                    '<%= site.dist %>/js/core.js': '<%= site.dist %>/js/core.js'
                }
            }
        },

        concurrent: {
            server: [
                'copy:server',
                'less:server',
                'concat'
            ]
        }
    });

    grunt.registerTask('dev', [
        'clean:server',
        'jekyll:server',
        'concurrent:server',
        'watch'
    ]);

    grunt.registerTask('build', [
        'clean:server',
        'jekyll:build',
        'concurrent:server',
        'postcss:build'
    ]);

    grunt.registerTask('test', [
        'jekyll:check'
    ]);

    grunt.registerTask('default', [
        'dev'
    ]);
};
