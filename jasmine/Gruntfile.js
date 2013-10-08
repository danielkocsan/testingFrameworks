module.exports = function(grunt) {
    grunt.initConfig(
        {
            jasmine: {
                default: {
                    src: ['modules/*.js'],
                    options: {
                        specs: ['specs/*.js']
                    }
                }
            }
        }
    );

    grunt.loadNpmTasks('grunt-contrib-jasmine');
};