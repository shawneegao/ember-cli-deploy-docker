/*
Wrapper for docker variable in index.js
runs the two build and push commands (that you'll find in the instructions of the container registry)

docker build -t images.company.com:name path/to/pathToProject
docker push images.company.com:name

the repoAndName variable concatenates the repo and name with a ':' so the command has proper syntax

*/
var fs = require('fs');
var run = require('./run');

function build(name, repo, pathToProject){
  var repoAndName = repo+':'+name;
 return run('docker', ['build', '-t', repoAndName, pathToProject] );
};

function push(name, repo) {
  var repoAndName = repo+':'+name;
  return run('docker', ['push', repoAndName]);
};
exports.build=build;
exports.push=push;
