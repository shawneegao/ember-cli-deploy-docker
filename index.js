'use strict';

var DeployPluginBase = require('ember-cli-deploy-plugin');
var path = require('path');
var fs = require('fs');
var docker = require('./lib/docker');

module.exports = {
  name: 'ember-cli-deploy-docker',

  createDeployPlugin: function(options) {
    //extending the base plugin that provides some nice functionalities like logging
    var DeployPlugin = DeployPluginBase.extend({
      name: options.name,

      /*
      Default configuration is the name. The name is (so far) the project's version number
      as found in package.json concatenated with a git commit hash
      */
      defaultConfig: {
        name: function(context) {
          return context.commandOptions.revision || (context.revisionData && context.revisionData.revisionKey);
        }
      },
      requiredConfig:{
        ['repo','pathToProject'],
      },
      configure:function(context){

        ['name','repo','pathToProject'].forEach(this.applyDefaultConfigProperty.bind(this));

        /*logs the variables you have configured for clarity*/
        this.log('you have configured the docker plugin with the following:')
        this.log('repo:'+this.readConfig("repo"));
        this.log('path to project:'+this.readConfig("pathToProject"));
      },
      //end of configs

      didPrepare:function(context){
        this.log("in did Prepare");

        /* setting config variables*/
        var name = this.readConfig("name"); //aka context.revisionData.revisionKey
        var repo = this.readConfig("repo");
        var pathToProject = this.readConfig("pathToProject");

        this.log('Building an image with the following configs:');
        this.log('container name :' + name);
        this.log('repo name :' + repo);
        this.log('Building an image from the project in this dir :' +pathToProject);

        if(name){
          return docker.build(name, repo, pathToProject);
        }
        else{
          var error ='You have not given your image a unique name. Please give your image a name. Images with the same name will overwrite each other.';
          throw error;
        }

      },

      upload: function(context) {
        var name = this.readConfig("name");
        var repo = this.readConfig("repo");

        this.log('Pushing with the following configs: ');
        this.log('container name :' + name);
        this.log('repo name :' + repo);

        return docker.push(name, repo);
      }
      //FINISHED docker push

    });
    return new DeployPlugin();
  }
};
