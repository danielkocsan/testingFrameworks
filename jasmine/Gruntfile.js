module.exports = function(grunt) {
    grunt.initConfig(
        {
            jasmine: {
                default: {
                    src: ['modules/*.js'],
                    options: {
                        specs: ['specs/*.js'],
                        junit: {
                            path: 'reports',
                            consolidate: true
                        },
                        keepRunner: true
                    }
                }
            },
            jslint: {
                default: {
                    src: [
                        'modules/*',
                        'specs/*'
                    ],
                    directives: {
                        sloppy: true
                    }
                }
            }
        }
    );

    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-jslint');
    
    grunt.registerTask('default', ['jslint', 'jasmine']);
};