/*
This file's purpose is to create the run() function used in jocker js
 run() uses the child_process module's spawn method to execute CLI commands.
It is also responsible for printing any errors that the CLI command would normally output
*/
var Promise   = require('ember-cli/lib/ext/promise');
var spawn = require('child_process').spawn;// allows me to run CLI commands

function run(command, args, opts) {
  return new Promise(function(resolve, reject) {
    var p = spawn(command, args, opts || {});
    var stderr = '';
    var stdout = '';
    p.stdout.on('data', function(output) {
      stdout += output;
      console.log(`${output}`);
    });
    p.stderr.on('data', function(output) {
      stderr += output;
      console.log(`${output}`);
    });
    p.on('close', function(code){
      if (code !== 0) {
        var err = new Error(command + " exited with nonzero status");
        err.stderr = stderr;
        err.stdout = stdout;
        reject(err);
      } else {
        resolve({ stdout: stdout, stderr: stderr });
      }
    });
  });
}

module.exports = run;
