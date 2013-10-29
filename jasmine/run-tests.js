var fs = require('fs');
var vm = require('vm');
var includeInThisContext = function(path) {
    var code = fs.readFileSync(path);
    vm.runInThisContext(code, path);
}.bind(this);

includeInThisContext(__dirname+"/modules/eventPublisher.js");

process.argv.push("specs");
process.argv.push("--junitreport");
process.argv.push("--output");
process.argv.push("reports/");

require('jasmine-node/lib/jasmine-node/cli');