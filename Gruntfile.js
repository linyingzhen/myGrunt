module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            css: {
                src: ['css/*.css'],
                dest: 'build/css/all.css'
            },
            js: {
                src: ['js/*.js'],
                dest: 'build/js/all.js'
            }
        },
        cssmin: {
            css1: {
                src: 'build/css/all.css',
                dest: 'build/css/all.min.css'
            },
            css2: {
                files: [{
                    expand: true,
                    cwd: 'css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'build/css',
                    ext: '.css'
                }]
            }
        },
        uglify: {
            js1: {
                files: {
                    'build/js/all.min.js': ['build/js/all.js']
                }
            },
            js2: {
                files: [{
                    expand: true,
                    cwd: 'js', //js目录下
                    src: '**/*.js', //所有js文件
                    dest: 'build/js' //输出到此目录下
                }]
            }
        },
        htmlmin: { // Task 
            dist: { // Target 
                options: { // Target options 
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                        expand: true,
                        cwd: '.',
                        src: ['*.html'],
                        dest: 'build'
                    }]
                    //              files: {
                    //                  'build/index.html': 'index.html',
                    //                  'build/page1.html': 'page1.html',
                    //                  'build/page2.html': 'page2.html',
                    //                  'build/page3.html': 'page3.html',
                    //                  'build/page4.html': 'page4.html',
                    //                  'build/page5.html': 'page5.html',
                    //                  'build/page6.html': 'page6.html'
                    //              }
            },
        },
        imagemin: {
            /* 压缩图片大小 */
            dist: {
                options: {
                    optimizationLevel: 3 //定义 PNG 图片优化水平
                },
                files: [{
                    expand: true,
                    cwd: 'images/',
                    src: ['**/*.{png,jpg,jpeg,gif}'], // 优化 img 目录下所有 png/jpg/jpeg/gif图片
                    dest: 'build/images' // 优化后的图片保存位置，覆盖旧图片，并且不作提示
                }]
            }
        },
        watch: {
            scripts: {
                files: ['Gruntfile.js', 'js/*.js', '*.html', 'css/*.css'],
                tasks: ['jshint', 'concat', 'cssmin', 'uglify', 'htmlmin'],
                options: {
                    spawn: false,
                },
            },
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true
                },
            },
            uses_defaults: ['js/*.js'],
            //          with_overrides: {
            //              options: {
            //                  curly: false,
            //                  undef: true,
            //              },
            //              files: {
            //                  src: ['js/*.js']
            //              },
            //          }
        },
        clean: {
            build: {
                src: ["build"]
            },
            html: {
                src: ["build/*.html"]
            },
            css: {
                src: ["build/css"]
            },
            js: {
                src: ["build/js"]
            },
            images: {
                src: ["build/images"]
            }
        },
        less: {
            page: {
                options: {
                    //配置项
                    compress: true //CSS 压缩
                },
                files: {
                    //目标文件，将 page.less 文件编译压缩后，生成 page.css 文件
                    'build/css/source.css': 'less/source.less'
                }
            }
        },
        autoprefixer: {
            options: {
                //配置项
                browsers: ['last 50 versions', 'ie 8', 'ie 9'] //浏览器兼容
            },
            css: {
                //目标文件
                src: [
                    'build/css/app.css' //将哪个 CSS 文件中的 CSS 属性添加私有前缀
                ]
            },
            single_file: {
                src: 'build/css/app.css',
                dest: 'build/css/app.css'
            },
            //多文件任务
            mutiple_files: {
                expand: true,
                flatten: true, //是否取代原先文件名
                src: 'build/css/*.css',
                dest: 'build/css/'
            }

        }

    });

    // 加载提供"uglify"任务的插件
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-autoprefixer');

    // 默认任务
    // grunt.registerTask('default', ['uglify:builda']);
    // grunt.registerTask('mina', ['uglify:builda']);
    // grunt.registerTask('minb', ['uglify:buildb']);
    // grunt.registerTask('minall', ['uglify:buildall']);
    // grunt.registerTask('default', ['uglify:buildall', 'cssmin', 'htmlmin', 'imagemin']);
    // grunt.registerTask('default', ['uglify:buildall', 'cssmin', 'htmlmin']);
    grunt.registerTask('default', ['concat', 'cssmin', 'uglify', 'htmlmin', 'imagemin', 'watch', 'jshint']);
    // grunt.registerTask('default', ['concat', 'cssmin', 'uglify', 'htmlmin', 'imagemin', 'jshint']);

    grunt.registerTask('pageLess', ['less:page']);
    // grunt.registerTask('autocss', ['autoprefixer:css']);
    grunt.registerTask('autocss', ['autoprefixer:mutiple_files']);
}
