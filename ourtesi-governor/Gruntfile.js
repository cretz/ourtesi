module.exports = function (grunt) {
    // Tasks
    grunt.loadNpmTasks("grunt-ts");

    // Config
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        ts: {
            build: {
                src: [
                    "src/**/*.ts"
                ],
                outDir: "lib",
                options: {
                    module: "commonjs",
                    sourceMap: false,
                    removeComments: false
                }
            }
        }
    });

    grunt.registerTask("default", ["ts:build"]);
}